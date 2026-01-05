from django.db import models
from apps.core.models import Organization

class Playbook(models.Model):
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)


class PromptVersion(models.Model):
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    version = models.IntegerField()
    prompt_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("organization", "version")


class PlaybookStep(models.Model):
    playbook = models.ForeignKey(Playbook, related_name="steps", on_delete=models.CASCADE)
    order = models.IntegerField()
    day_offset = models.IntegerField()
    channel = models.CharField(max_length=50, default="email")
    prompt_version = models.ForeignKey(PromptVersion, on_delete=models.PROTECT)
