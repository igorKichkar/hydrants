from rest_framework import viewsets
from .models import Hydrant
from .serializers import HydrantSerializer
# Download module
# Import mimetypes module
import mimetypes
# import os module
import os
# Import HttpResponse module
from django.http.response import HttpResponse
import xlsxwriter


def filter_queryset(obj):
    street = obj.get('street') if obj.get('street') else ''
    area = obj.get('area') if obj.get('area') else ''
    locality = obj.get('locality') if obj.get('locality') else ''
    belonging = obj.get('belonging') if obj.get('belonging') else ''
    serviceable = obj.get('serviceable')
    if serviceable == 'true' or serviceable == 'false':
        if obj.get('serviceable') == "true":
            serviceable = True
        elif obj.get('serviceable') == "false":
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


def download_exel_report(request):
    hydrants = filter_queryset(request.GET)
    # Create a workbook and add a worksheet.
    workbook = xlsxwriter.Workbook('exel_reports/hello.xlsx')
    worksheet = workbook.add_worksheet()

    row = 1
    col = 0

    for hydrant in hydrants:
        worksheet.write(row, col, hydrant.id)
        worksheet.write(row, col + 1, hydrant.belonging)
        row += 1

    workbook.close()

    # hydrants = filter_queryset(request.GET)
    # print(hydrants[0])
    # print(request.GET.get('klklk'))
    # Define Django project base directory
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    # Define text file name
    filename = 'hello.xlsx'
    # Define the full file path
    filepath = BASE_DIR + '/exel_reports/' + filename
    # Open the file for reading content
    path = open(filepath, 'rb')
    # Set the mime type
    mime_type, _ = mimetypes.guess_type(filepath)
    # Set the return value of the HttpResponse
    response = HttpResponse(path, content_type=mime_type)
    # Set the HTTP header for sending to browser
    response['Content-Disposition'] = "attachment; filename=%s" % filename
    # Return the response value

    return response


class HydrantViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows hydrants to be viewed or edited.
    """
    queryset = Hydrant.objects.all()
    serializer_class = HydrantSerializer

    def get_queryset(self):
        # print(self.request.query_params)
        # street = self.request.query_params.get('street') if self.request.query_params.get('street') else ''
        # area = self.request.query_params.get('area') if self.request.query_params.get('area') else ''
        # locality = self.request.query_params.get('locality') if self.request.query_params.get('locality') else ''
        # belonging = self.request.query_params.get('belonging') if self.request.query_params.get('belonging') else ''
        # serviceable = self.request.query_params.get('serviceable')
        # if serviceable == 'true' or serviceable == 'false':
        #     if self.request.query_params.get('serviceable') == "true":
        #         serviceable = True
        #     elif self.request.query_params.get('serviceable') == "false":
        #         serviceable = False
        #     queryset = Hydrant.objects.filter(address_district__icontains=area,
        #                                       address_detail__icontains=street,
        #                                       address_town__icontains=locality,
        #                                       belonging__icontains=belonging,
        #                                       serviceable=serviceable
        #                                       )
        #     return queryset
        #
        # queryset = Hydrant.objects.filter(address_district__icontains=area,
        #                                   address_detail__icontains=street,
        #                                   address_town__icontains=locality,
        #                                   belonging__icontains=belonging,
        #                                   )
        #
        # return queryset
        return filter_queryset(self.request.query_params)
