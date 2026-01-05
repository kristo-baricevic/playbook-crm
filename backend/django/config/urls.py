from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from apps.crm.views import ContactViewSet
from apps.analytics.views import ChartView
from apps.generation.views import GenerateView

router = DefaultRouter()
router.register("contacts", ContactViewSet, basename="contacts")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
    path("api/generate/", GenerateView.as_view()),
    path("api/analytics/", include("apps.analytics.urls")),
    path("api/", include("apps.playbooks.urls")),
]

