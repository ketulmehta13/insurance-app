# agent/admin.py

from django.contrib import admin
from .models import SubAgent

@admin.register(SubAgent)
class SubAgentAdmin(admin.ModelAdmin):
    """
    Customizes the display of the SubAgent model in the Django admin.
    """
    # CORRECTED: Removed 'specialization' as it does not exist on the model
    list_display = ('agent_code', 'first_name', 'last_name', 'email', 'mobile_no', 'city', 'status')
    search_fields = ('first_name', 'last_name', 'agent_code', 'email', 'mobile_no')
    # CORRECTED: Removed 'specialization' from the filter list
    list_filter = ('status', 'city', 'state')
    ordering = ('-joining_date',)
