from django.db import models
from client.models import FamilyHead
from policy.models import Policy
from agent.models import SubAgent


class Inquiry(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
        ('assigned', 'Assigned'),
        ('in_progress', 'In Progress'),
        ('resolved', 'Resolved'),
        ('closed', 'Closed'),
    ]

    customer = models.ForeignKey(FamilyHead, on_delete=models.CASCADE, related_name='inquiries')
    policy = models.ForeignKey(Policy, on_delete=models.CASCADE, related_name='inquiries')
    message = models.TextField()
    
    # ADD THIS LINE FOR DOCUMENT UPLOAD:
    document = models.FileField(upload_to='inquiry_documents/', blank=True, null=True)
    
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    assigned_subagent = models.ForeignKey(SubAgent, null=True, blank=True, on_delete=models.SET_NULL)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Inquiry #{self.id} by {self.customer} on {self.policy}'
