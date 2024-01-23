from django.urls import path
from . import views
urlpatterns=[
    path('addAlert/',views.AddAlert),
    path('allAlert/',views.GetAllAlert),
    path('resolveAlert/<alertId>/',views.ResolveAlert),
    ]
