from django.db import models
from django.contrib.gis.db import models as gis_models
# Create your models here.


class Polygon(models.Model):
    polygon=gis_models.PolygonField()

