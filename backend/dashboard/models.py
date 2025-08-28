# In your appropriate app's models.py (or create a new documents app)
from django.db import models
from client.models import FamilyHead, FamilyMember, Firm
from agent.models import SubAgent

class Document(models.Model):
    DOCUMENT_TYPES = [
        ('policy', 'Policy Document'),
        ('id_proof', 'ID Proof'),
        ('address_proof', 'Address Proof'),
        ('income_proof', 'Income Proof'),
        ('other', 'Other'),
    ]
    
    title = models.CharField(max_length=200)
    document_type = models.CharField(max_length=20, choices=DOCUMENT_TYPES)
    file = models.FileField(upload_to='documents/')
    uploaded_by = models.CharField(max_length=100)  # or ForeignKey to User
    upload_date = models.DateTimeField(auto_now_add=True)
    
    # Link to clients (optional - depends on your use case)
    family_head = models.ForeignKey(FamilyHead, on_delete=models.CASCADE, null=True, blank=True)
    family_member = models.ForeignKey(FamilyMember, on_delete=models.CASCADE, null=True, blank=True)
    firm = models.ForeignKey(Firm, on_delete=models.CASCADE, null=True, blank=True)
    
    def __str__(self):
        return f"{self.title} - {self.document_type}"
