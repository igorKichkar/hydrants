from django.urls import include, path
from rest_framework import routers
from .views import HydrantViewSet, download_exel_report

router = routers.DefaultRouter()
router.register(r'hydrants', HydrantViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('download/', download_exel_report),
]
