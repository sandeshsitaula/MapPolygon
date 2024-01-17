from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import json
from django.contrib.gis.geos import Polygon as GeosPolygon,Point,LinearRing
from .serializers import ServiceAreaSerializer
from .models import ServiceArea
from customerapp.models import Customer,ServiceAddress
from customerapp.serializers import ServiceAddressSerializer

#For adding a new polygon
@api_view(['POST'])
def AddPolygon(request):
    try:
        data = json.loads(request.body)
        listData=[]  #since multiple polygons may be there

        for item in data:
            latlngs = item['latlngs']
            if len(latlngs) >= 3:
                #required because Polygon from geos expects last coordinates to be same
                latlngs.append(latlngs[0])

            # Create a list
            points = [Point(latlng['lng'], latlng['lat']) for latlng in latlngs]

            # Create a LinearRing directly
            linear_ring = LinearRing(points)
            polygon_geometry = GeosPolygon(linear_ring)
            polygon_wkt = polygon_geometry.wkt

            # Check if there is an existing polygon with exactly the same coordinates
            existing_polygon = ServiceArea.objects.filter(polygon__exact=polygon_wkt).first()

            if existing_polygon:
                print(f"Polygon with coordinates {latlngs} already exists.")
                continue

            # If not found, create a new polygon
            newServiceArea = ServiceArea.objects.create(polygon=polygon_geometry)

            serviceAddressInPolygon=ServiceAddress.objects.filter(location__within=newServiceArea.polygon).order_by('-id')

            if serviceAddressInPolygon is None:
                continue
            for service in serviceAddressInPolygon:

                if service.service_area is None:
                    # If service_area is null, update the existing service_area
                    service.service_area = newServiceArea
                    service.save()
                    listData.append(ServiceAddressSerializer(service).data)
                else:
                    service_temp=ServiceAddress.objects.filter(customer=service.customer,service_area=newServiceArea)[:1]
                    if len(service_temp)>0:
                        continue

                    service_data = {field.name: getattr(service, field.name) for field in ServiceAddress._meta.fields if field.name not in ['_state', 'id']}
                    service_data['service_area'] = newServiceArea  # Set the new service_area
                    newServiceAddress,created = ServiceAddress.objects.get_or_create(**service_data)
                    listData.append(ServiceAddressSerializer(newServiceAddress).data)

        if len(listData)==0:
            return Response({'msg':'sucessfully added','polygonId':newServiceArea.id},status=200)

        return Response({'msg': 'Successfully added','data':listData, 'polygonId': newServiceArea.id})

    except Exception as e:
        print(f"Error: {e}")
        error=str(e)
        return Response({'error':f"Error...{error}"},status=400)



#Get all polygons used in index page in frontned
@api_view(['GET'])
def GetAllPolygons(request):
    try:
        serviceArea=ServiceArea.objects.all().order_by('-id')
        serializer=ServiceAreaSerializer(serviceArea,many=True)
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
        polygon=ServiceArea.objects.get(id=polygonId)
        serviceAddress=ServiceAddress.objects.filter(service_area=polygon).order_by('-id')

        if len(serviceAddress)==0:
            serializer=ServiceAreaSerializer(polygon)
        else:
            serializer=ServiceAddressSerializer(serviceAddress,many=True)

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
        polygon=ServiceArea.objects.get(id=polygonId)
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
