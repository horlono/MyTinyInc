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
class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = (
            "id",
           
            "title",
            "quantity",
            "unit_price",
            "net_amount",
            "vat_rate",
            "discount"
        )
        read_only_fields = (
            "invoice",
            
        )