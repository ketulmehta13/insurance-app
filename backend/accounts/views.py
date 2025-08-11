from django.shortcuts import render
from .serializers import UserSerializer
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Profile 
from rest_framework import status


class UnifiedLoginAPIView(APIView):
    """
    A single login API that works for username/password
    and returns the role of the logged-in user.
    """
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response(
                {"error": "Username and password are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = authenticate(username=username, password=password)

        if user is None:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)
        role = getattr(user.profile, 'role', 'unknown')  # If using a Profile model with role

        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "username": user.username,
            "role": role
        })


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
    def perform_create(self, serializer):
        user = serializer.save()
        role = self.request.data.get("role")
        Profile.objects.create(
            user=user,
            role=role
        )


class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        response = {
            'status': 'Request was permitted'
        }
        return Response(response)