from rest_framework import serializers

from .models import Invoice, Item

class InvoiceSerializer(serializers.ModelSerializer):
    client = serializers.StringRelatedField()
    class Meta:
        model = Invoice
        read_only_fields = (
            "team",
            "created_at",
            "created_by",
            "modified_at",
            "modified_by",
        ),
    
        fields = '__all__'