# client/urls.py

from django.urls import path
from .views import (
    FamilyHeadAPIView, 
    FamilyMemberAPIView, 
    FamilyHeadListView, 
    FirmAPIView,
    ClientListView,
    ClientDetailView,
    TrashManagementView # Import the new trash view
)

urlpatterns = [
    # --- NEW ROUTE FOR TRASH MANAGEMENT ---
    path('trash/', TrashManagementView.as_view(), name='trash-management'),

    # Existing routes
    path('client-detail/<str:client_type>/<int:client_id>/', ClientDetailView.as_view(), name='client-detail'),
    path('manage-clients/', ClientListView.as_view(), name='manage-clients'),
    path('family-heads/', FamilyHeadListView.as_view(), name='family-head-list'),
    path('add-family-head/', FamilyHeadAPIView.as_view(), name='add-family-head'),
    path('add-family-member/', FamilyMemberAPIView.as_view(), name='add-family-member'),
    path('add-firm/', FirmAPIView.as_view(), name='add-firm'),
]
