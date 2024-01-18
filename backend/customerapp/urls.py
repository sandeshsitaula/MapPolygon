from django.urls import path
from . import views
urlpatterns=[
    path('addCustomer/',views.AddCustomer),
    path('getAllCustomerLocation/',views.GetAllCustomerLocation),
    path('getCustomer/<int:customerId>/',views.GetCustomer),
    path('updateCustomer/<int:customerId>/',views.UpdateCustomer),
    path('getAllCustomer/',views.GetAllCustomer),
    ]
