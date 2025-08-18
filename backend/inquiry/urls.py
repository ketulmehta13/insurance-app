from django.urls import path
from .views import InquiryListCreateView, InquiryDetailView,MyInquiryListView,AgentAssignedInquiriesView,AgentInquiryDetailView

urlpatterns = [
    path('inquiries/', InquiryListCreateView.as_view(), name='inquiry-list-create'),
    path('inquiries/<int:pk>/', InquiryDetailView.as_view(), name='inquiry-detail'),
    path('my-inquiries/', MyInquiryListView.as_view(), name='my-inquiries'),
     path('agent-inquiries/', AgentAssignedInquiriesView.as_view(), name='agent-inquiries'),
     path('agent-inquiries/<int:pk>/', AgentInquiryDetailView.as_view(), name='agent-inquiry-detail'),
]
