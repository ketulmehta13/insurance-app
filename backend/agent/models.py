# agent/models.py

from django.db import models

class SubAgent(models.Model):
    """
    Represents a Sub Agent's comprehensive information in the database.
    """
    STATUS_CHOICES = [
        ('Active', 'Active'),
        ('Inactive', 'Inactive'),
        ('Suspended', 'Suspended'),
    ]

    # Personal Information
    first_name = models.CharField(max_length=100)
    middle_name = models.CharField(max_length=100, blank=True, null=True)
    last_name = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=10)
    marital_status = models.CharField(max_length=20, blank=True, null=True)
    

    # Contact Information
    mobile_no = models.CharField(max_length=15, unique=True)
    email = models.EmailField(unique=True)
    address = models.TextField()
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    pincode = models.CharField(max_length=10)

    # Professional Information
    agent_code = models.CharField(max_length=50, unique=True)
    joining_date = models.DateField()
    experience = models.PositiveIntegerField(blank=True, null=True, help_text="Experience in years")

    # --- NEW STATUS FIELD ---
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Active')

   

    # Documents
    photo = models.ImageField(upload_to='sub_agent/photos/')
    resume = models.FileField(upload_to='sub_agent/resumes/', blank=True, null=True)
    

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.agent_code})"

    class Meta:
        ordering = ['-created_at']
