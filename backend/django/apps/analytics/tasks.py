from django.utils.timezone import now
from apps.generation.models import ScheduledMessage
from apps.analytics.models import AnalyticsEvent

def run_demo_sends():
    due = ScheduledMessage.objects.filter(
        scheduled_for__lte=now(),
        status="scheduled",
    )

    for msg in due:
        msg.status = "demo_blocked"
        msg.save()

        AnalyticsEvent.objects.create(
            event_type="sent",
            contact=msg.contact,
            scheduled_message=msg,
        )
