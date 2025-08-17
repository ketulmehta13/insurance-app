# dashboard/urls.py

from django.urls import path
from .views import DashboardStatsView

urlpatterns = [
    # The single endpoint for all dashboard data
    path('stats/', DashboardStatsView.as_view(), name='dashboard-stats'),
]
