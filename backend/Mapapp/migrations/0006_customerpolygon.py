# Generated by Django 5.0.1 on 2024-01-11 10:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Mapapp', '0005_rename_points_polygon_polygon'),
        ('customerapp', '0002_alter_customer_point'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomerPolygon',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('customer', models.ManyToManyField(to='customerapp.customer')),
            ],
        ),
    ]
