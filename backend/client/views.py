# client/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser # Import JSONParser
from .models import FamilyHead, FamilyMember, Firm
from .serializers import (
    FamilyHeadSerializer, FamilyMemberSerializer, FirmSerializer, 
    TrashListSerializer, ClientListSerializer
)
import logging
from django.utils import timezone

logger = logging.getLogger(__name__)

# --- VIEW FOR TRASH MANAGEMENT ---
class TrashManagementView(APIView):
    def get(self, request, *args, **kwargs):
        """Returns a list of all soft-deleted items."""
        trashed_items = []
        
        for head in FamilyHead.raw_objects.filter(is_deleted=True):
            trashed_items.append({'id': head.id, 'type': 'Family Head', 'full_name': f"{head.first_name} {head.last_name}", 'group_with': f"{head.first_name}'s Group", 'mobile_no': head.mobile_no, 'email': head.email, 'deleted_at': head.deleted_at})
        
        for member in FamilyMember.raw_objects.filter(is_deleted=True):
            trashed_items.append({'id': member.id, 'type': 'Family Member', 'full_name': f"{member.first_name} {member.last_name}", 'group_with': f"{member.family_head.first_name}'s Group", 'mobile_no': member.mobile_no, 'email': member.email, 'deleted_at': member.deleted_at})

        for firm in Firm.raw_objects.filter(is_deleted=True):
            trashed_items.append({'id': firm.id, 'type': 'Firm', 'full_name': firm.firm_name, 'group_with': firm.firm_name, 'mobile_no': firm.mobile_no, 'email': firm.email, 'deleted_at': firm.deleted_at})

        serializer = TrashListSerializer(trashed_items, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        """Restores a soft-deleted item."""
        client_id = request.data.get('id')
        client_type = request.data.get('type')
        
        try:
            if client_type == 'Family Head': instance = FamilyHead.raw_objects.get(id=client_id)
            elif client_type == 'Family Member': instance = FamilyMember.raw_objects.get(id=client_id)
            elif client_type == 'Firm': instance = Firm.raw_objects.get(id=client_id)
            else: return Response({"error": "Invalid client type"}, status=status.HTTP_400_BAD_REQUEST)
            
            instance.restore()
            return Response({"message": "Restored successfully"}, status=status.HTTP_200_OK)
        except (FamilyHead.DoesNotExist, FamilyMember.DoesNotExist, Firm.DoesNotExist):
            return Response({"error": "Item not found"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, *args, **kwargs):
        """Permanently deletes an item."""
        client_id = request.data.get('id')
        client_type = request.data.get('type')

        try:
            if client_type == 'Family Head': instance = FamilyHead.raw_objects.get(id=client_id)
            elif client_type == 'Family Member': instance = FamilyMember.raw_objects.get(id=client_id)
            elif client_type == 'Firm': instance = Firm.raw_objects.get(id=client_id)
            else: return Response({"error": "Invalid client type"}, status=status.HTTP_400_BAD_REQUEST)
            
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except (FamilyHead.DoesNotExist, FamilyMember.DoesNotExist, Firm.DoesNotExist):
            return Response({"error": "Item not found"}, status=status.HTTP_404_NOT_FOUND)


# --- VIEW FOR THE COMBINED CLIENT LIST ---
class ClientListView(APIView):
    def get(self, request, *args, **kwargs):
        all_clients = []
        for head in FamilyHead.objects.all():
            all_clients.append({'id': head.id, 'client_type': 'Family Head', 'group_with': f"{head.first_name}'s Group", 'full_name': f"{head.first_name} {head.last_name}", 'relation': 'Head', 'gender': head.gender, 'mobile_no': head.mobile_no,  'email': head.email, 'client_status': head.client_status})
        for member in FamilyMember.objects.select_related('family_head').all():
            all_clients.append({'id': member.id, 'client_type': 'Family Member', 'group_with': f"{member.family_head.first_name}'s Group", 'full_name': f"{member.first_name} {member.last_name}", 'relation': member.relation, 'gender': member.gender, 'mobile_no': member.mobile_no, 'email': member.email, 'client_status': 'Active'})
        for firm in Firm.objects.all():
            all_clients.append({'id': firm.id, 'client_type': 'Firm', 'group_with': firm.firm_name, 'full_name': firm.contact_person_name, 'relation': firm.designation, 'gender': '-', 'mobile_no': firm.mobile_no, 'email': firm.email, 'client_status': 'Active'})
        serializer = ClientListSerializer(all_clients, many=True)
        return Response(serializer.data)

    def delete(self, request, *args, **kwargs):
        client_id = request.data.get('id')
        client_type = request.data.get('client_type')
        try:
            if client_type == 'Family Head': FamilyHead.objects.get(id=client_id).soft_delete()
            elif client_type == 'Family Member': FamilyMember.objects.get(id=client_id).soft_delete()
            elif client_type == 'Firm': Firm.objects.get(id=client_id).soft_delete()
            else: return Response(status=status.HTTP_400_BAD_REQUEST)
            return Response(status=status.HTTP_204_NO_CONTENT)
        except (FamilyHead.DoesNotExist, FamilyMember.DoesNotExist, Firm.DoesNotExist):
            return Response({"error": "Client not found"}, status=status.HTTP_404_NOT_FOUND)

# --- VIEW FOR HANDLING SINGLE CLIENTS (GET/UPDATE) ---
class ClientDetailView(APIView):
    # CORRECTED: Added JSONParser to handle JSON data from the edit form
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def get_object_and_serializer(self, client_type, client_id):
        try:
            if client_type == 'Family Head': return FamilyHead.raw_objects.get(pk=client_id), FamilyHeadSerializer
            elif client_type == 'Family Member': return FamilyMember.raw_objects.get(pk=client_id), FamilyMemberSerializer
            elif client_type == 'Firm': return Firm.raw_objects.get(pk=client_id), FirmSerializer
            return None, None
        except (FamilyHead.DoesNotExist, FamilyMember.DoesNotExist, Firm.DoesNotExist): return None, None
    def get(self, request, client_type, client_id, *args, **kwargs):
        instance, SerializerClass = self.get_object_and_serializer(client_type, client_id)
        if not instance: return Response({"error": "Client not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = SerializerClass(instance)
        return Response(serializer.data)
    def patch(self, request, client_type, client_id, *args, **kwargs):
        instance, SerializerClass = self.get_object_and_serializer(client_type, client_id)
        if not instance: return Response({"error": "Client not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = SerializerClass(instance, data=request.data, partial=True)
        if serializer.is_valid(): serializer.save(); return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# --- Views for Adding Data and Dropdowns ---
class FamilyHeadListView(APIView):
    def get(self, request, *args, **kwargs):
        heads = FamilyHead.objects.all(); serializer = FamilyHeadSerializer(heads, many=True); 
        return Response(serializer.data)

class FamilyHeadAPIView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = FamilyHeadSerializer(data=request.data)
        if serializer.is_valid(): serializer.save(); return Response({"message": "Family head added successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FamilyMemberAPIView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = FamilyMemberSerializer(data=request.data)
        if serializer.is_valid(): serializer.save(); return Response({"message": "Family member added successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FirmAPIView(APIView):
    parser_classes = (JSONParser,MultiPartParser, FormParser)
    def post(self, request, *args, **kwargs):
        serializer = FirmSerializer(data=request.data)
        if serializer.is_valid(): serializer.save(); return Response({"message": "Firm added successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
