from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet

from .models import Product, ProductSerializer

# Create your views here.
class ProductAPIView(ModelViewSet):
    serializer_class = ProductSerializer
    http_method_names = ["get", "post", "patch", "delete"]
    
    def get_queryset(self):
        sort_params = {}
        category = self.request.query_params.get("category")
        name = self.request.query_params.get("name")

        if category:
            sort_params["category__id"] = category

        if name:
            sort_params["name__contains"] = name

        if sort_params:
            return Product.objects.filter(**sort_params)
        
        return Product.objects.all()
