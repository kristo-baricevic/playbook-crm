from django.db import models
from apps.crm.models import Contact
from apps.playbooks.models import PlaybookStep, PromptVersion

class ScheduledMessage(models.Model):
    contact = models.ForeignKey(Contact, on_delete=models.CASCADE)
    playbook_step = models.ForeignKey(PlaybookStep, on_delete=models.CASCADE)
    scheduled_for = models.DateTimeField()
    status = models.CharField(
        max_length=32,
        choices=[
            ("scheduled", "scheduled"),
            ("sent", "sent"),
            ("demo_blocked", "demo_blocked"),
        ],
        default="scheduled",
    )
    created_at = models.DateTimeField(auto_now_add=True)


class GeneratedMessage(models.Model):
    scheduled_message = models.ForeignKey(
        ScheduledMessage, related_name="generations", on_delete=models.CASCADE
    )
    prompt_version = models.ForeignKey(PromptVersion, on_delete=models.PROTECT)
    rendered_prompt = models.TextField()
    output_text = models.TextField()
    diff_from_previous = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
