from django.urls import path
from .views import UnifiedLoginAPIView
from . import views as UserViews

urlpatterns = [
    path('unified-login/', UnifiedLoginAPIView.as_view(), name='unified-login'),
    
    # --- NEW URL FOR CLIENTS TO FETCH THEIR POLICIES ---
    path('my-policies/', UserViews.MyPoliciesView.as_view(), name='my-policies'),
    path('my-profile/', UserViews.MyProfileView.as_view(), name='my-profile'),
    
    

]
