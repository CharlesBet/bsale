from django.db import models
from rest_framework.serializers import ModelSerializer

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=50)


class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"
