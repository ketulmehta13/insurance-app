# insurance/views.py

from rest_framework import generics
from .models import InsuranceProduct, Claim
from .serializers import InsuranceProductSerializer, ClaimSerializer

class InsuranceProductListView(generics.ListCreateAPIView):
    """
    API view to list all insurance products or create a new one.
    """
    queryset = InsuranceProduct.objects.all()
    serializer_class = InsuranceProductSerializer

class ClaimListView(generics.ListCreateAPIView):
    """
    API view to list all claims or create a new one.
    """
    queryset = Claim.objects.all()
    serializer_class = ClaimSerializer
