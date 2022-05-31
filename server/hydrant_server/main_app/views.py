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
        street = self.request.query_params.get('street') if self.request.query_params.get('street') else ''
        area = self.request.query_params.get('area') if self.request.query_params.get('area') else ''
        locality = self.request.query_params.get('locality') if self.request.query_params.get('locality') else ''
        belonging = self.request.query_params.get('belonging') if self.request.query_params.get('belonging') else ''
        serviceability = self.request.query_params.get('serviceability')
        if serviceability == 'true' or serviceability == 'false':
            if self.request.query_params.get('serviceability') == "true":
                serviceability = True
            elif self.request.query_params.get('serviceability') == "false":
                serviceability = False
            queryset = Hydrant.objects.filter(address_district__icontains=area,
                                              address_detail__icontains=street,
                                              address_town__icontains=locality,
                                              belonging__icontains=belonging,
                                              serviceable=serviceability
                                              )
            return queryset

        queryset = Hydrant.objects.filter(address_district__icontains=area,
                                          address_detail__icontains=street,
                                          address_town__icontains=locality,
                                          belonging__icontains=belonging,
                                          )

        return queryset
