from django.db import models
from django.contrib.auth.models import AbstractUser


class Profile(AbstractUser):
    def __str__(self):
        return self.username


class Hydrant(models.Model):
    number = models.IntegerField()
    address = models.CharField(max_length=255)
    type_of_water_supply = models.CharField(max_length=50)
    serviceable = models.BooleanField()
    fault_type = models.CharField(max_length=100, blank=True)
    coordinates_width = models.FloatField()
    coordinates_height = models.FloatField()
    author = models.ForeignKey(Profile, on_delete=models.PROTECT, blank=True)
    date = models.DateTimeField(auto_now_add=True)
