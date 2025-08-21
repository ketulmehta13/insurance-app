# accounts/views.py

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
#  Import models and serializers from other apps
from client.models import FamilyHead
# Import models and serializers from other apps
from client.models import FamilyHead 
from policy.models import Policy
from policy.serializers import PolicySerializer
from django.contrib.contenttypes.models import ContentType


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



