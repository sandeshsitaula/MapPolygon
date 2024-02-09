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
from alertapp.tasks import sendMail
from django.http import JsonResponse
import  asyncio
from asgiref.sync import async_to_sync

async def _send_mail(phone_number, message):
    # kiq the task (this will run the task)
    task = await sendMail.kiq(phone_number, message)
    # wait on the task to return
    result = await task.wait_result()
    # return what the task returns
    return result.return_value

def send_emails(customerList, message):
    try:
        for customer in customerList:
            # task = await sendMail.kiq(customer.get('phone_number'), message)
            # result =await  task.wait_result()
            # print(result, "demo", result.return_value)
            result = async_to_sync(_send_mail)(customer.get("phone_number"), message)

    except Exception as e:
        error = str(e)
        print(error)

def stubFunction(customerList, message):
     send_emails(customerList, message)

# Create your views here.
@api_view(['POST'])
def AddAlert(request):
    try:
        data=json.loads(request.body)
        alert_name=data.get('alert_name')
        message=data.get('alert_message')
        customerList=[]
        alert_service_area=data.get('alert_service_area')
        alert=AlertModel(alert_name=alert_name,message=message)
        alert.save()
        for service_area_id in alert_service_area:
            service_area=ServiceArea.objects.get(id=service_area_id)
            alert_service=AlertServiceModel(alert=alert,service_area=service_area)
            alert_service.save()

            #for getting all customers in that alert area
            serviceAddress=ServiceAddress.objects.filter(service_area=service_area).order_by('-id')

            #for getting individual service address to get customer data
            for service in serviceAddress:
                data=ServiceAddressSerializer(service).data.get('customer')
                if data not in customerList:
                    customerList.append(data)


        stubFunction(customerList,alert.message)

        return Response({'message':"Alert has been successfully saved"},status=201)


    except Exception as e:
        error=str(e)
        print(error)
        return Response({'error':f"Unexpected error occured f{error}"},status=400)

@api_view(['GET'])
def GetAllAlert(request):
    try:
        allAlert=[]
        alerts= AlertModel.objects.all().order_by('-id')

        for alert in alerts:
            alertService=AlertServiceModel.objects.filter(alert=alert).order_by('-id')
            data={
               'alert':AlertModelSerializer(alert).data,
               'service_area':AlertServiceModelSerializer(alertService,many=True).data
                }

            allAlert.append(data)

        return JsonResponse({'data':allAlert},status=200)


    except Exception as e:
        print(e)
        error=str(e)
        print("error",error)
        return JsonResponse({'error':f"Unexpected Error occured {error}"},status=400)

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

@api_view(['GET'])
def SendMessage(request,alertId):
    try:
        alert=AlertModel.objects.get(id=alertId)
        customerList=[]
        #Get list of all alert services
        alertServices=AlertServiceModel.objects.filter(alert=alert).order_by('-id')

        #for the lsit of services get the corresponding service address to get customer list
        for alertService in alertServices:
            serviceAddress=ServiceAddress.objects.filter(service_area=alertService.service_area).order_by('-id')

            #for getting individual service address to get customer data
            for service in serviceAddress:
                data=ServiceAddressSerializer(service).data.get('customer')
                if data not in customerList:
                    customerList.append(data)


        #will run function for all the customers  (later can be made background task using celery)
        # stubFunction(customerList,alert.message)
        stubFunction(customerList, alert.message)
        return Response({'message':"The Message has been successfully Sent"},status=200)

    except Exception as e:
        error=str(e)
        print(error)
        return Response({'error':f"unexpected error occured"})



