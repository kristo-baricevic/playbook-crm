from __future__ import annotations

from rest_framework import serializers

from .models import Material, Playbook, PlaybookRun, PlaybookStep, SequenceEvent, StepMaterial
from .services.runs import create_events_for_run


class MaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = ["id", "title", "mime_type", "tags", "file", "extracted_text", "created_at"]
        read_only_fields = ["id", "created_at"]


class PlaybookStepSerializer(serializers.ModelSerializer):
    material_ids = serializers.ListField(child=serializers.IntegerField(), required=False)

    class Meta:
        model = PlaybookStep
        fields = [
            "id",
            "playbook",
            "step_index",
            "day_offset",
            "action_type",
            "instructions",
            "enabled",
            "from_email",
            "reply_to",
            "material_ids",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    def to_representation(self, instance: PlaybookStep):
        data = super().to_representation(instance)
        data["material_ids"] = list(
            StepMaterial.objects.filter(step=instance).values_list("material_id", flat=True)
        )
        return data

    def create(self, validated_data):
        material_ids = validated_data.pop("material_ids", [])
        step = super().create(validated_data)
        _sync_step_materials(step=step, material_ids=material_ids)
        return step

    def update(self, instance, validated_data):
        material_ids = validated_data.pop("material_ids", None)
        step = super().update(instance, validated_data)
        if material_ids is not None:
            _sync_step_materials(step=step, material_ids=material_ids)
        return step


def _sync_step_materials(*, step: PlaybookStep, material_ids: list[int]) -> None:
    StepMaterial.objects.filter(step=step).exclude(material_id__in=material_ids).delete()
    existing = set(StepMaterial.objects.filter(step=step, material_id__in=material_ids).values_list("material_id", flat=True))
    to_add = [mid for mid in material_ids if mid not in existing]
    StepMaterial.objects.bulk_create([StepMaterial(step=step, material_id=mid) for mid in to_add])


class PlaybookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Playbook
        fields = ["id", "name", "description", "is_active", "created_at", "updated_at"]
        read_only_fields = ["id", "created_at", "updated_at"]


class SequenceEventSerializer(serializers.ModelSerializer):
    step = PlaybookStepSerializer(read_only=True)

    class Meta:
        model = SequenceEvent
        fields = [
            "id",
            "run",
            "step",
            "scheduled_for",
            "status",
            "generated_subject",
            "generated_body",
            "final_subject",
            "final_body",
            "provider_message_id",
            "provider_payload",
            "error",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "provider_message_id", "provider_payload", "error", "created_at", "updated_at"]


class PlaybookRunSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaybookRun
        fields = ["id", "playbook", "person_id", "person_payload", "start_date", "status", "created_at", "updated_at"]
        read_only_fields = ["id", "created_at", "updated_at"]

    def create(self, validated_data):
        run = super().create(validated_data)
        create_events_for_run(run=run)
        return run
