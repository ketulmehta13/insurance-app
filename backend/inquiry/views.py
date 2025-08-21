from rest_framework import generics, permissions
from .models import Inquiry
from .serializers import InquirySerializer
from notification.models import Notification
from django.contrib.auth.models import User
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework import status
from .models import Inquiry
from .serializers import InquirySerializer
from notification.models import Notification
from django.contrib.auth.models import User
from client.models import FamilyHead

from agent.models import SubAgent  
class AgentInquiryDetailView(generics.RetrieveUpdateAPIView):
    queryset = Inquiry.objects.all()
    serializer_class = InquirySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        try:
            agent = SubAgent.objects.get(user=self.request.user)
            return Inquiry.objects.filter(assigned_subagent=agent)
        except SubAgent.DoesNotExist:
            return Inquiry.objects.none()


class AgentAssignedInquiriesView(generics.ListAPIView):
    serializer_class = InquirySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        
        # Check if filtering by specific agent
        agent_id = self.request.query_params.get('agent')
        
        if agent_id is not None:
            # Filter by the selected agent ID from query params
            return Inquiry.objects.filter(assigned_subagent__id=agent_id).order_by('-created_at')
        
        # Default behavior - return inquiries for current logged-in agent
        try:
            agent = SubAgent.objects.get(user=user)
            return Inquiry.objects.filter(assigned_subagent=agent).order_by('-created_at')
        except SubAgent.DoesNotExist:
            return Inquiry.objects.none()

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        except Exception as e:
            print(f"Error in AgentAssignedInquiriesView: {e}")
            return Response(
                {"error": "Failed to fetch inquiries", "details": str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class MyInquiryListView(generics.ListAPIView):
    serializer_class = InquirySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        print(f"User: {user.username}")  # Debug log
        
        try:
            # Check if user has a family_head relationship
            if hasattr(user, 'family_head'):
                family_head = user.family_head
                print(f"Found family_head: {family_head}")  # Debug log
            else:
                # Alternative: Find family head by user
                family_head = FamilyHead.objects.filter(user=user).first()
                print(f"Found family_head via filter: {family_head}")  # Debug log
            
            if family_head:
                inquiries = Inquiry.objects.filter(customer=family_head).order_by('-created_at')
                print(f"Found {inquiries.count()} inquiries")  # Debug log
                return inquiries
            else:
                print("No family_head found")  # Debug log
                return Inquiry.objects.none()
                
        except Exception as e:
            print(f"Error in MyInquiryListView: {e}")  # Debug log
            return Inquiry.objects.none()
    
    def list(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        except Exception as e:
            print(f"Error in list method: {e}")
            return Response(
                {"error": "Failed to fetch inquiries", "details": str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class InquiryListCreateView(generics.ListCreateAPIView):
    serializer_class = InquirySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        try:
            if hasattr(user, 'profile') and user.profile.role == 'admin':
                return Inquiry.objects.all()
            elif hasattr(user, 'family_head'):
                return Inquiry.objects.filter(customer=user.family_head)
            else:
                return Inquiry.objects.none()
        except Exception as e:
            print(f"Error in get_queryset: {e}")
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
        try:
            if inquiry.customer and inquiry.customer.user:
                user = inquiry.customer.user
                Notification.objects.create(
                    user=user,
                    message=f"Your inquiry #{inquiry.id} status changed to {inquiry.status}.",
                    url=f"/customer/inquiries/{inquiry.id}/"
                )
        except Exception as e:
            print(f"Error sending notification: {e}")
            
            pass

