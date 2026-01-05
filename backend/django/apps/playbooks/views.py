from __future__ import annotations

from rest_framework import mixins, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Material, Playbook, PlaybookRun, PlaybookStep, SequenceEvent
from .serializers import (
    MaterialSerializer,
    PlaybookRunSerializer,
    PlaybookSerializer,
    PlaybookStepSerializer,
    SequenceEventSerializer,
)
from .services.email import send_email_message
from .services.llm import generate_with_llm
from .services.materials import build_materials_context


class PlaybookViewSet(viewsets.ModelViewSet):
    queryset = Playbook.objects.all().order_by("-created_at")
    serializer_class = PlaybookSerializer

    @action(detail=True, methods=["get", "post"], url_path="steps")
    def steps(self, request, pk=None):
        playbook = self.get_object()

        if request.method.lower() == "get":
            qs = playbook.steps.all().order_by("step_index", "id")
            return Response(PlaybookStepSerializer(qs, many=True).data)

        data = dict(request.data)
        data["playbook"] = playbook.id
        ser = PlaybookStepSerializer(data=data)
        ser.is_valid(raise_exception=True)
        step = ser.save()
        return Response(PlaybookStepSerializer(step).data, status=status.HTTP_201_CREATED)


class PlaybookStepViewSet(viewsets.ModelViewSet):
    queryset = PlaybookStep.objects.select_related("playbook").all().order_by("playbook_id", "step_index", "id")
    serializer_class = PlaybookStepSerializer


class MaterialViewSet(viewsets.ModelViewSet):
    queryset = Material.objects.all().order_by("-created_at")
    serializer_class = MaterialSerializer


class PlaybookRunViewSet(viewsets.ModelViewSet):
    queryset = PlaybookRun.objects.select_related("playbook").all().order_by("-created_at")
    serializer_class = PlaybookRunSerializer

    @action(detail=True, methods=["get"], url_path="events")
    def events(self, request, pk=None):
        run = self.get_object()
        qs = run.events.select_related("step").order_by("scheduled_for", "id")
        return Response(SequenceEventSerializer(qs, many=True).data)


class SequenceEventViewSet(viewsets.ModelViewSet):
    queryset = SequenceEvent.objects.select_related("run", "step", "run__playbook").all().order_by("scheduled_for", "id")
    serializer_class = SequenceEventSerializer

    @action(detail=True, methods=["post"], url_path="generate")
    def generate(self, request, pk=None):
        event = self.get_object()
        step = event.step

        person = request.data.get("person") or event.run.person_payload or {"person_id": event.run.person_id}

        try:
            materials_context = build_materials_context(step=step)
            gen = generate_with_llm(
                instructions=step.instructions,
                materials_context=materials_context,
                person=person,
                action_type=step.action_type,
            )

            event.generated_subject = gen.subject
            event.generated_body = gen.body
            event.final_subject = event.final_subject or gen.subject
            event.final_body = event.final_body or gen.body
            event.status = SequenceEvent.Status.READY
            event.error = ""
            event.save(update_fields=[
                "generated_subject",
                "generated_body",
                "final_subject",
                "final_body",
                "status",
                "error",
                "updated_at",
            ])

            return Response(SequenceEventSerializer(event).data)

        except Exception as e:
            event.status = SequenceEvent.Status.FAILED
            event.error = str(e)
            event.save(update_fields=["status", "error", "updated_at"])
            return Response({"detail": str(e)}, status=400)

    @action(detail=True, methods=["post"], url_path="send_email")
    def send_email(self, request, pk=None):
        event = self.get_object()
        step = event.step

        if step.action_type != PlaybookStep.ActionType.EMAIL_SEND:
            return Response({"detail": "Not an email step"}, status=400)

        to_email = (request.data.get("to_email") or "").strip()
        if not to_email:
            return Response({"detail": "Missing to_email"}, status=400)

        subject = (event.final_subject or event.generated_subject or "").strip()
        body = (event.final_body or event.generated_body or "").strip()
        if not subject or not body:
            return Response({"detail": "Missing subject/body. Generate first, or set final_subject/final_body."}, status=400)

        from_email = (request.data.get("from_email") or step.from_email or "").strip()
        if not from_email:
            return Response({"detail": "Missing from_email (set on step or pass in request)."}, status=400)

        reply_to = (request.data.get("reply_to") or step.reply_to or "").strip()

        try:
            res = send_email_message(
                to_email=to_email,
                subject=subject,
                body=body,
                from_email=from_email,
                reply_to=reply_to,
            )
            event.provider_message_id = res.provider_message_id
            event.provider_payload = res.provider_payload
            event.status = SequenceEvent.Status.SENT
            event.error = ""
            event.save(update_fields=["provider_message_id", "provider_payload", "status", "error", "updated_at"])
            return Response(SequenceEventSerializer(event).data)
        except Exception as e:
            event.status = SequenceEvent.Status.FAILED
            event.error = str(e)
            event.save(update_fields=["status", "error", "updated_at"])
            return Response({"detail": str(e)}, status=400)

    @action(detail=True, methods=["post"], url_path="mark_complete")
    def mark_complete(self, request, pk=None):
        event = self.get_object()
        event.status = SequenceEvent.Status.SENT
        event.error = ""
        event.save(update_fields=["status", "error", "updated_at"])
        return Response(SequenceEventSerializer(event).data)
