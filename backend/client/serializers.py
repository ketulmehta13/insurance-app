# client/serializers.py

from rest_framework import serializers
from client.models import FamilyHead
from client.models import FamilyMember
from client.models import Firm


# --- Serializers for CUD (Create, Update, Delete) operations ---

class FamilyHeadSerializer(serializers.ModelSerializer):
    
    # Add these as SerializerMethodFields
    age = serializers.SerializerMethodField()
    phone = serializers.SerializerMethodField()
    date_of_birth = serializers.SerializerMethodField()
    address = serializers.SerializerMethodField()
    
    full_name = serializers.SerializerMethodField()
    
    # Add fields for frontend compatibility
    phone = serializers.CharField(source='mobile_no', required=False, allow_blank=True)
    age = serializers.IntegerField(read_only=True)
    date_of_birth = serializers.DateField(source='dob', required=False, allow_null=True)
    address = serializers.CharField(source='address1', required=False, allow_blank=True)

    class Meta:
        model = FamilyHead
        fields = '__all__'
        extra_kwargs = {
            'mobile_no': {'write_only': True},  # Keep original field for backend
            'dob': {'write_only': True},        # Keep original field for backend
            'address1': {'write_only': True},   # Keep original field for backend
        }

    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}".strip()
    
    def to_representation(self, instance):
        """
        Customize the output representation to include both original and frontend fields
        """
        data = super().to_representation(instance)
        
        # Ensure phone field is populated from mobile_no
        if instance.mobile_no and not data.get('phone'):
            data['phone'] = instance.mobile_no
        
        # Ensure date_of_birth is populated from dob
        if instance.dob and not data.get('date_of_birth'):
            data['date_of_birth'] = instance.dob
        
        # Ensure address is populated from address1
        if instance.address1 and not data.get('address'):
            data['address'] = instance.address1
        
        # Calculate age if not present
        if instance.dob and not data.get('age'):
            from datetime import date
            today = date.today()
            data['age'] = today.year - instance.dob.year - ((today.month, today.day) < (instance.dob.month, instance.dob.day))
        
        return data
    
    def update(self, instance, validated_data):
        """
        Custom update method to handle field mapping
        """
        # Handle phone -> mobile_no mapping
        if 'mobile_no' in validated_data:
            instance.phone = validated_data['mobile_no']
            instance.mobile_no = validated_data['mobile_no']
        
        # Handle date_of_birth -> dob mapping
        if 'dob' in validated_data:
            instance.date_of_birth = validated_data['dob']
            instance.dob = validated_data['dob']
        
        # Handle address -> address1 mapping
        if 'address1' in validated_data:
            instance.address = validated_data['address1']
            instance.address1 = validated_data['address1']
        
        # Update other fields normally
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        instance.save()
        return instance

class FamilyMemberSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = FamilyMember
        fields = '__all__'

    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}".strip()

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

# --- PROFILE UPDATE SERIALIZER ---

class ProfileUpdateSerializer(serializers.ModelSerializer):
    """
    Simplified serializer specifically for profile updates from the frontend
    """
    phone = serializers.CharField(required=False, allow_blank=True)
    age = serializers.IntegerField(required=False, allow_null=True)
    date_of_birth = serializers.DateField(required=False, allow_null=True)
    address = serializers.CharField(required=False, allow_blank=True)
    
    class Meta:
        model = FamilyHead
        fields = ['first_name', 'email', 'phone', 'gender', 'age', 'date_of_birth', 'address']
    
    def update(self, instance, validated_data):
        """
        Update instance with validated data, mapping frontend fields to backend fields
        """
        # Direct field updates
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.email = validated_data.get('email', instance.email)
        instance.gender = validated_data.get('gender', instance.gender)
        
        # Map phone to mobile_no
        if 'phone' in validated_data:
            instance.phone = validated_data['phone']
            instance.mobile_no = validated_data['phone']
        
        # Map date_of_birth to dob
        if 'date_of_birth' in validated_data:
            instance.date_of_birth = validated_data['date_of_birth']
            instance.dob = validated_data['date_of_birth']
        
        # Map address to address1
        if 'address' in validated_data:
            instance.address = validated_data['address']
            instance.address1 = validated_data['address']
        
        instance.save()
        return instance
