from django.urls import path
from .views import (
    InquiryListCreateView,
    InquiryDetailView,
    MyInquiryListView,
    AgentAssignedInquiriesView,
    AgentInquiryDetailView,
    AdminInquiryListView,
    InquiryStatusUpdateView
         
)

urlpatterns = [
    # Customer: create/list inquiries (upload document supported via POST multipart)
    path('inquiries/', InquiryListCreateView.as_view(), name='inquiry-list-create'),
    path('inquiries/<int:pk>/', InquiryDetailView.as_view(), name='inquiry-detail'),

    # Customer: list only my own inquiries
    path('my-inquiries/', MyInquiryListView.as_view(), name='my-inquiries'),

    # Agent: list inquiries assigned to them
    path('agent-inquiries/', AgentAssignedInquiriesView.as_view(), name='agent-inquiries'),
    path('agent-inquiries/<int:pk>/', AgentInquiryDetailView.as_view(), name='agent-inquiry-detail'),

    # Admin: list all (put permissions check in view)
    path('admin-inquiries/', AdminInquiryListView.as_view(), name='admin-inquiries'),

    # Inquiry status update/response (admin/agent action)
    path('inquiries/<int:pk>/status/', InquiryStatusUpdateView.as_view(), name='inquiry-status-update'),
]
