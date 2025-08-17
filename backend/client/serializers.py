# client/serializers.py

from rest_framework import serializers
from .models import FamilyHead, FamilyMember, Firm

# --- Serializers for CUD (Create, Update, Delete) operations ---

class FamilyHeadSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = FamilyHead
        fields = '__all__'

    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"  # Full name, not just first_name


class FamilyMemberSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = FamilyMember
        fields = '__all__'

    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"



class FirmSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = Firm
        fields = '__all__'

    def get_full_name(self, obj):
        return obj.firm_name


# --- Serializer for the combined client list ---

class ClientListSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    client_type = serializers.CharField()
    group_with = serializers.CharField()
    full_name = serializers.CharField()
    relation = serializers.CharField()
    gender = serializers.CharField()
    mobile_no = serializers.CharField()
    whatsapp_no = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    email = serializers.EmailField()
    client_status = serializers.CharField()


# --- NEW SERIALIZER FOR THE TRASH LIST ---

class TrashListSerializer(serializers.Serializer):
    """
    Read-only serializer for displaying items in the trash management page.
    """
    id = serializers.IntegerField()
    type = serializers.CharField()
    full_name = serializers.CharField()
    group_with = serializers.CharField()
    mobile = serializers.CharField(source='mobile_no')
    email = serializers.EmailField()
    deleted_date = serializers.DateTimeField(source='deleted_at')
    deleted_by = serializers.CharField(default="Admin", read_only=True)
