from rest_framework import serializers
from .models import Policy, PolicyRenewal

class PolicySerializer(serializers.ModelSerializer):
    policy_holder_name = serializers.SerializerMethodField()

    class Meta:
        model = Policy
        fields = '__all__'

    def get_policy_holder_name(self, obj):
        if obj.policy_holder:  # This assumes you have GenericForeignKey (content_type + object_id)
            # Try to return a sensible display value
            if hasattr(obj.policy_holder, "full_name"):  # For family head/member
                return obj.policy_holder.full_name
            elif hasattr(obj.policy_holder, "name"):  # For firm
                return obj.policy_holder.name
            return str(obj.policy_holder)
        return "N/A"

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
        if obj.policy_holder:
            if hasattr(obj.policy_holder, "full_name"):
                return obj.policy_holder.full_name
            elif hasattr(obj.policy_holder, "name"):
                return obj.policy_holder.name
            return str(obj.policy_holder)
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
            'id',
            'policy_number',
            'policy_holder_name',
            'policy_type',
            'sum_assured',
            'premium_amount',
            'status',
            'deleted_at',
            'deleted_by',
        ]

    def get_policy_holder_name(self, obj):
        holder = getattr(obj, "policy_holder", None)
        if holder is not None:
            if hasattr(holder, "first_name"):
                return holder.first_name
            if hasattr(holder, "firm_name"):
                return holder.firm_name
            return str(holder)
        return "N/A"
