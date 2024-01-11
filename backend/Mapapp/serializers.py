from rest_framework import serializers
from .models import Polygon,CustomerPolygon

from customerapp.serializers import CustomerSerializer
class PolygonSerializer(serializers.ModelSerializer):

    class Meta:
        model=Polygon
        fields='__all__'

class CustomerPolygonSerializer(serializers.ModelSerializer):
    polygon=PolygonSerializer()
    customer=CustomerSerializer(many=True)

    class Meta:
        model=CustomerPolygon
        fields='__all__'
