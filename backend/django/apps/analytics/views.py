from django.db.models import Count
from django.utils.timezone import now
from rest_framework.views import APIView
from rest_framework.response import Response
from apps.analytics.models import AnalyticsEvent

class ChartView(APIView):
    def get(self, request):
        chart_type = request.query_params["type"]
        days = int(request.query_params.get("days", 30))

        qs = AnalyticsEvent.objects.filter(
            created_at__gte=now() - timedelta(days=days)
        )

        if chart_type == "sent_per_day":
            data = (
                qs.filter(event_type="sent")
                .extra(select={"day": "date(created_at)"})
                .values("day")
                .annotate(count=Count("id"))
            )
            return Response(list(data))

        return Response([])
