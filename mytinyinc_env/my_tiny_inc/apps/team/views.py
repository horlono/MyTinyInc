from rest_framework import viewsets
from .serializers import TeamSerializer
from .models import Team
from django.core.exceptions import PermissionDenied

class TeamViewSet(viewsets.ModelViewSet):
    serializer_class = TeamSerializer

    def get_queryset(self):
        user = self.request.user
        teams = Team.objects.filter(created_by=user)

        if not teams.exists():
            Team.objects.create(name="", org_number="", created_by=user)

        return Team.objects.filter(created_by=user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def perform_update(self, serializer):
        obj = self.get_object()
        if self.request.user != obj.created_by:
            raise PermissionDenied("You do not have permission to edit this team.")
        serializer.save()