from django.urls import path
from . import views
urlpatterns=[
    path('addCustomer/',views.AddCustomer)
    ]
