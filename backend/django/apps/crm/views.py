from django.db.models import Count, Max, Min, Q
from rest_framework.viewsets import ReadOnlyModelViewSet
from apps.crm.models import Contact
from apps.analytics.models import AnalyticsEvent
from apps.generation.models import ScheduledMessage
from apps.crm.serializers import ContactSerializer

class ContactViewSet(ReadOnlyModelViewSet):
    serializer_class = ContactSerializer

    def get_queryset(self):
        qs = Contact.objects.filter(
            organization__owner=self.request.user
        )

        qs = qs.annotate(
            emails_sent=Count(
                "scheduledmessage__analyticsevent",
                filter=Q(scheduledmessage__analyticsevent__event_type="sent"),
            ),
            emails_scheduled=Count(
                "scheduledmessage",
                filter=Q(scheduledmessage__status="scheduled"),
            ),
            last_contacted=Max(
                "scheduledmessage__analyticsevent__created_at",
                filter=Q(scheduledmessage__analyticsevent__event_type="sent"),
            ),
            next_contacted=Min(
                "scheduledmessage__scheduled_for",
                filter=Q(scheduledmessage__status="scheduled"),
            ),
        )

        return qs
