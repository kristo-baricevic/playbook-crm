from django.db.models import Count
from django.utils.timezone import now
from rest_framework.views import APIView
from rest_framework.response import Response
from apps.analytics.models import AnalyticsEvent
from datetime import timedelta

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

        if chart_type == "emails_sent":
            return Response([
                {"date": "2026-01-01", "value": 12},
                {"date": "2026-01-02", "value": 18},
                {"date": "2026-01-03", "value": 9},
            ])

        if chart_type == "response_rate":
            return Response([
                {"date": "2026-01-01", "value": 0.12},
                {"date": "2026-01-02", "value": 0.18},
                {"date": "2026-01-03", "value": 0.09},
            ])

        if chart_type == "industry_breakdown":
            return Response([
                {"label": "SaaS", "value": 40},
                {"label": "Finance", "value": 25},
                {"label": "Healthcare", "value": 20},
                {"label": "Other", "value": 15},
            ])

        return Response([])

class AnalyticsOverviewView(APIView):
    def get(self, request):
        return Response({
            "total_contacts": 1240,
            "selected_contacts": 312,
            "active_contacts": 887,
        })

class AnalyticsTimeSeriesView(APIView):
    def get(self, request):
        qs = (
            Contact.objects
            .annotate(date=TruncDay("created_at"))
            .values("date")
            .annotate(count=Count("id"))
            .order_by("date")
        )

        return Response([
            {"date": row["date"].date().isoformat(), "count": row["count"]}
            for row in qs
        ])

class AnalyticsByStatusView(APIView):
    def get(self, request):
        qs = Contact.objects.values("status").annotate(count=Count("id"))
        return Response(list(qs))

