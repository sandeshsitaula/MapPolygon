from rest_framework import serializers
from .models import ServiceArea

class ServiceAreaSerializer(serializers.ModelSerializer):

    class Meta:
        model=ServiceArea
        fields='__all__'

