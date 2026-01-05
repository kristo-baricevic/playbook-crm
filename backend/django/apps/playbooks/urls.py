from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import MaterialViewSet, PlaybookRunViewSet, PlaybookStepViewSet, PlaybookViewSet, SequenceEventViewSet

router = DefaultRouter()
router.register(r"playbooks", PlaybookViewSet, basename="playbook")
router.register(r"playbook-steps", PlaybookStepViewSet, basename="playbook-step")
router.register(r"materials", MaterialViewSet, basename="material")
router.register(r"playbook-runs", PlaybookRunViewSet, basename="playbook-run")
router.register(r"sequence-events", SequenceEventViewSet, basename="sequence-event")

urlpatterns = [
    path("", include(router.urls)),
]
