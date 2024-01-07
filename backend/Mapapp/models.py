from django.db import models
from django.contrib.gis.db import models as gis_models
# Create your models here.

class Points(gis_models.Model):
    point=gis_models.PointField()

class Polygon(models.Model):
    points=models.ManyToManyField('Points')
