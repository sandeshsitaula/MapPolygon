from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import json
from django.contrib.gis.geos import Point

from .models import Points,Polygon
# Create your views here.
@api_view(['POST'])
def AddPolygon(request):
    try:
        data=json.loads(request.body)
        print(data)
        for item in data:
            print(item)
            leafletId=item['leaflet_id']
            latlngs=item['latlngs']
            polygon=Polygon.objects.create(leafletId=leafletId)
            for latlng in latlngs:
                lat=latlng['lat']
                lng=latlng['lng']
                point,created=Points.objects.get_or_create(point=Point(x=lat,y=lng))

                polygon.points.add(point)

            polygon.save
        return Response({'msg':"successfull Transaction"},status=200)
    except Exception as e:
        error=str(e)
        print(error)
        return Response({'error':f"Unexpected error {error}"},status=400)

@api_view(['GET'])
def GetAllPolygons(request):
    data=json.loads(request.body)

    print(data)
    return Response({'msg',"success"},status=200)

@api_view(['GET'])
def GetPolygon(request,polygonId):
    data=json.loads(request.body)

    print(data)
    return Response({'msg',"success"},status=200)
