from rest_framework import generics, permissions
from .models import Inquiry
from .serializers import InquirySerializer
from notification.models import Notification
from django.contrib.auth.models import User

from .models import SubAgent  
class AgentInquiryDetailView(generics.RetrieveUpdateAPIView):
    queryset = Inquiry.objects.all()
    serializer_class = InquirySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        agent = SubAgent.objects.get(user=self.request.user)
        return Inquiry.objects.filter(assigned_subagent=agent)
class AgentInquiryDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = InquirySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        agent = SubAgent.objects.get(user=self.request.user)
        return Inquiry.objects.filter(assigned_subagent=agent)

class AgentAssignedInquiriesView(generics.ListAPIView):
    serializer_class = InquirySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        try:
            agent = SubAgent.objects.get(user=user)  
        except SubAgent.DoesNotExist:
            return Inquiry.objects.none()
        return Inquiry.objects.filter(assigned_subagent=agent).order_by('-created_at')

class MyInquiryListView(generics.ListAPIView):
    serializer_class = InquirySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Return inquiries for the logged-in customer's FamilyHead
        family_head = self.request.user.family_head  # Adjust based on your user model
        return Inquiry.objects.filter(customer=family_head).order_by('-created_at')

class InquiryListCreateView(generics.ListCreateAPIView):
    serializer_class = InquirySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if hasattr(user, 'profile') and user.profile.role == 'admin':
            return Inquiry.objects.all()
        elif hasattr(user, 'family_head'):
            return Inquiry.objects.filter(customer=user.family_head)
        else:
            return Inquiry.objects.none()

    def perform_create(self, serializer):
        user = self.request.user
        customer = getattr(user, 'family_head', None)
        inquiry = serializer.save(customer=customer)

        # Notify all admins
        admins = User.objects.filter(profile__role='admin')
        for admin in admins:
            Notification.objects.create(
                user=admin,
                message=f"New inquiry from {inquiry.customer} on policy {inquiry.policy.policy_number}.",
                url=f"/dashboard/inquiries"  # Route to admin inquiries page
            )

class InquiryDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = InquirySerializer
    queryset = Inquiry.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def perform_update(self, serializer):
        inquiry = serializer.save()
        # Notify customer about status update
        user = inquiry.customer.user
        Notification.objects.create(
            user=user,
            message=f"Your inquiry #{inquiry.id} status changed to {inquiry.status}.",
            url=f"/customer/inquiries/{inquiry.id}/"
        )
