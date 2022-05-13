from django.db import models
from django.contrib.auth.models import AbstractUser


class Profile(AbstractUser):
    def __str__(self):
        return self.username


class Hydrant(models.Model):
    serial_number = models.CharField(max_length=20)
    number_in_map = models.CharField(max_length=20, blank=True)
    type = models.CharField(max_length=50)
    address_region = models.CharField(max_length=30)
    address_district = models.CharField(max_length=30)
    address_village_council = models.CharField(max_length=30, blank=True)
    address_town = models.CharField(max_length=30)
    address_detail = models.CharField(max_length=255)
    type_of_water_supply = models.CharField(max_length=50)
    diameter_drain = models.CharField(max_length=5)
    serviceable = models.BooleanField()
    fault_type = models.CharField(max_length=100, blank=True)
    belonging = models.CharField(max_length=255, blank=True)
    coordinate_width = models.FloatField()
    coordinate_height = models.FloatField()
    place_plate = models.CharField(max_length=100, blank=True)
    distance_front = models.CharField(max_length=4, blank=True)
    distance_left = models.CharField(max_length=4, blank=True)
    distance_right = models.CharField(max_length=4, blank=True)
    author = models.ForeignKey(Profile, on_delete=models.PROTECT, blank=True)
    description = models.CharField(max_length=355, blank=True)
    note = models.CharField(max_length=355, blank=True)
    date_last_check = models.CharField(max_length=100)
    date_update = models.DateTimeField(auto_now_add=True)

