from django.urls import path
from . import views
urlpatterns=[
    path('addAlert',views.AddAlert)
    ]