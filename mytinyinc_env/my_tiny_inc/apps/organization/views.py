from rest_framework import viewsets
from .serializers import OrganizationSerializer
from .models import Organization
from django.core.exceptions import PermissionDenied

class OrganizationViewSet(viewsets.ModelViewSet):
    serializer_class = OrganizationSerializer

    def get_queryset(self):
        user = self.request.user
        organizations = Organization.objects.filter(created_by=user)

        if not organizations.exists():
            Organization.objects.create(name="", org_number="", created_by=user)

        return Organization.objects.filter(created_by=user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def perform_update(self, serializer):
        obj = self.get_object()
        if self.request.user != obj.created_by:
            raise PermissionDenied("You do not have permission to edit this organization.")
        serializer.save()