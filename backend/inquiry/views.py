from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser,JSONParser
from .models import Inquiry
from .serializers import (
    InquirySerializer, 
    InquiryCreateSerializer, 
    InquiryUpdateSerializer,
    InquiryListSerializer
)
from notification.models import Notification
from django.contrib.auth.models import User
from client.models import FamilyHead
from agent.models import SubAgent
from django.http import Http404

# Add this import at the top of inquiry/views.py
from rest_framework.exceptions import ValidationError
from rest_framework import status
from rest_framework.response import Response


class AgentInquiryDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = InquirySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        # Get ALL agents linked to this user (for multiple agents support)
        user_agents = SubAgent.objects.filter(user=user)
        # Only return inquiries assigned to user's agents
        return Inquiry.objects.all().select_related('customer', 'policy', 'assigned_subagent')
    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return InquiryUpdateSerializer
        return InquirySerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    # Fixed error handling
    def retrieve(self, request, *args, **kwargs):
        try:
            return super().retrieve(request, *args, **kwargs)
        except Http404:
            print(f"Inquiry {kwargs.get('pk')} not accessible to user {request.user}")
            return Response(
                {"error": "Inquiry not found or you don't have permission to access it"}, 
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            print(f"Unexpected error in AgentInquiryDetailView: {str(e)}")
            import traceback
            traceback.print_exc()
            return Response(
                {"error": "An unexpected error occurred"}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


    def update(self, request, *args, **kwargs):
        try:
            return super().update(request, *args, **kwargs)
        except Inquiry.DoesNotExist:
            return Response(
                {"error": "Inquiry not found or you don't have permission to access it"}, 
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            print(f"Error updating inquiry: {str(e)}")
            return Response(
                {"error": "Failed to update inquiry"}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class AgentAssignedInquiriesView(generics.ListAPIView):
    serializer_class = InquiryListSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        print(f"Current logged-in user: {user.username}")
        
        # Check if filtering by specific agent ID from query params
        agent_id = self.request.query_params.get('agent')
        
        if agent_id is not None:
            return Inquiry.objects.filter(assigned_subagent__id=agent_id).order_by('-created_at')
        
        # Get ALL agents linked to this user
        user_agents = SubAgent.objects.filter(user=user)
        print(f"Found agents for user {user.username}: {[f'{a.first_name} {a.last_name}' for a in user_agents]}")
        
        # Get inquiries assigned to ANY of these agents
        inquiries = Inquiry.objects.filter(assigned_subagent__in=user_agents).order_by('-created_at')
        print(f"Found {inquiries.count()} total assigned inquiries for all user's agents")
        
        return inquiries



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
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context
    
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
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]  # Support file uploads

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return InquiryCreateSerializer
        return InquiryListSerializer

    def get_queryset(self):
        user = self.request.user
        try:
            if hasattr(user, 'profile') and user.profile.role == 'admin':
                return Inquiry.objects.all().order_by('-created_at')
            elif hasattr(user, 'family_head'):
                return Inquiry.objects.filter(customer=user.family_head).order_by('-created_at')
            else:
                family_head = FamilyHead.objects.filter(user=user).first()
                if family_head:
                    return Inquiry.objects.filter(customer=family_head).order_by('-created_at')
                return Inquiry.objects.none()
        except Exception as e:
            print(f"Error in get_queryset: {e}")
            return Inquiry.objects.none()

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def perform_create(self, serializer):
        user = self.request.user
        
        # Get customer (FamilyHead)
        customer = getattr(user, 'family_head', None)
        if not customer:
            customer = FamilyHead.objects.filter(user=user).first()
        
        if not customer:
            raise ValidationError("Customer profile not found")
        
        inquiry = serializer.save(customer=customer)

        # Notify all admins
        try:
            admins = User.objects.filter(profile__role='admin')
            for admin in admins:
                Notification.objects.create(
                    user=admin,
                    message=f"New inquiry from {inquiry.customer} on policy {inquiry.policy.policy_number}.",
                    url=f"/dashboard/inquiries"  # Route to admin inquiries page
                )
        except Exception as e:
            print(f"Error sending admin notifications: {e}")


class InquiryDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = InquirySerializer
    queryset = Inquiry.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [JSONParser,MultiPartParser, FormParser]

    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return InquiryUpdateSerializer
        return InquirySerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

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
            print(f"Error sending customer notification: {e}")


# NEW: Admin view to list all inquiries
class AdminInquiryListView(generics.ListAPIView):
    serializer_class = InquirySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        
        # Check if user is admin or staff
        if not (hasattr(user, 'profile') and user.profile.role in ['admin', 'agent'] or user.is_staff):
            return Inquiry.objects.none()
        
        # Filter by status if provided
        status_filter = self.request.query_params.get('status')
        queryset = Inquiry.objects.all().order_by('-created_at')
        
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        
        return queryset

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        except Exception as e:
            print(f"Error in AdminInquiryListView: {e}")
            return Response(
                {"error": "Failed to fetch inquiries", "details": str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


# NEW: View to update inquiry status
class InquiryStatusUpdateView(generics.UpdateAPIView):
    queryset = Inquiry.objects.all()
    serializer_class = InquiryUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        
        # Only admin and agents can update status
        if hasattr(user, 'profile') and user.profile.role in ['admin', 'agent'] or user.is_staff:
            return Inquiry.objects.all()
        
        return Inquiry.objects.none()

    def perform_update(self, serializer):
        inquiry = serializer.save()
        
        # Notify customer about status update
        try:
            if inquiry.customer and inquiry.customer.user:
                user = inquiry.customer.user
                
                # Create detailed notification message
                status_messages = {
                    'pending': 'is under review',
                    'accepted': 'has been accepted',
                    'rejected': 'has been rejected',
                    'assigned': 'has been assigned to an agent',
                    'in_progress': 'is being processed',
                    'resolved': 'has been resolved',
                    'closed': 'has been closed',
                }
                
                status_msg = status_messages.get(inquiry.status, f'status changed to {inquiry.status}')
                
                Notification.objects.create(
                    user=user,
                    message=f"Your inquiry #{inquiry.id} {status_msg}.",
                    url=f"/customer/inquiries/{inquiry.id}/"
                )
        except Exception as e:
            print(f"Error sending status update notification: {e}")

    def update(self, request, *args, **kwargs):
        try:
            return super().update(request, *args, **kwargs)
        except Exception as e:
            print(f"Error updating inquiry status: {e}")
            return Response(
                {"error": "Failed to update inquiry", "details": str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
