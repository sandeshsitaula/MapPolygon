from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import json
from django.contrib.gis.geos import Point
from .serializers import PolygonSerializer
from .models import Points,Polygon
# Create your views here.
@api_view(['POST'])
def AddPolygon(request):
    try:
        data=json.loads(request.body)
        print(data)
        for item in data:
            leafletId=item['leaflet_id']
            latlngs=item['latlngs']
            polygon,created=Polygon.objects.get_or_create(leafletId=leafletId)

            #if not created then simply clear because it is probably edited polygon
            if not created:
                polygon.points.clear()
                for latlng in latlngs:
                    lat=latlng['lat']
                    lng=latlng['lng']
                    point,created=Points.objects.get_or_create(point=Point(x=lat,y=lng))
                    polygon.points.add(point)


            polygon.save()
        return Response({'msg':"successfully added Polygon"},status=200)
    except Exception as e:
        error=str(e)
        print(error)
        return Response({'error':f"Unexpected error {error}"},status=400)

@api_view(['GET'])
def GetAllPolygons(request):
    try:
        polygons=Polygon.objects.all().order_by('-id')
        print(polygons)
        serializer=PolygonSerializer(polygons,many=True)
        print(serializer.data)
        data={'data':serializer.data}
        return Response(data,status=200)
    except Exception as e:
        error=str(e)
        print(error)
        return Response({'error':f"Unexpected error {error}"},status=400)


@api_view(['GET'])
def GetPolygon(request,polygonId):
        polygon=Polygon.objects.get(id=polygonId)
        print(polygon)
        serializer=PolygonSerializer(polygon)
        print(serializer.data)
        data={'data':serializer.data}
        return Response(data,status=200)
