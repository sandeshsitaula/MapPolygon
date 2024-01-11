from django.urls import path
from . import views
urlpatterns=[
    path('addPolygon/',views.AddPolygon),
    path('getAllPolygons/',views.GetAllPolygons),
    path('getPolygon/<int:polygonId>/',views.GetPolygon),
    path('deletePolygon/<int:polygonId>/',views.DeletePolygon),
    path('updatePolygon/<int:polygonId>/',views.UpdatePolygon),
    ]
