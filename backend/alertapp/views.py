from rest_framework.response import Response
from rest_framework.decorators import api_view
import json
from django.contrib.gis.geos import Point
from .models import AlertModel,AlertServiceModel
from customerapp.serializers import CustomerSerializer,ServiceAddressSerializer
from alertapp.serializers import AlertModelSerializer,AlertServiceModelSerializer
from Mapapp.models import ServiceArea
import requests
import os

# Create your views here.
@api_view(['POST'])
def AddAlert(request):
    try:
        data=json.loads(request.body)
        print(data)
        alert_name=data.get('alert_name')
        message=data.get('alert_message')
        print(alert_name,message)

        alert_service_area=data.get('alert_service_area')

        print(alert_service_area)
        alert=AlertModel(alert_name=alert_name,message=message)
        alert.save()
        for service_area_id in alert_service_area:
            service_area=ServiceArea.objects.get(id=service_area_id)
            alert_service=AlertServiceModel(alert=alert,service_area=service_area)
            alert_service.save()


        return Response({'message':"Alert has been successfully saved"},status=201)


    except Exception as e:
        error=str(e)
        print(error)
        return Response({'error':f"Unexpected error occured f{error}"},status=400)


