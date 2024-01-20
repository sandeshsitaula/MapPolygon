from django.contrib import admin
from .models import AlertModel,AlertServiceModel
# Register your models here.

admin.site.register(AlertModel)
admin.site.register(AlertServiceModel)
