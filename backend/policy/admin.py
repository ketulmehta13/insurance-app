# policy/admin.py

from django.contrib import admin
from .models import Policy, PolicyRenewal

@admin.register(Policy)
class PolicyAdmin(admin.ModelAdmin):
    list_display = ('policy_number', 'policy_holder', 'status', 'is_deleted', 'deleted_at')
    list_filter = ('is_deleted', 'status', 'policy_type')
    search_fields = ('policy_number',)
    
    def get_queryset(self, request):
        # Use all_objects to show both active and deleted policies in the admin
        return Policy.all_objects.all()

# ... existing PolicyRenewalAdmin ...
