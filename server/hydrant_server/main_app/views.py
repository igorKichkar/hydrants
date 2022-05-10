from django.shortcuts import render
from rest_framework import viewsets
from .models import Hydrant
from .serializers import HydrantSerializer


class HydrantViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows hydrants to be viewed or edited.
    """
    queryset = Hydrant.objects.all().order_by('-date')
    serializer_class = HydrantSerializer
