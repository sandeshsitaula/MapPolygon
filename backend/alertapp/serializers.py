from rest_framework import serializers
from .models import AlertModel,AlertServiceModel
from Mapapp.serializers import ServiceAreaSerializer

class AlertModelSerializer(serializers.ModelSerializer):
    class Meta:
        model=AlertModel
        fields='__all__'


class AlertServiceModelSerializer(serializers.ModelSerializer):
    service_area=ServiceAreaSerializer()
    class Meta:
        model=AlertServiceModel
        exclude=['alert']
