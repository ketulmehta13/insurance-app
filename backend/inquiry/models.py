from django.db import models
from client.models import FamilyHead
from policy.models import Policy
from agent.models import SubAgent

class Inquiry(models.Model):
    STATUS_CHOICES = [
    ('Pending', 'Pending'),
    ('Accepted', 'Accepted'),
    ('Rejected', 'Rejected'),
    ('Assigned', 'Assigned'),
    ('In Progress', 'In Progress'),
    ('Resolved', 'Resolved'),
    ('Closed', 'Closed'),
]


    customer = models.ForeignKey(FamilyHead, on_delete=models.CASCADE, related_name='inquiries')
    policy = models.ForeignKey(Policy, on_delete=models.CASCADE, related_name='inquiries')
    message = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    assigned_subagent = models.ForeignKey(SubAgent, null=True, blank=True, on_delete=models.SET_NULL)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Inquiry #{self.id} by {self.customer} on {self.policy}'
