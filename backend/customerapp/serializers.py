from rest_framework import serializers
from .models import Customer,ServiceAddress
from Mapapp.serializers import ServiceAreaSerializer

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model=Customer
        fields='__all__'

class ServiceAddressSerializer(serializers.ModelSerializer):
    service_area=ServiceAreaSerializer()
    customer=CustomerSerializer()
    class Meta:
        model=ServiceAddress
        fields='__all__'

