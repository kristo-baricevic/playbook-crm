from datetime import timedelta
from django.utils.timezone import now
from rest_framework.views import APIView
from rest_framework.response import Response
from apps.playbooks.models import Playbook
from apps.crm.models import Contact
from apps.generation.models import ScheduledMessage, GeneratedMessage
from apps.generation.utils import diff_text


def call_llm(prompt: str) -> str:
    return f"Generated email for prompt: {prompt[:50]}"

class GenerateView(APIView):
    def post(self, request):
        playbook = Playbook.objects.get(id=request.data["playbook_id"])
        contacts = Contact.objects.filter(id__in=request.data["contact_ids"])
        steps = playbook.steps.order_by("order")

        for contact in contacts:
            for step in steps:
                scheduled_for = now() + timedelta(days=step.day_offset)

                scheduled = ScheduledMessage.objects.create(
                    contact=contact,
                    playbook_step=step,
                    scheduled_for=scheduled_for,
                )

                rendered_prompt = step.prompt_version.prompt_text.format(
                    name=contact.name,
                    company=contact.company_name,
                )

                output = call_llm(rendered_prompt)

                GeneratedMessage.objects.create(
                    scheduled_message=scheduled,
                    prompt_version=step.prompt_version,
                    rendered_prompt=rendered_prompt,
                    output_text=output,
                )

        return Response({"status": "ok"})


class RegenerateView(APIView):
    def post(self, request, message_id):
        previous = GeneratedMessage.objects.get(id=message_id)

        output = call_llm(previous.rendered_prompt)

        diff = diff_text(previous.output_text, output)

        GeneratedMessage.objects.create(
            scheduled_message=previous.scheduled_message,
            prompt_version=previous.prompt_version,
            rendered_prompt=previous.rendered_prompt,
            output_text=output,
            diff_from_previous=diff,
        )

        return Response({"status": "regenerated"})
