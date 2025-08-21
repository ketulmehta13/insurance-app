from django.urls import path
from .views import NotificationListView, NotificationMarkReadView,NotificationDeleteView

urlpatterns = [
    path('notifications/', NotificationListView.as_view(), name='notifications-list'),
    path('notifications/<int:pk>/', NotificationDeleteView.as_view(), name='notification-delete'),
    path('notifications/mark-read/<int:pk>/', NotificationMarkReadView.as_view(), name='notifications-mark-read'),
]
