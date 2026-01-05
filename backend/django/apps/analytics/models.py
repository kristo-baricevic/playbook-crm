from django.db import models
from apps.crm.models import Contact
from apps.generation.models import ScheduledMessage

class AnalyticsEvent(models.Model):
    EVENT_TYPES = (
        ("sent", "sent"),
        ("opened", "opened"),
        ("clicked", "clicked"),
        ("replied", "replied"),
    )

    event_type = models.CharField(max_length=32, choices=EVENT_TYPES)
    contact = models.ForeignKey(Contact, on_delete=models.CASCADE)
    scheduled_message = models.ForeignKey(ScheduledMessage, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
