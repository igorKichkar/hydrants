# Generated by Django 4.0.4 on 2022-05-13 18:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0002_alter_hydrant_date_last_check'),
    ]

    operations = [
        migrations.AlterField(
            model_name='hydrant',
            name='number_in_map',
            field=models.CharField(blank=True, max_length=20),
        ),
    ]