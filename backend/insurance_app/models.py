# insurance/models.py

from django.db import models
from policy.models import Policy # Assuming your policy app is named 'policy'

class InsuranceProduct(models.Model):
    """
    Represents a type of insurance product offered.
    """
    STATUS_CHOICES = [
        ('Active', 'Active'),
        ('Inactive', 'Inactive'),
    ]
    
    name = models.CharField(max_length=255)
    policy_type = models.CharField(max_length=100) # e.g., Life, Health, Motor
    premium_range = models.CharField(max_length=100, help_text="e.g., ₹15,000 - ₹50,000")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Active')
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Claim(models.Model):
    """
    Represents an insurance claim made against a policy.
    """
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Under Review', 'Under Review'),
        ('Approved', 'Approved'),
        ('Rejected', 'Rejected'),
    ]

    policy = models.ForeignKey(Policy, on_delete=models.CASCADE, related_name='claims')
    claim_id = models.CharField(max_length=50, unique=True)
    claimant_name = models.CharField(max_length=255)
    claim_amount = models.DecimalField(max_digits=12, decimal_places=2)
    date_of_claim = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Claim {self.claim_id} for {self.policy.policy_number}"

    class Meta:
        ordering = ['-date_of_claim']
