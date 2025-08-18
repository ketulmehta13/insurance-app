from rest_framework import serializers
from .models import Inquiry
from client.serializers import FamilyHeadSerializer
from policy.serializers import PolicySerializer
from agent.serializers import SubAgentSerializer
from .models import SubAgent,FamilyHead,Policy

class InquirySerializer(serializers.ModelSerializer):
    customer = FamilyHeadSerializer(read_only=True)
    policy = PolicySerializer(read_only=True)
    customer_id = serializers.PrimaryKeyRelatedField(
        queryset=FamilyHead.objects.all(), write_only=True, source='customer',required=False
    )
    policy_id = serializers.PrimaryKeyRelatedField(
        queryset=Policy.objects.all(), write_only=True, source='policy'
    )
    assigned_subagent = SubAgentSerializer(read_only=True)
    assigned_subagent_id = serializers.PrimaryKeyRelatedField(
        queryset=SubAgent.objects.all(), write_only=True, source='assigned_subagent', required=False, allow_null=True
    )

    class Meta:
        model = Inquiry
        fields = [
            'id', 'customer', 'customer_id', 'policy', 'policy_id',
            'message', 'status', 'assigned_subagent', 'assigned_subagent_id',
            'created_at', 'updated_at'
        ]
        read_only_fields = ('id', 'created_at', 'updated_at', 'assigned_subagent')

