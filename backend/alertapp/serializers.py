from rest_framework import serializers
from .models import AlertModel,AlertServiceModel
from customerapp.serializers import ServiceAddressSerializer

class AlertModelSerializer(serializers.ModelSerializer):
    class Meta:
        model=AlertModel
        fields='__all__'


class AlertServiceModelSerializer(serializers.ModelSerializer):
    service_address=ServiceAddressSerializer()
    class Meta:
        model=AlertServiceModel
        fields='__all__'
