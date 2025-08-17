# agent/views.py

from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser
from .models import SubAgent
from .serializers import SubAgentSerializer

class SubAgentListCreateView(generics.ListCreateAPIView):
    """
    API view to list all sub-agents or create a new one.
    Supports filtering by 'status' and 'specialization'.
    """
    serializer_class = SubAgentSerializer
    parser_classes = (MultiPartParser, FormParser)

    def get_queryset(self):
        """
        Optionally filters the sub-agents based on query parameters.
        """
        queryset = SubAgent.objects.all()
        status = self.request.query_params.get('status')
        specialization = self.request.query_params.get('specialization')

        if status:
            queryset = queryset.filter(status=status)
        if specialization:
            queryset = queryset.filter(specialization=specialization)
            
        return queryset

# --- NEW VIEW FOR SINGLE AGENT ACTIONS ---
class SubAgentDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    API view to retrieve (GET), update (PATCH), or delete (DELETE) 
    a single sub-agent instance.
    """
    queryset = SubAgent.objects.all()
    serializer_class = SubAgentSerializer
    parser_classes = (MultiPartParser, FormParser)
