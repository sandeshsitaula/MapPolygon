from django.db import models
from django.contrib.gis.db import models as gis_models
from Mapapp.models import ServiceArea


class Customer(models.Model):
    first_name=models.CharField(max_length=50)
    last_name=models.CharField(max_length=50)
    phone_number=models.CharField(max_length=20)
    created_at=models.DateTimeField(auto_now_add=True,blank=True,null=True)
    email = models.EmailField()


class ServiceAddress(models.Model):
    location=gis_models.PointField(null=True)
    country=models.CharField(max_length=50)
    city=models.CharField(max_length=50)
    state=models.CharField(max_length=50)
    zip_code=models.CharField(max_length=50)
    address=models.CharField(max_length=50)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    service_area=models.ForeignKey(ServiceArea,on_delete=models.CASCADE,null=True)
