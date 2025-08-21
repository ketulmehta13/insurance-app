from rest_framework import serializers
from .models import Inquiry
from client.serializers import FamilyHeadSerializer
from policy.serializers import PolicySerializer
from agent.serializers import SubAgentSerializer
from agent.models import SubAgent
from client.models import FamilyHead  
from policy.models import Policy
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
    
     # Add agent details for display
    assigned_agent_name = serializers.SerializerMethodField()
    assigned_agent_details = serializers.SerializerMethodField()

    class Meta:
        model = Inquiry
        fields = [
            'id', 'customer', 'customer_id', 'policy', 'policy_id',
            'message', 'status', 'assigned_subagent', 'assigned_subagent_id','assigned_agent_name',
            'assigned_agent_details',
            'created_at', 'updated_at'
        ]
        read_only_fields = ('id', 'created_at', 'updated_at', 'assigned_subagent')
        
    def get_assigned_agent_name(self, obj):
        """Return the full name of the assigned agent"""
        agent = obj.assigned_subagent
        if agent:
            return f"{agent.first_name} {agent.last_name}"
        return "Not assigned"

    def get_assigned_agent_details(self, obj):
        """Return detailed information about the assigned agent"""
        agent = obj.assigned_subagent
        if agent:
            return {
                "id": agent.id,
                "first_name": agent.first_name,
                "last_name": agent.last_name,
                "full_name": f"{agent.first_name} {agent.last_name}",
                "email": agent.email if hasattr(agent, 'email') else None,
                "phone": agent.phone if hasattr(agent, 'phone') else None,
            }
        return None

