from django.db import models
from customerapp.models import  ServiceAddress
# Create your models here.

class AlertModel(models.Model):
    alert_name=models.CharField(max_length=200)
    statusChoices=[
        ('ACTIVE','Active'),
         ('RESOLVED','Resolved'),
        ]
    status=models.CharField(max_length=10,choices=statusChoices,default="ACTIVE")

    created_at=models.DateTimeField(auto_now_add=True)

class AlertServiceModel(models.Model):
    alert=models.ForeignKey(AlertModel,on_delete=models.CASCADE)
    service_address=models.ForeignKey(ServiceAddress,on_delete=models.CASCADE)
