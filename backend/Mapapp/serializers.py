from rest_framework import serializers
from .models import Points,Polygon

class PointsSerializer(serializers.ModelSerializer):
    class Meta:
        model=Points
        fields='__all__'

class PolygonSerializer(serializers.ModelSerializer):
    points=PointsSerializer(many=True)

    class Meta:
        model=Polygon
        fields='__all__'
