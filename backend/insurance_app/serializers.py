# insurance/serializers.py

from rest_framework import serializers
from .models import InsuranceProduct, Claim
from policy.models import Policy

class InsuranceProductSerializer(serializers.ModelSerializer):
    # We can count the number of active policies for each product type
    active_policies = serializers.SerializerMethodField()

    class Meta:
        model = InsuranceProduct
        fields = ['id', 'name', 'policy_type', 'premium_range', 'status', 'active_policies']

    def get_active_policies(self, obj):
        # This is an example of how you might calculate this.
        # It counts all policies that match the product's type.
        return Policy.objects.filter(policy_type=obj.policy_type, status='Active').count()

class ClaimSerializer(serializers.ModelSerializer):
    policy_number = serializers.CharField(source='policy.policy_number', read_only=True)

    class Meta:
        model = Claim
        fields = ['id', 'claim_id', 'policy_number', 'claimant_name', 'claim_amount', 'date_of_claim', 'status']
