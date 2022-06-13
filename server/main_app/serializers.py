from rest_framework import serializers
from .models import Hydrant


class HydrantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hydrant
        fields = '__all__'

