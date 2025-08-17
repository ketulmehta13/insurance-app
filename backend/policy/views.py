# policy/views.py

from rest_framework import generics, status, views
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from .models import Policy
from .serializers import PolicySerializer, PolicyForRenewalSerializer, PolicyRenewalCreateSerializer, DeletedPolicySerializer
from datetime import date, timedelta


from rest_framework.views import APIView
from .models import Policy
from .serializers import PolicyRenewalCreateSerializer

class RenewPolicyView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = PolicyRenewalCreateSerializer(data=request.data)
        if serializer.is_valid():
            policy_id = serializer.validated_data['policy'].id if hasattr(serializer.validated_data['policy'], 'id') else serializer.validated_data['policy']
            try:
                policy = Policy.objects.get(pk=policy_id)
            except Policy.DoesNotExist:
                return Response({"error": "Policy not found."}, status=status.HTTP_404_NOT_FOUND)

            # Create the renewal record
            renewal = serializer.save()

            # Update the original policy fields
            policy.sum_assured = serializer.validated_data['new_sum_assured']
            policy.premium_amount = serializer.validated_data['new_premium_amount']
            policy.end_date = serializer.validated_data['new_end_date']
            policy.status = 'Active'  # Set or maintain as 'Active', adjust logic if needed
            policy.save()

            return Response({"message": "Policy renewed successfully!", "renewal_id": renewal.id}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# --- NEW VIEW FOR TRASH MANAGEMENT ---
class DeletedPoliciesView(views.APIView):
    """
    Handles listing, restoring, and permanently deleting soft-deleted policies.
    """
    def get(self, request, *args, **kwargs):
        """Returns a list of all soft-deleted policies."""
        deleted_policies = Policy.objects.trash()
        serializer = DeletedPolicySerializer(deleted_policies, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        """Restores a soft-deleted policy."""
        policy_id = request.data.get('id')
        try:
            policy = Policy.all_objects.get(pk=policy_id, is_deleted=True)
            policy.restore()
            return Response({"message": "Policy restored successfully."}, status=status.HTTP_200_OK)
        except Policy.DoesNotExist:
            return Response({"error": "Policy not found in trash."}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, *args, **kwargs):
        """Permanently deletes a policy."""
        policy_id = request.data.get('id')
        try:
            policy = Policy.all_objects.get(pk=policy_id, is_deleted=True)
            policy.delete() # This is a permanent, hard delete
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Policy.DoesNotExist:
            return Response({"error": "Policy not found in trash."}, status=status.HTTP_404_NOT_FOUND)


# --- UPDATED PolicyDetailView to perform SOFT DELETE ---
class PolicyDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Policy.all_objects.all() # Use all_objects to be able to view/edit/delete
    serializer_class = PolicySerializer
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def perform_destroy(self, instance):
        """Override the default delete behavior to perform a soft delete."""
        instance.soft_delete()

# --- Existing Views ---
class PolicyListCreateView(generics.ListCreateAPIView):
    serializer_class = PolicySerializer

    def get_queryset(self):
        queryset = Policy.objects.all()
        status = self.request.query_params.get('status')
        policy_type = self.request.query_params.get('policy_type')
        if status:
            queryset = queryset.filter(status=status)
        if policy_type:
            queryset = queryset.filter(policy_type=policy_type)
        return queryset

class PoliciesDueForRenewalView(generics.ListAPIView):
    # ... existing code ...
    serializer_class = PolicyForRenewalSerializer
    def get_queryset(self):
        thirty_days_from_now = date.today() + timedelta(days=30)
        return Policy.objects.filter(end_date__lte=thirty_days_from_now).exclude(status='Cancelled')

