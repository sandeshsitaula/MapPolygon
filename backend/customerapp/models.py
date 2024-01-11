from django.db import models
from django.contrib.gis.db import models as gis_models
# Create your models here.
'''
  Class Customer(models.Model):
    # use geocoding API to convert street address to lat/long to store in database
    point = gis_models.PointField()
    phone_number = models.CharField(max_length=20)
    address = models.CharField(max_length=100)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=2)
    zip_code = models.CharField(max_length=5)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50
    polygon = models.ForeignKey(Polygon, on_delete=models.CASCADE)'''
class Customer(models.Model):
    firstName=models.CharField(max_length=50)
    lastName=models.CharField(max_length=50)
    phoneNumber=models.CharField(max_length=20)
    country=models.CharField(max_length=50)
    city=models.CharField(max_length=50)
    state=models.CharField(max_length=50)
    zipCode=models.CharField(max_length=50)
    point=gis_models.PointField(null=True)
    createdAt=models.DateTimeField(auto_now_add=True)
