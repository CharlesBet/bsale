from rest_framework.viewsets import ModelViewSet

from .models import Category, CategorySerializer

# Create your views here.
class CategoryAPIView(ModelViewSet):
    serializer_class = CategorySerializer
    http_method_names = ["get", "post", "patch", "delete"]
    queryset = Category.objects.all()
