# Generated by Django 4.0.4 on 2022-05-13 18:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='hydrant',
            name='date_last_check',
            field=models.CharField(max_length=100),
        ),
    ]
