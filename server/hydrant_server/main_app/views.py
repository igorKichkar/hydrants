from rest_framework import viewsets
from .models import Hydrant
from .serializers import HydrantSerializer


class HydrantViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows hydrants to be viewed or edited.
    """
    queryset = Hydrant.objects.all()
    serializer_class = HydrantSerializer

    def get_queryset(self):
        print(self.request.query_params)
        # print(self.request.query_params.get('parameter1'))
        queryset = Hydrant.objects.all()

        return queryset
