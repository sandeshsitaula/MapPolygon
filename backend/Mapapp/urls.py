from django.urls import path
from . import views
urlpatterns=[
    path('addPolygon/',views.AddPolygon),
    path('getAllPolygons/',views.GetAllPolygons),
    path('getPolygon/<int:polygonId>',views.GetPolygon),
    ]
