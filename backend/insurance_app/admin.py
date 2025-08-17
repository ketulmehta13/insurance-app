# insurance/admin.py

from django.contrib import admin
from .models import InsuranceProduct, Claim

@admin.register(InsuranceProduct)
class InsuranceProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'policy_type', 'status', 'premium_range')
    list_filter = ('status', 'policy_type')
    search_fields = ('name', 'policy_type')

@admin.register(Claim)
class ClaimAdmin(admin.ModelAdmin):
    list_display = ('claim_id', 'policy', 'claimant_name', 'claim_amount', 'status', 'date_of_claim')
    list_filter = ('status', 'date_of_claim')
    search_fields = ('claim_id', 'policy__policy_number', 'claimant_name')
    autocomplete_fields = ['policy']
