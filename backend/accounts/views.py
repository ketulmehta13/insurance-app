# accounts/views.py
from client.serializers import FamilyHeadSerializer, ProfileUpdateSerializer

from django.shortcuts import render
from .serializers import UserSerializer
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Profile 
from rest_framework import status
from django.shortcuts import get_object_or_404
from client.serializers import FamilyHeadSerializer
# Import models and serializers from other apps
from client.models import FamilyHead
# Import models and serializers from other apps
from client.models import FamilyHead 
from policy.models import Policy
from policy.serializers import PolicySerializer
from django.contrib.contenttypes.models import ContentType

# Add these imports for the download functionality
from django.http import HttpResponse
from rest_framework.decorators import api_view, permission_classes
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
import io
from datetime import datetime


class UnifiedLoginAPIView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        role_from_request = request.data.get("role")

        if not username or not password or not role_from_request:
            return Response(
                {"detail": "Username, password, and role are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = authenticate(username=username, password=password)

        if user is None:
            return Response({"detail": "Invalid credentials."},
                            status=status.HTTP_401_UNAUTHORIZED)

        actual_role = getattr(user.profile, 'role', None)

        if actual_role != role_from_request:
            return Response(
                {"detail": f"Role mismatch. Your account is '{actual_role}'."},
                status=status.HTTP_403_FORBIDDEN
            )

        refresh = RefreshToken.for_user(user)

        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "username": user.username,
            "role": actual_role
        })


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        user = serializer.save()
        role = self.request.data.get("role")
        Profile.objects.create(user=user, role=role)
        if role == "customer":
            FamilyHead.objects.create(user=user, first_name=user.username)  # Or pass actual first name


class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        response = {
            'status': 'Request was permitted'
        }
        return Response(response)


# --- NEW VIEW FOR CLIENTS TO FETCH THEIR POLICIES ---
class MyPoliciesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        if request.user.profile.role != 'customer':
            return Response({"error": "Access denied. Only for customers."}, status=status.HTTP_403_FORBIDDEN)

        try:
            client = FamilyHead.objects.get(user=request.user)
            client_policies = Policy.objects.filter(holder=client)
            serializer = PolicySerializer(client_policies, many=True)
            return Response(serializer.data)
        except FamilyHead.DoesNotExist:
            return Response({"error": "Client profile not found for this user."}, status=404)


# This is a new view to fetch the customer's profile details.
class MyProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        profile = request.user.profile

        if profile.role == 'customer':
            try:
                client_profile = FamilyHead.objects.get(user=request.user)
                serializer = FamilyHeadSerializer(client_profile)
                return Response(serializer.data)
            except FamilyHead.DoesNotExist:
                return Response({"error": "Client profile not found for this user."}, status=404)

        # For agent/admin just return basic profile
        return Response({
            "username": request.user.username,
            "email": request.user.email,
            "role": profile.role
        })

