from rest_framework import serializers
from apps.playbooks.models import Playbook, PlaybookStep, PromptVersion

class PromptVersionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PromptVersion
        fields = "__all__"


class PlaybookStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaybookStep
        fields = "__all__"


class PlaybookSerializer(serializers.ModelSerializer):
    steps = PlaybookStepSerializer(many=True, read_only=True)

    class Meta:
        model = Playbook
        fields = "__all__"
