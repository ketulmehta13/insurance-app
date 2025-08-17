# agent/urls.py

from django.urls import path
from .views import SubAgentListCreateView, SubAgentDetailView

urlpatterns = [
    # URL for listing and creating sub-agents
    path('sub-agents/', SubAgentListCreateView.as_view(), name='subagent-list-create'),
    
    # NEW URL for viewing, updating, and deleting a single sub-agent
    path('sub-agents/<int:pk>/', SubAgentDetailView.as_view(), name='subagent-detail'),
]
