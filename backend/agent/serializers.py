# agent/serializers.py

from rest_framework import serializers
from .models import SubAgent

class SubAgentSerializer(serializers.ModelSerializer):
    """
    Serializer for the SubAgent model. Handles all fields including file uploads.
    """
    class Meta:
        model = SubAgent
        fields = '__all__'
