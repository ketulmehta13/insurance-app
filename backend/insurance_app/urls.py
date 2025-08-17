# insurance/urls.py

from django.urls import path
from .views import InsuranceProductListView, ClaimListView

urlpatterns = [
    # URL for listing and creating insurance products
    path('products/', InsuranceProductListView.as_view(), name='insurance-product-list'),
    
    # URL for listing and creating claims
    path('claims/', ClaimListView.as_view(), name='claim-list'),
]
