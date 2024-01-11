from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import json
from django.contrib.gis.geos import Polygon as GeosPolygon,Point,LinearRing
from .serializers import PolygonSerializer
from .models import Polygon
# Create your views here.

#For adding a new polygon
@api_view(['POST'])
def AddPolygon(request):
    try:
        data = json.loads(request.body)

        for item in data:
            latlngs = item['latlngs']

            #must be greater than 3
            if len(latlngs) >= 3:
                #required because Polygon from geos expects last coordinates to be same
                latlngs.append(latlngs[0])
                print(latlngs)


            # Create a list
            points = [Point(latlng['lng'], latlng['lat']) for latlng in latlngs]

            # Create a LinearRing directly
            linear_ring = LinearRing(points)
            polygon_geometry = GeosPolygon(linear_ring)

            polygon_wkt = polygon_geometry.wkt

            # Check if there is an existing polygon with exactly the same coordinates
            existing_polygon = Polygon.objects.filter(polygon__exact=polygon_wkt).first()

            if existing_polygon:
                print(f"Polygon with coordinates {latlngs} already exists.")
                # Handle the case where a matching polygon is found
                # You may want to do something specific in this case

                existing_polygon.delete()

            # If not found, create a new polygon
            new_polygon = Polygon.objects.create(polygon=polygon_geometry)
        return Response({'msg': 'Successfully added', 'data': PolygonSerializer(new_polygon).data})

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

#delete polygon given a polygon id
@api_view(['GET'])
def DeletePolygon(request,polygonId):
    try:
        polygon=Polygon.objects.get(id=polygonId)
        polygon.delete()
        return Response({'message':f"Polygon Deleted sucessfully"},status=200)
    except Exception as e:
        error=str(e)
        return Response({'error':f"Unexpected Error occured"},status=400)

#update a polygon given an index
@api_view(['POST'])
def UpdatePolygon(request,polygonId):
    try:
        polygonData=Polygon.objects.get(id=polygonId)
        data = json.loads(request.body)

        latlngs = data['latlngs']

            #must be greater than 3
        if len(latlngs) >= 3:
                #required because Polygon from geos expects last coordinates to be same
                latlngs.append(latlngs[0])

            # Create a list
        points = [Point(latlng['lng'], latlng['lat']) for latlng in latlngs]

            # Create a LinearRing directly
        linear_ring = LinearRing(points)
        polygon_geometry = GeosPolygon(linear_ring)

        polygonData.polygon=polygon_geometry
        polygonData.save()
        return Response({'msg': 'Successfully updated', 'data': PolygonSerializer(new_polygon).data})

    except Exception as e:
        error=str(e)
        return Response({'msg':f"Unexpected error {error}"},status=400)
