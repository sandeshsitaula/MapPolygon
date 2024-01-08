from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import json
from django.contrib.gis.geos import Polygon as GeosPolygon, Point
from .serializers import PolygonSerializer
from .models import Points,Polygon
# Create your views here.
@api_view(['POST'])
def AddPolygon(request):
    try:
        data = json.loads(request.body)
        print(data)
        for item in data:
            latlngs = item['latlngs']

            # Create a set of tuples from the latlngs for easy comparison
            provided_coordinates = set((latlng['lat'], latlng['lng']) for latlng in latlngs)

            # Check if there is an existing polygon with exactly the same coordinates
            existing_polygon = Polygon.objects.filter(
                points__point__in=[Point(lat, lng) for lat, lng in provided_coordinates]
            ).first()
            print(existing_polygon)

            if existing_polygon:
                print(f"Polygon with coordinates {latlngs} already exists.")
                # Handle the case where all coordinates match the existing polygon
                # You may want to do something specific in this case
                # continue  # Skip the rest of the loop if a matching polygon is found

                new_polygon=existing_polygon
                new_polygon.points.clear()
            # If not found or not all coordinates match, create a new polygon
            else:
                new_polygon = Polygon.objects.create()
            for latlng in latlngs:
                lat = latlng['lat']
                lng = latlng['lng']
                print(lat, lng)
                point = Points.objects.create(point=Point(x=lat, y=lng))
                new_polygon.points.add(point)

        return Response({'msg':'Successfully added','data':PolygonSerializer(new_polygon).data})

    except Exception as e:
        print(f"Error: {e}")
        error=str(e)
        return Response({'error':f"Error...{error}"},status=400)

#Get all polygons used in index page in frontned
@api_view(['GET'])
def GetAllPolygons(request):
    try:
        polygons=Polygon.objects.all().order_by('-id')
        serializer=PolygonSerializer(polygons,many=True)
        data={'data':serializer.data}
        return Response(data,status=200)
    except Exception as e:
        error=str(e)
        print(error)
        return Response({'error':f"Unexpected error {error}"},status=400)

#Get the specific polygon used in viewpage of frontend
@api_view(['GET'])
def GetPolygon(request,polygonId):
    try:
        polygon=Polygon.objects.get(id=polygonId)
        serializer=PolygonSerializer(polygon)
        data={'data':serializer.data}
        return Response(data,status=200)
    except Exception as e:
        error=str(e)
        print(error)
        return Response({'error':f"Unexpected Error {error}"},status=400)
