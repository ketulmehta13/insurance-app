from django.db import models
from django.contrib.auth.models import User
import uuid

class Profile(models.Model):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('agent', 'Agent'),
        ('customer', 'Customer'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    agent_code = models.CharField(max_length=50, blank=True, null=True, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        # Generate agent_code only for agents if not already set
        if self.role == "agent" and not self.agent_code:
            self.agent_code = f"AG-{uuid.uuid4().hex[:8].upper()}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.username} - {self.role}"
