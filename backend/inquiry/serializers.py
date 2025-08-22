from rest_framework import serializers
from .models import Inquiry
from client.serializers import FamilyHeadSerializer
from policy.serializers import PolicySerializer
from agent.serializers import SubAgentSerializer
from agent.models import SubAgent
from client.models import FamilyHead  
from policy.models import Policy
from agent.models import SubAgent 

class InquirySerializer(serializers.ModelSerializer):
    customer = FamilyHeadSerializer(read_only=True)
    policy = PolicySerializer(read_only=True)
    customer_id = serializers.PrimaryKeyRelatedField(
        queryset=FamilyHead.objects.all(), write_only=True, source='customer', required=False
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
    
    # Add document field and related methods
    document_url = serializers.SerializerMethodField()
    document_name = serializers.SerializerMethodField()
    has_document = serializers.SerializerMethodField()

    class Meta:
        model = Inquiry
        fields = [
            'id', 'customer', 'customer_id', 'policy', 'policy_id',
            'message', 'document', 'document_url', 'document_name', 'has_document',
            'status', 'assigned_subagent', 'assigned_subagent_id', 'assigned_agent_name',
            'assigned_agent_details', 'created_at', 'updated_at'
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
                "email": getattr(agent, 'email', None),
                "phone": getattr(agent, 'phone', None),
            }
        return None
    
    def get_document_url(self, obj):
        """Return the URL of the uploaded document"""
        if obj.document:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.document.url)
            return obj.document.url
        return None
    
    def get_document_name(self, obj):
        """Return the name of the uploaded document"""
        if obj.document:
            return obj.document.name.split('/')[-1]  # Get filename without path
        return None
    
    def get_has_document(self, obj):
        """Return boolean indicating if inquiry has a document"""
        return bool(obj.document)


class InquiryCreateSerializer(serializers.ModelSerializer):
    """Simplified serializer for creating inquiries with document upload"""
    # Add this line to properly map policy_id to the policy field
    policy_id = serializers.PrimaryKeyRelatedField(
        queryset=Policy.objects.all(), 
        source='policy',  # This maps policy_id to the policy field
        write_only=True
    )
    
    class Meta:
        model = Inquiry
        fields = ['policy_id', 'message', 'document']
        
    def validate_document(self, value):
        """Validate uploaded document"""
        if value:
            # Check file size (max 5MB)
            if value.size > 5 * 1024 * 1024:
                raise serializers.ValidationError("File size cannot exceed 5MB.")
            
            # Check file type
            allowed_types = [
                'application/pdf',
                'image/jpeg', 
                'image/jpg', 
                'image/png',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            ]
            
            if value.content_type not in allowed_types:
                raise serializers.ValidationError(
                    "Only PDF, DOC, DOCX, JPG, JPEG, and PNG files are allowed."
                )
        
        return value


class InquiryUpdateSerializer(serializers.ModelSerializer):
    """Serializer for updating inquiry status and assignment"""
    assigned_subagent_id = serializers.PrimaryKeyRelatedField(
        queryset=SubAgent.objects.all(), 
        source='assigned_subagent', 
        required=False, 
        allow_null=True,
        write_only=True
    )
    assigned_agent_name = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Inquiry
        fields = ['status', 'assigned_subagent_id', 'assigned_agent_name']
        
    def get_assigned_agent_name(self, obj):
        if obj.assigned_subagent:
            return f"{obj.assigned_subagent.first_name} {obj.assigned_subagent.last_name}"
        return "Not assigned"
        
    def validate_status(self, value):
        """Validate status transitions"""
        value = value.lower() 
        valid_statuses = [choice[0] for choice in Inquiry.STATUS_CHOICES]
        if value not in valid_statuses:
            raise serializers.ValidationError(f"Invalid status. Must be one of: {valid_statuses}")
        return value
    
    def update(self, instance, validated_data):
        """Custom update to handle agent assignment"""
        # CHANGED: Handle the foreign key assignment properly
        assigned_subagent = validated_data.pop('assigned_subagent', None)
        
        # Update other fields first
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        # CHANGED: Simplified agent assignment logic
        # Check if assigned_subagent_id was sent in the request (even if None)
        if 'assigned_subagent_id' in self.initial_data:
            instance.assigned_subagent = assigned_subagent
            # If assigning an agent (not None), automatically set status to assigned
            if assigned_subagent:
                instance.status = 'assigned'
                print(f"Assigning inquiry {instance.id} to agent {assigned_subagent}")  # Debug log
            else:
                # If unassigning (setting to None), reset status
                if instance.status == 'assigned':
                    instance.status = 'accepted'
                print(f"Unassigning inquiry {instance.id}")  # Debug log
        
        instance.save()
        print(f"Saved inquiry {instance.id} with status={instance.status}, agent={instance.assigned_subagent}")  # Debug log
        return instance


class InquiryListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for listing inquiries"""
    customer = serializers.SerializerMethodField()  # FIXED: Added to fields
    policy = serializers.SerializerMethodField()    # FIXED: Added to fields
    customer_name = serializers.SerializerMethodField()
    policy_number = serializers.SerializerMethodField()
    policy_type = serializers.SerializerMethodField()
    assigned_agent_name = serializers.SerializerMethodField()
    has_document = serializers.SerializerMethodField()
    
    class Meta:
        model = Inquiry
        fields = [
            'id', 'customer', 'policy', 'customer_name', 'policy_number', 'policy_type',  # FIXED: Added customer and policy
            'message', 'status', 'assigned_agent_name', 'has_document',
            'created_at', 'updated_at'
        ]
        
    def get_customer(self, obj):
        """Return full customer object with null safety"""
        if obj.customer:
            return {
                'id': obj.customer.id,
                'full_name': f"{obj.customer.first_name} {obj.customer.last_name}".strip(),
                'first_name': obj.customer.first_name,
                'last_name': obj.customer.last_name,
                'username': getattr(obj.customer, 'username', None),
            }
        return None
    
    def get_policy(self, obj):
        """Return full policy object with null safety"""
        if obj.policy:
            return {
                'id': obj.policy.id,
                'policy_number': obj.policy.policy_number,
                'policy_type': obj.policy.policy_type,
            }
        return None
    
    def get_customer_name(self, obj):
        """Return the full customer name"""
        if obj.customer:
            full_name = f"{obj.customer.first_name} {obj.customer.last_name}".strip()
            return full_name if full_name else "Unknown Customer"
        return "Unknown Customer"
    
    def get_policy_number(self, obj):
        """Safely return policy number"""
        return obj.policy.policy_number if obj.policy else "N/A"
    
    def get_policy_type(self, obj):
        """Safely return policy type"""
        return obj.policy.policy_type if obj.policy else "N/A"
    
    def get_assigned_agent_name(self, obj):
        """Return the full name of the assigned agent"""
        agent = obj.assigned_subagent
        if agent:
            return f"{agent.first_name} {agent.last_name}"
        return "Not assigned"
    
    def get_has_document(self, obj):
        """Return boolean indicating if inquiry has a document"""
        return bool(obj.document)


# NEW: Add a serializer for admin inquiry response
class InquiryResponseSerializer(serializers.ModelSerializer):
    """Serializer for admin/agent to respond to inquiries"""
    response = serializers.CharField(write_only=True, required=False, allow_blank=True)
    
    class Meta:
        model = Inquiry
        fields = ['status', 'response']
        
    def validate_status(self, value):
        """Validate status transitions"""
        valid_statuses = [choice[0] for choice in Inquiry.STATUS_CHOICES]
        if value not in valid_statuses:
            raise serializers.ValidationError(f"Invalid status. Must be one of: {valid_statuses}")
        return value
        
    def update(self, instance, validated_data):
        """Custom update to handle response field"""
        response_text = validated_data.pop('response', None)
        
        # Update status
        instance.status = validated_data.get('status', instance.status)
        instance.save()
        
        # If response is provided, you can store it in a separate field or handle it
        # For now, we'll just log it (you can add a response field to your model later)
        if response_text:
            # You can add a response field to your Inquiry model or handle this differently
            print(f"Admin response for inquiry {instance.id}: {response_text}")
            
        return instance
