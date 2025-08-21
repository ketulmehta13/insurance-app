from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType


class SoftDeleteManager(models.Manager):
    def get_queryset(self):
        # Default queryset excludes deleted items
        return super().get_queryset().filter(is_deleted=False)

    def trash(self):
        # Method to get only the deleted items
        return super().get_queryset().filter(is_deleted=True)

    def all_including_trash(self):
        # Method to get all items, including deleted ones
        return super().get_queryset()


class FamilyHead(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='family_head', null=True, blank=True)
    first_name = models.CharField(max_length=100)
    middle_name = models.CharField(max_length=100, blank=True, null=True)
    last_name = models.CharField(max_length=100)
    address1 = models.TextField()
    city = models.CharField(max_length=100)
    area = models.CharField(max_length=100)
    mobile_no = models.CharField(max_length=15)
    email = models.EmailField(unique=True, null=True, blank=True)
    gender = models.CharField(max_length=10)
    dob = models.DateField(null=True, blank=True)
    marriage_status = models.CharField(max_length=20)
    aadhar_no = models.CharField(max_length=20)
    group_type = models.CharField(max_length=20)
    business_type = models.CharField(max_length=50)
    client_status = models.CharField(max_length=20)
    joined_by = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # --- Soft Delete ---
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(blank=True, null=True)

    # --- Managers ---
    objects = SoftDeleteManager()   # Default manager excludes deleted
    raw_objects = models.Manager()  # Access all objects including deleted

    def soft_delete(self):
        self.is_deleted = True
        self.deleted_at = timezone.now()
        self.save()

    def restore(self):
        self.is_deleted = False
        self.deleted_at = None
        self.save()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class FamilyMember(models.Model):
    family_head = models.ForeignKey(FamilyHead, on_delete=models.CASCADE, related_name='members')
    first_name = models.CharField(max_length=100)
    middle_name = models.CharField(max_length=100, blank=True, null=True)
    last_name = models.CharField(max_length=100)
    relation = models.CharField(max_length=50)
    gender = models.CharField(max_length=10)
    dob = models.DateField(null=True, blank=True)
    mobile_no = models.CharField(max_length=15)
    whatsapp_no = models.CharField(max_length=15, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    aadhar_no = models.CharField(max_length=20, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # --- Soft Delete ---
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(blank=True, null=True)

    # --- Managers ---
    objects = SoftDeleteManager()
    raw_objects = models.Manager()

    def soft_delete(self):
        self.is_deleted = True
        self.deleted_at = timezone.now()
        self.save()

    def restore(self):
        self.is_deleted = False
        self.deleted_at = None
        self.save()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Firm(models.Model):
    family_head = models.ForeignKey(FamilyHead, null=True, blank=True, on_delete=models.SET_NULL)

    firm_name = models.CharField(max_length=255)
    firm_type = models.CharField(max_length=100)
    contact_person_name = models.CharField(max_length=255)
    designation = models.CharField(max_length=100)
    mobile_no = models.CharField(max_length=15)
   
    email = models.EmailField()
    address1 = models.TextField()
    city = models.CharField(max_length=100)
    area = models.CharField(max_length=100)
    business_type = models.CharField(max_length=100)
   
   
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # --- Soft Delete ---
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(blank=True, null=True)

    # --- Managers ---
    objects = SoftDeleteManager()
    raw_objects = models.Manager()

    def soft_delete(self):
        self.is_deleted = True
        self.deleted_at = timezone.now()
        self.save()

    def restore(self):
        self.is_deleted = False
        self.deleted_at = None
        self.save()

    def __str__(self):
        return self.firm_name
