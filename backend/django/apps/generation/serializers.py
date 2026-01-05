from rest_framework import serializers
from apps.generation.models import ScheduledMessage, GeneratedMessage

class GeneratedMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneratedMessage
        fields = "__all__"


class ScheduledMessageSerializer(serializers.ModelSerializer):
    generations = GeneratedMessageSerializer(many=True, read_only=True)

    class Meta:
        model = ScheduledMessage
        fields = "__all__"
