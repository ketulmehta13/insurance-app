from rest_framework import serializers
from .models import Policy, PolicyRenewal
from client.serializers import FamilyHeadSerializer
from client.models import FamilyHead

class PolicySerializer(serializers.ModelSerializer):
    # For reading (GET requests) - shows full holder information
    holder = FamilyHeadSerializer(read_only=True)
    
    # For writing (POST/PUT requests) - accepts holder ID
    holder_id = serializers.PrimaryKeyRelatedField(
        queryset=FamilyHead.objects.all(), 
        write_only=True, 
        source='holder',
        required=True
    )

    class Meta:
        model = Policy
        fields = [
            'id', 'policy_number', 'insurance_company', 'policy_type',
            'start_date', 'end_date', 'premium_amount', 'sum_assured',
            'status', 'policy_document', 'holder', 'holder_id',
            'created_at', 'updated_at'
        ]
        read_only_fields = ('id', 'created_at', 'updated_at')

    def validate(self, data):
        # Add custom validation
        if data.get('start_date') and data.get('end_date'):
            if data['start_date'] >= data['end_date']:
                raise serializers.ValidationError({
                    'end_date': 'End date must be after start date.'
                })
        return data

class PolicyForRenewalSerializer(serializers.ModelSerializer):
    policy_holder_name = serializers.SerializerMethodField()

    class Meta:
        model = Policy
        fields = [
            'id', 'policy_number', 'policy_holder_name', 
            'policy_type', 'sum_assured', 
            'premium_amount', 'end_date', 'status'
        ]

    def get_policy_holder_name(self, obj):
        # Fixed to use 'holder' instead of 'policy_holder'
        if obj.holder:
            return f"{obj.holder.first_name} {obj.holder.last_name}".strip()
        return "N/A"

class PolicyRenewalCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PolicyRenewal
        fields = ['policy', 'renewal_date', 'new_sum_assured', 'new_premium_amount', 'new_end_date', 'remarks']

class DeletedPolicySerializer(serializers.ModelSerializer):
    policy_holder_name = serializers.SerializerMethodField()
    deleted_by = serializers.CharField(default="Admin", read_only=True)

    class Meta:
        model = Policy
        fields = [
            'id', 'policy_number', 'holder', 'policy_holder_name',
            'policy_type', 'sum_assured', 'premium_amount', 'status',
            'deleted_at', 'deleted_by',
        ]

    def get_policy_holder_name(self, obj):
        if obj.holder:
            return f"{obj.holder.first_name} {obj.holder.last_name}".strip()
        return "Unknown"
