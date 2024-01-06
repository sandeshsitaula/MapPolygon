from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
@api_view(['GET'])
def index(request):
    return Response({'msg',"success"},status=200)
