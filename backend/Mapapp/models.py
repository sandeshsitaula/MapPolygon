from django.db import models
from django.contrib.gis.db import models as gis_models
# Create your models here.

'''
class Polygon(models.Model):
    polygon=gis_models.PolygonField()

class CustomerPolygon(models.Model):
    polygon=models.ForeignKey(Polygon,on_delete=models.CASCADE,blank=True,null=True)
    customer=models.ManyToManyField(Customer)
'''


class ServiceArea(models.Model):
    polygon=gis_models.PolygonField()
