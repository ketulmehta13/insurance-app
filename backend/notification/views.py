from rest_framework import generics, permissions
from .models import Notification
from .serializers import NotificationSerializer
from rest_framework.response import Response
from rest_framework.views import APIView

class NotificationListView(generics.ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user).order_by('-created_at')

class NotificationMarkReadView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk, *args, **kwargs):
        notification = Notification.objects.filter(id=pk, user=request.user).first()
        if not notification:
            return Response({"detail": "Notification not found."}, status=404)
        notification.is_read = True
        notification.save()
        return Response({"detail": "Notification marked as read."})
