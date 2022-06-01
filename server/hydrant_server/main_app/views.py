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
        street = self.request.query_params.get('street') if self.request.query_params.get('street') else ''
        area = self.request.query_params.get('area') if self.request.query_params.get('area') else ''
        locality = self.request.query_params.get('locality') if self.request.query_params.get('locality') else ''
        belonging = self.request.query_params.get('belonging') if self.request.query_params.get('belonging') else ''
        serviceable = self.request.query_params.get('serviceable')
        if serviceable == 'true' or serviceable == 'false':
            if self.request.query_params.get('serviceable') == "true":
                serviceable = True
            elif self.request.query_params.get('serviceable') == "false":
                serviceable = False
            queryset = Hydrant.objects.filter(address_district__icontains=area,
                                              address_detail__icontains=street,
                                              address_town__icontains=locality,
                                              belonging__icontains=belonging,
                                              serviceable=serviceable
                                              )
            return queryset

        queryset = Hydrant.objects.filter(address_district__icontains=area,
                                          address_detail__icontains=street,
                                          address_town__icontains=locality,
                                          belonging__icontains=belonging,
                                          )

        return queryset
