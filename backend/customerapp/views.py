from rest_framework.response import Response
from rest_framework.decorators import api_view
import json
from django.contrib.gis.geos import Point
from .models import Customer
from .serializers import CustomerSerializer
import requests
import os

# For converting location to coordinates
def geocode_location(country, state, city):
    api_key=os.getenv('OPENCAGE_API')
    base_url = 'https://api.opencagedata.com/geocode/v1/json'

    params = {
        'q': f'{city}, {state}, {country}',
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
        firstName=data.get('firstName')
        lastName=data.get('lastName')
        country=data.get('country')
        state=data.get('state')
        phoneNumber=data.get('phoneNumber')
        city=data.get('city')
        zipCode=data.get('zipCode')
        lng, lat = geocode_location(country, state, city)
        if (lng is None or lat is None):
            return Response({'error':f'Unexpected errro couldnot find your location try again after correcting it'},401)

        newCustomer=Customer(firstName=firstName,lastName=lastName,country=country,state=state,phoneNumber=phoneNumber,city=city,zipCode=zipCode,            point=Point(lng, lat))

        newCustomer.save()
        data={'message':"customer creation successfull",'data':CustomerSerializer(newCustomer).data}
        return Response(data,status=201)



    except Exception as e:
        error=str(e)
        print(error)
        return Response({'error':f"Unexpected Error .. {error}"},400)
