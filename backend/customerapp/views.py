from rest_framework.response import Response
from rest_framework.decorators import api_view
import json
from django.contrib.gis.geos import Point
from .models import Customer,ServiceAddress
from .serializers import CustomerSerializer,ServiceAddressSerializer
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

        newServiceAddress=ServiceAddress(country=country,state=state,address=address,city=city,zip_code=zip_code,location=Point(lng, lat))
        newServiceAddress.customer=newCustomer

        newCustomer.save()
        newServiceAddress.save()
        data={'message':"customer creation successfull",'data':ServiceAddressSerializer(newServiceAddress).data}
        return Response(data,status=201)



    except Exception as e:
        error=str(e)
        print(error)
        return Response({'error':f"Unexpected Error .. {error}"},400)
