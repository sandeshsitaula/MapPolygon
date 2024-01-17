from django.urls import path
from . import views
urlpatterns=[
    path('addCustomer/',views.AddCustomer),
    path('getAllCustomerLocation/',views.GetAllCustomerLocation),
    path('getCustomer/<int:id>/',views.GetCustomer),
    path('updateCustomer/<int:id>/',views.UpdateCustomer),
    ]
