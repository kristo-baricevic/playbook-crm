from rest_framework import serializers
from apps.crm.models import Contact

class ContactSerializer(serializers.ModelSerializer):
    emails_sent = serializers.IntegerField(read_only=True)
    emails_scheduled = serializers.IntegerField(read_only=True)
    last_contacted = serializers.DateTimeField(read_only=True)
    next_contacted = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Contact
        fields = "__all__"
