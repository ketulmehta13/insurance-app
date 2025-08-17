# dashboard/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from datetime import date, timedelta
from django.db.models import Count

# Import models from your other apps
from client.models import FamilyHead, FamilyMember, Firm
from policy.models import Policy
from agent.models import SubAgent

class DashboardStatsView(APIView):
    """
    Provides all the necessary statistics and data for the main dashboard.
    """
    def get(self, request, *args, **kwargs):
        # --- Data for Stats Cards ---
        total_family_heads = FamilyHead.objects.count()
        total_family_members = FamilyMember.objects.count()
        total_firms = Firm.objects.count()
        total_sub_agents = SubAgent.objects.count()

        # --- Data for Charts ---
        # This is a simplified example. You could make these queries more complex.
        client_registrations_total = total_family_heads + total_family_members + total_firms
        policy_entries_total = Policy.objects.count()
        
        # --- Data for Calendar Events (Policies expiring in the next 30 days) ---
        today = date.today()
        thirty_days_later = today + timedelta(days=30)
        expiring_policies = Policy.objects.filter(end_date__range=[today, thirty_days_later])
        
        calendar_events = []
        for policy in expiring_policies:
            calendar_events.append({
                'date': policy.end_date.strftime('%Y-%m-%d'),
                'title': f"Expiry: {policy.policy_number}",
            })

        # --- Assemble the final data payload ---
        data = {
            'stats_cards': {
                'total_groups': total_family_heads, # Assuming a group is a family head
                'family_heads': total_family_heads,
                'total_members': total_family_members,
                'total_firms': total_firms,
            },
            'charts': {
                'client_registration': {'total': 500, 'used': client_registrations_total},
                'policy_entry': {'total': 1000, 'used': policy_entries_total},
                'documents_upload': {'total': 2000, 'used': 1500}, # Example data
            },
            'calendar_events': calendar_events,
        }

        return Response(data)