# Update your update_profile view
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    try:
        # Check if user is a customer
        if request.user.profile.role != 'customer':
            return Response({"error": "Access denied. Only for customers."}, status=status.HTTP_403_FORBIDDEN)
        
        # Get the customer's FamilyHead profile
        try:
            client = FamilyHead.objects.get(user=request.user)
        except FamilyHead.DoesNotExist:
            return Response({"error": "Client profile not found for this user."}, status=status.HTTP_404_NOT_FOUND)
        
        # Use the ProfileUpdateSerializer for validation and updating
        serializer = ProfileUpdateSerializer(client, data=request.data, partial=True)
        
        if serializer.is_valid():
            updated_client = serializer.save()
            
            # Return the updated profile using the main FamilyHeadSerializer
            response_serializer = FamilyHeadSerializer(updated_client)
            return Response(response_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    except Exception as e:
        print(f"Error updating profile: {str(e)}")  # For debugging
        return Response({"error": f"Failed to update profile: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# --- NEW DOWNLOAD POLICY VIEW ---
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def download_policy(request, policy_id):
    try:
        # Check if user is a customer
        if request.user.profile.role != 'customer':
            return Response({"error": "Access denied. Only for customers."}, status=status.HTTP_403_FORBIDDEN)
        
        # Get the customer's FamilyHead profile
        try:
            client = FamilyHead.objects.get(user=request.user)
        except FamilyHead.DoesNotExist:
            return Response({"error": "Client profile not found for this user."}, status=404)
        
        # Get the policy for the authenticated user
        policy = get_object_or_404(Policy, id=policy_id, holder=client)
        
        # Create a file-like buffer to receive PDF data
        buffer = io.BytesIO()
        
        # Create the PDF object, using the buffer as its "file."
        doc = SimpleDocTemplate(buffer, pagesize=letter)
        story = []
        
        # Get styles
        styles = getSampleStyleSheet()
        title_style = styles['Title']
        heading_style = styles['Heading2']
        normal_style = styles['Normal']
        
        # Add title
        story.append(Paragraph("INSURANCE POLICY DOCUMENT", title_style))
        story.append(Spacer(1, 12))
        
        # Policy details table data
        data = [
            ['Policy Information', ''],
            ['Policy Number:', getattr(policy, 'policy_number', 'N/A') or 'N/A'],
            ['Insurance Company:', getattr(policy, 'insurance_company', 'N/A') or 'N/A'],
            ['Policy Type:', getattr(policy, 'policy_type', 'N/A') or 'N/A'],
            ['Status:', getattr(policy, 'status', 'N/A') or 'N/A'],
            ['Start Date:', str(policy.start_date) if getattr(policy, 'start_date', None) else 'N/A'],
            ['End Date:', str(policy.end_date) if getattr(policy, 'end_date', None) else 'N/A'],
            ['Premium Amount:', f"${policy.premium_amount}" if getattr(policy, 'premium_amount', None) else 'N/A'],
            ['Sum Assured:', f"${policy.sum_assured}" if getattr(policy, 'sum_assured', None) else 'N/A'],
            ['', ''],
            ['Customer Information', ''],
            ['Customer Name:', f"{client.first_name} {getattr(client, 'last_name', '')}".strip() or request.user.username],
            ['Email:', request.user.email or 'N/A'],
            ['Phone:', getattr(client, 'phone', 'N/A') or 'N/A'],
        ]
        
        # Create table
        table = Table(data, colWidths=[2*72, 4*72])  # 2 inch, 4 inch columns
        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (1, 0), colors.grey),
            ('TEXTCOLOR', (0, 0), (1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, 0), 14),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
            ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
            ('GRID', (0, 0), (-1, -1), 1, colors.black),
            ('FONTNAME', (0, 10), (1, 10), 'Helvetica-Bold'),
            ('BACKGROUND', (0, 10), (1, 10), colors.grey),
            ('TEXTCOLOR', (0, 10), (1, 10), colors.whitesmoke),
        ]))
        
        story.append(table)
        story.append(Spacer(1, 12))
        
        # Add footer
        story.append(Paragraph(f"Generated on: {datetime.now().strftime('%B %d, %Y')}", normal_style))
        story.append(Paragraph("This is a system-generated document.", normal_style))
        
        # Build PDF
        doc.build(story)
        
        # Get the value of the BytesIO buffer and write it to the response
        pdf = buffer.getvalue()
        buffer.close()
        
        response = HttpResponse(content_type='application/pdf')
        policy_number = getattr(policy, 'policy_number', None) or policy.id
        response['Content-Disposition'] = f'attachment; filename="policy_{policy_number}.pdf"'
        response.write(pdf)
        
        return response
        
    except Policy.DoesNotExist:
        return Response({"error": "Policy not found"}, status=404)
    except Exception as e:
        return Response({"error": f"Failed to generate policy document: {str(e)}"}, status=500)

