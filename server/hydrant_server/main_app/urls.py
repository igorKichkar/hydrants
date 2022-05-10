from django.urls import include, path
from rest_framework import routers
from .views import HydrantViewSet

router = routers.DefaultRouter()
router.register(r'hydrants', HydrantViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
