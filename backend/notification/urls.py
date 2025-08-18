from django.urls import path
from .views import NotificationListView, NotificationMarkReadView

urlpatterns = [
    path('', NotificationListView.as_view(), name='notifications-list'),
    path('mark-read/<int:pk>/', NotificationMarkReadView.as_view(), name='notifications-mark-read'),
]
