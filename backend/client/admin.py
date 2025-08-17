# client/admin.py

from django.contrib import admin
from .models import FamilyHead, FamilyMember, Firm
from django.contrib.contenttypes.models import ContentType

admin.site.register(ContentType)

@admin.register(FamilyHead)
class FamilyHeadAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'is_deleted', 'deleted_at')
    list_filter = ('is_deleted', 'city')
    search_fields = ('first_name', 'last_name', 'email')
    # Use the raw_objects manager to show all items in the admin
    def get_queryset(self, request):
        return FamilyHead.raw_objects.all()

@admin.register(FamilyMember)
class FamilyMemberAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'relation', 'family_head', 'is_deleted')
    list_filter = ('is_deleted',)
    search_fields = ('first_name', 'last_name')
    def get_queryset(self, request):
        return FamilyMember.raw_objects.all()

@admin.register(Firm)
class FirmAdmin(admin.ModelAdmin):
    list_display = ('firm_name', 'contact_person_name', 'email', 'is_deleted')
    list_filter = ('is_deleted', 'firm_type')
    search_fields = ('firm_name', 'contact_person_name')
    def get_queryset(self, request):
        return Firm.raw_objects.all()
