from rest_framework.response import Response
from rest_framework.decorators import api_view
import json
from .models import Customer
from .serializers import CustomerSerializer
# Create your views here.
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

        newCustomer=Customer(firstName=firstName,lastName=lastName,country=country,state=state,phoneNumber=phoneNumber,city=city,zipCode=zipCode)

        newCustomer.save()
        data={'message':"customer creation successfull",'data':CustomerSerializer(newCustomer).data}
        return Response(data,status=201)



    except Exception as e:
        error=str(e)
        print(error)
        return Response({'error':f"Unexpected Error .. {error}"},400)
