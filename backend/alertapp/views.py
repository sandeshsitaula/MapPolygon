from rest_framework.response import Response
from rest_framework.decorators import api_view
import json
from django.contrib.gis.geos import Point
from .models import AlertModel,AlertServiceModel
from customerapp.models import ServiceAddress
from customerapp.serializers import CustomerSerializer,ServiceAddressSerializer
from alertapp.serializers import AlertModelSerializer,AlertServiceModelSerializer
from Mapapp.models import ServiceArea
import requests
import os



def stubFunction(customerList,message):
    try:
        for customer in customerList:
            print(customer.get('email')) # will later be used to send email
    except Exception as e:
        error=str(e)
        print(error)

# Create your views here.
@api_view(['POST'])
def AddAlert(request):
    try:
        data=json.loads(request.body)
        alert_name=data.get('alert_name')
        message=data.get('alert_message')

        alert_service_area=data.get('alert_service_area')
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

@api_view(['GET'])
def GetAllAlert(request):
    try:

        allAlert=[]
        alerts=AlertModel.objects.all().order_by('-id')

        for alert in alerts:
            alertService=AlertServiceModel.objects.filter(alert=alert).order_by('-id')
            data={
               'alert':AlertModelSerializer(alert).data,
               'service_area':AlertServiceModelSerializer(alertService,many=True).data
                }

            allAlert.append(data)

        return Response({'data':allAlert},status=200)


    except Exception as e:
        error=str(e)
        return Response({'error':f"Unexpected Error occured {error}"},status=400)


@api_view(['GET'])
def ResolveAlert(request,alertId):
    try:
        alert=AlertModel.objects.get(id=alertId)
        alert.status="RESOLVED"
        alert.message="This alert has been resolved"
        alert.save()

        customerList=[]

        #Get list of all alert services
        alertServices=AlertServiceModel.objects.filter(alert=alert).order_by('-id')

        #for the lsit of services get the corresponding service address to get customer list
        for alertService in alertServices:
            serviceAddress=ServiceAddress.objects.filter(service_area=alertService.service_area).order_by('-id')

            #for getting individual service address to get customer data
            for service in serviceAddress:
                data=ServiceAddressSerializer(service).data['customer']
                if data not in customerList:
                    customerList.append(data)


        #will run function for all the customers  (later can be made background task using celery)
        stubFunction(customerList,alert.message)
        print(customerList)
        return Response({'message':"The Alert has been successfully resolved"},status=200)


    except Exception as e:
        error=str(e)
        print(error)
        return Response({'error':f"unexpected error occured"})



