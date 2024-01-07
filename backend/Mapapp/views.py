from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import json
# Create your views here.
@api_view(['POST'])
def AddPolygon(request):
    data=json.loads(request.body)

    print(data)
    return Response({'msg',"success"},status=200)


@api_view(['GET'])
def ViewAllPolygons(request):
    data=json.loads(request.body)

    print(data)
    return Response({'msg',"success"},status=200)

@api_view(['GET'])
def GetPolygon(request):
    data=json.loads(request.body)

    print(data)
    return Response({'msg',"success"},status=200)
