from rest_framework.response import Response
from rest_framework.decorators import api_view
import json
from django.contrib.gis.geos import Point
from .models import Customer,ServiceAddress
from .serializers import CustomerSerializer,ServiceAddressSerializer
from Mapapp.models import ServiceArea
import requests
import os

# For converting location to coordinates
def geocode_location(address,country, state, city):
    api_key=os.getenv('OPENCAGE_API')
    base_url = 'https://api.opencagedata.com/geocode/v1/json'
    params = {
        'q': f'{address},{city}, {state}, {country}',
        'key': api_key,
    }
    response = requests.get(base_url, params=params)
    data = response.json()
    if data and 'results' in data and data['results']:
        geometry = data['results'][0]['geometry']
        return geometry['lng'], geometry['lat']
    else:
        return None,None


#For adding new Customer
@api_view(['POST'])
def AddCustomer(request):
    try:
        data=json.loads(request.body)
        first_name=data.get('firstName')
        last_name=data.get('lastName')
        country=data.get('country')
        state=data.get('state')
        phone_number=data.get('phoneNumber')
        city=data.get('city')
        zip_code=data.get('zipCode')
        address=data.get('address')
        email=data.get('email')
        lng, lat = geocode_location(address,country, state, city)

        if (lng is None or lat is None):
            return Response({'error':f'Unexpected errro couldnot find your location try again after correcting it'},401)

        newCustomer=Customer(email=email,first_name=first_name,phone_number=phone_number,last_name=last_name)
        newCustomer.save()

        serviceArea=ServiceArea.objects.filter(polygon__contains=Point(lng,lat)).order_by('-id')

        #If there are no service area then just add one
        if len(serviceArea)==0:
            newServiceAddress=ServiceAddress(country=country,state=state,address=address,city=city,zip_code=zip_code,location=Point(lng, lat))
            newServiceAddress.customer=newCustomer
            newServiceAddress.save()

            #If there are multiple service areas make multiple instances of serviceaddress with varying service area
        else:
            for area in serviceArea:
                newServiceAddress=ServiceAddress(country=country,state=state,address=address,city=city,zip_code=zip_code,location=Point(lng, lat))
                newServiceAddress.service_area=area
                newServiceAddress.customer=newCustomer
                newServiceAddress.save()

        data={'message':"customer creation successfull"}
        return Response(data,status=201)
    except Exception as e:
        error=str(e)
        print(error)
        return Response({'error':f"Unexpected Error .. {error}"},status=400)



#get all customer lcoation
@api_view(['GET'])
def GetAllCustomerLocation(request):
    try:
        all_customer_location = ServiceAddress.objects.all().values_list('location', flat=True).order_by('-id').distinct()

        #Get all user location but get just unique customer location
        locations = []
        seen_coordinates = set()
        for point in all_customer_location:
            coordinates = (point.y, point.x)

            # Check if coordinates are already in the result list
            if coordinates not in seen_coordinates:
                locations.append(coordinates)
                seen_coordinates.add(coordinates)

        return Response({'data':locations}, status=200)

    except Exception as e:
       error=str(e)
       print(error)
       return Response({'error':f"Unexpected error occured ...{error}"},status=400)


@api_view(['GET'])
def GetAllCustomer(request):
    try:
        result=[]
        customers=Customer.objects.all().order_by('-id')
        for customer in customers:
            serviceAddress=ServiceAddress.objects.filter(customer=customer).order_by('-id')

            data={
               'customer':CustomerSerializer(customer).data,
               'service_address':ServiceAddressSerializer(serviceAddress,many=True).data
                }
            result.append(data)


        return Response({'data':result},status=200)
    except Exception as e:
        error=str(e)
        return Response({'error':f"Unexpected error occured {error}"},status=400)

@api_view(['GET'])
def GetCustomer(request,customerId):
    try:
        customer=Customer.objects.get(id=customerId)
        serviceAddress=ServiceAddress.objects.filter(customer=customer).order_by('-id')[:1]
        serializer=ServiceAddressSerializer(serviceAddress[0])
        return Response(serializer.data,status=200)
    except Exception as e:
        error=str(e)
        print(error)
        return Response({'error':f"Unexpected error occured...{error}"},status=400)


@api_view(['PUT'])
def UpdateCustomer(request, customerId):
    try:
        data=json.loads(request.body)
        customer = Customer.objects.get(id=customerId)
        serviceAddress=ServiceAddress.objects.filter(customer=customer)
        for service in serviceAddress:
             for field in ServiceAddress._meta.fields:  # Iterate over model fields
                field_name = field.name
                if field_name in data:
                    setattr(service, field_name, data[field_name])
             service.save()

        for field in Customer._meta.fields:
            field_name=field.name
            if field_name in data:
                setattr(customer,field_name,data[field_name])

        customer.save()
        msg = {'message': 'The user has been updated','data':ServiceAddressSerializer(serviceAddress[0]).data}
        return Response(msg, status=200)

    except Customer.DoesNotExist:
        return Response({"message": "No user found"}, status=404)

    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return Response({"error": "An error occurred while updating the user"}, status=500)
