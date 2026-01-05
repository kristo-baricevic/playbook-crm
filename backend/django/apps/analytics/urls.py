from django.urls import path
from .views import AnalyticsOverviewView, ChartView

urlpatterns = [
    path("overview/", AnalyticsOverviewView.as_view()),
    path("charts/", ChartView.as_view()),
]
