# policy/models.py

from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.utils import timezone
from client.models import FamilyHead

# --- Custom Manager for Soft Deletion ---
class PolicyManager(models.Manager):
    def get_queryset(self):
        # By default, only show non-deleted policies
        return super().get_queryset().filter(is_deleted=False)

    def trash(self):
        # A method to easily access only the deleted policies
        return super().get_queryset().filter(is_deleted=True)

class Policy(models.Model):
    # ... existing Policy model fields ...
    POLICY_TYPES = [('Health', 'Health Insurance'), ('Life', 'Life Insurance'), ('Vehicle', 'Vehicle Insurance'), ('Travel', 'Travel Insurance'), ('Property', 'Property Insurance'), ('Business', 'Business Insurance'), ('Other', 'Other')]
    POLICY_STATUS_CHOICES = [('Active', 'Active'), ('Expired', 'Expired'), ('Cancelled', 'Cancelled'), ('Pending', 'Pending'), ('Due for Renewal', 'Due for Renewal')]
    policy_number = models.CharField(max_length=100, unique=True)
    insurance_company = models.CharField(max_length=255)
    policy_type = models.CharField(max_length=50, choices=POLICY_TYPES)
    
    holder = models.ForeignKey(
    'client.FamilyHead', on_delete=models.CASCADE, related_name='policies')

    start_date = models.DateField()
    end_date = models.DateField()
    premium_amount = models.DecimalField(max_digits=10, decimal_places=2)
    sum_assured = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=20, choices=POLICY_STATUS_CHOICES, default='Pending')
    policy_document = models.FileField(upload_to='policies/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # --- NEW FIELDS FOR SOFT DELETE ---
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(blank=True, null=True)

    # --- MANAGERS ---
    objects = PolicyManager()   # The default manager only shows active policies.
    all_objects = models.Manager() # A manager to access ALL policies, including deleted ones.

    def soft_delete(self):
        """Marks the policy as deleted."""
        self.is_deleted = True
        self.deleted_at = timezone.now()
        self.status = 'Deleted'
        self.save()

    def restore(self):
        """Restores a soft-deleted policy."""
        self.is_deleted = False
        self.deleted_at = None
        self.status = 'Active' # Or another default status
        self.save()

    def __str__(self):
        return f"Policy {self.policy_number} for {self.policy_holder}"

    class Meta:
        ordering = ['-end_date']
        verbose_name = "Policy"
        verbose_name_plural = "Policies"

# (Your PolicyRenewal model remains unchanged)
class PolicyRenewal(models.Model):
    policy = models.ForeignKey(Policy, on_delete=models.CASCADE, related_name='renewals')
    renewal_date = models.DateField()
    new_sum_assured = models.DecimalField(max_digits=12, decimal_places=2)
    new_premium_amount = models.DecimalField(max_digits=10, decimal_places=2)
    new_end_date = models.DateField()
    remarks = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        ordering = ['-renewal_date']
