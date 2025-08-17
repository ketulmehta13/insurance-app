# policy/urls.py

from django.urls import path
from .views import (
    PolicyListCreateView, 
    PolicyDetailView, 
    PoliciesDueForRenewalView, 
    RenewPolicyView,
    DeletedPoliciesView # Import the new trash view
)

urlpatterns = [
    # --- NEW TRASH URL ---
    path('policies/deleted/', DeletedPoliciesView.as_view(), name='deleted-policy-list'),

    # Existing URLs
    path('policies/due-for-renewal/', PoliciesDueForRenewalView.as_view(), name='policy-due-for-renewal'),
    path('policies/renew/', RenewPolicyView.as_view(), name='policy-renew'),
    path('policies/', PolicyListCreateView.as_view(), name='policy-list-create'),
    path('policies/<int:pk>/', PolicyDetailView.as_view(), name='policy-detail'),
]
