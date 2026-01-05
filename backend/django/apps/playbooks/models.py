from __future__ import annotations

from django.db import models
from django.utils import timezone


class Playbook(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, default="")
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(default=timezone.now, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.name

class Material(models.Model):
    title = models.CharField(max_length=255)
    file = models.FileField(upload_to="materials/", blank=True, null=True)
    mime_type = models.CharField(max_length=100, blank=True, default="")
    tags = models.JSONField(blank=True, default=list)

    extracted_text = models.TextField(blank=True, default="")
    created_at = models.DateTimeField(default=timezone.now, db_index=True)

    def __str__(self) -> str:
        return self.title


class PlaybookStep(models.Model):
    class ActionType(models.TextChoices):
        EMAIL_SEND = "EMAIL_SEND", "Email: Send"
        LINKEDIN_CONNECT = "LINKEDIN_CONNECT", "LinkedIn: Connect"
        LINKEDIN_MESSAGE = "LINKEDIN_MESSAGE", "LinkedIn: Message"

    playbook = models.ForeignKey(Playbook, on_delete=models.CASCADE, related_name="steps")

    step_index = models.PositiveIntegerField(default=0, db_index=True)
    day_offset = models.IntegerField(default=0, db_index=True)

    action_type = models.CharField(max_length=32, choices=ActionType.choices)

    instructions = models.TextField(blank=True, default="")

    enabled = models.BooleanField(default=True)

    from_email = models.EmailField(blank=True, default="")
    reply_to = models.EmailField(blank=True, default="")

    materials = models.ManyToManyField(Material, through="StepMaterial", related_name="steps")

    created_at = models.DateTimeField(default=timezone.now, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["step_index", "id"]
        indexes = [
            models.Index(fields=["playbook", "step_index"]),
            models.Index(fields=["playbook", "day_offset"]),
        ]

    def __str__(self) -> str:
        return f"{self.playbook_id}:{self.step_index}:{self.action_type}"


class StepMaterial(models.Model):
    step = models.ForeignKey(PlaybookStep, on_delete=models.CASCADE)
    material = models.ForeignKey(Material, on_delete=models.CASCADE)
    role = models.CharField(max_length=32, blank=True, default="required")
    max_chars = models.PositiveIntegerField(blank=True, null=True)

    class Meta:
        unique_together = [("step", "material")]


class PlaybookRun(models.Model):
    class Status(models.TextChoices):
        ACTIVE = "ACTIVE", "Active"
        PAUSED = "PAUSED", "Paused"
        COMPLETED = "COMPLETED", "Completed"

    playbook = models.ForeignKey(Playbook, on_delete=models.CASCADE, related_name="runs")

    person_id = models.CharField(max_length=64, db_index=True)
    person_payload = models.JSONField(blank=True, default=dict)

    start_date = models.DateField(db_index=True)
    status = models.CharField(max_length=16, choices=Status.choices, default=Status.ACTIVE)

    created_at = models.DateTimeField(default=timezone.now, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        indexes = [
            models.Index(fields=["playbook", "person_id"]),
            models.Index(fields=["status", "start_date"]),
        ]


class SequenceEvent(models.Model):
    class Status(models.TextChoices):
        QUEUED = "QUEUED", "Queued"
        GENERATED = "GENERATED", "Generated"
        READY = "READY", "Ready"
        SENT = "SENT", "Sent"
        FAILED = "FAILED", "Failed"
        SKIPPED = "SKIPPED", "Skipped"

    run = models.ForeignKey(PlaybookRun, on_delete=models.CASCADE, related_name="events")
    step = models.ForeignKey(PlaybookStep, on_delete=models.PROTECT, related_name="events")

    scheduled_for = models.DateTimeField(db_index=True)
    status = models.CharField(max_length=16, choices=Status.choices, default=Status.QUEUED)

    generated_subject = models.TextField(blank=True, default="")
    generated_body = models.TextField(blank=True, default="")
    final_subject = models.TextField(blank=True, default="")
    final_body = models.TextField(blank=True, default="")

    provider_message_id = models.CharField(max_length=255, blank=True, default="")
    provider_payload = models.JSONField(blank=True, default=dict)

    error = models.TextField(blank=True, default="")

    created_at = models.DateTimeField(default=timezone.now, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["scheduled_for", "id"]
        indexes = [
            models.Index(fields=["run", "scheduled_for"]),
            models.Index(fields=["status", "scheduled_for"]),
        ]

class PromptVersion(models.Model):
    step = models.ForeignKey(
        "playbooks.PlaybookStep",
        on_delete=models.CASCADE,
        related_name="prompt_versions",
    )
    prompt = models.TextField()
    created_at = models.DateTimeField(default=timezone.now, db_index=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"PromptVersion(step_id={self.step_id}, created_at={self.created_at})"
