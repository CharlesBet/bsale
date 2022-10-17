from unicodedata import category
from django.db import models

from category.models import Category
from rest_framework.serializers import ModelSerializer

# Create your models here.
class Product(models.Model):
    name = models.CharField(max_length=100)
    url_image = models.URLField()
    price = models.DecimalField(max_digits=12, decimal_places=2)
    discount = models.IntegerField()
    category = models.ForeignKey(Category, on_delete=models.DO_NOTHING)


class ProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
