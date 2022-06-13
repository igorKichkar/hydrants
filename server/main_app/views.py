import os
import mimetypes
import xlsxwriter

from django.http.response import HttpResponse

from rest_framework import viewsets

from .models import Hydrant
from .serializers import HydrantSerializer


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
    # get queryset hydrants
    hydrants = filter_queryset(request.GET)
    # create exel file
    workbook = xlsxwriter.Workbook('exel_reports/hello.xlsx')
    worksheet = workbook.add_worksheet()

    row = 1
    cell_format = workbook.add_format({'bold': True, 'border': True})
    cell_format.set_align('center')
    cell_format.set_align('vcenter')

    cell_format_context = workbook.add_format()
    cell_format_context.set_align('center')
    cell_format_context.set_align('vcenter')

    cell_format.set_font_size(11)
    worksheet.set_column('A:A', 10)
    worksheet.set_column('B:B', 30)
    worksheet.set_column('C:C', 50)
    worksheet.set_column('D:D', 50)
    worksheet.set_column('E:E', 20)
    worksheet.set_column('F:F', 40)
    worksheet.set_column('G:G', 20)
    worksheet.set_column('H:H', 30)
    worksheet.set_column('I:I', 20)
    worksheet.set_column('J:J', 30)
    worksheet.set_column('K:K', 33)
    worksheet.set_column('L:L', 30)
    worksheet.set_column('M:M', 20)
    worksheet.set_column('N:N', 20)
    worksheet.set_column('O:O', 20)
    worksheet.set_column('P:P', 30)
    worksheet.set_column('Q:Q', 30)
    worksheet.set_row(0, 70)
    worksheet.set_row(0, 70)

    worksheet.write(0, 0, '№ п/п', cell_format)
    worksheet.write(0, 1, 'Наименование', cell_format)
    worksheet.write(0, 2, 'Адрес', cell_format)
    worksheet.write(0, 3, 'Дополнительная информация по адресу', cell_format)
    worksheet.write(0, 4, 'Номер', cell_format)
    worksheet.write(0, 5, 'Тип сети, диаметр, объем', cell_format)
    worksheet.write(0, 6, 'Техническое\n состояние', cell_format)
    worksheet.write(0, 7, 'Характер нисправности', cell_format)
    worksheet.write(0, 8, 'Дата последней\n проверки', cell_format)
    worksheet.write(0, 9, 'Принадлежность', cell_format)
    worksheet.write(0, 10, 'Координаты (широта, долгота)', cell_format)
    worksheet.write(0, 11, 'Место нахождения таблички', cell_format)
    worksheet.write(0, 12, 'Расстояние от\n таблички прямо', cell_format)
    worksheet.write(0, 13, 'Расстояние от\n таблички вправо', cell_format)
    worksheet.write(0, 14, 'Расстояние от\n таблички влево', cell_format)
    worksheet.write(0, 15, 'Описание', cell_format)
    worksheet.write(0, 16, 'Примечание', cell_format)

    for hydrant in hydrants:
        worksheet.set_row(row, 25, cell_format_context)
        worksheet.write(row, 0, hydrant.id)
        worksheet.write(row, 1, hydrant.type)
        worksheet.write(row, 2,
                        f'{hydrant.address_region} область, {hydrant.address_district} район, г.{hydrant.address_town}')
        worksheet.write(row, 3, hydrant.address_detail)
        worksheet.write(row, 4, hydrant.number_in_map)
        worksheet.write(row, 5, f"Тип сети: {hydrant.type_of_water_supply}\n Диаметр: {hydrant.diameter_drain}")
        worksheet.write(row, 6, f"{'Исправен' if hydrant.serviceable else 'Не исправеn'  }")
        worksheet.write(row, 7, hydrant.fault_type)
        worksheet.write(row, 8, hydrant.date_last_check)
        worksheet.write(row, 9, hydrant.belonging)
        worksheet.write(row, 10, f"{hydrant.coordinate_width} {hydrant.coordinate_height}")
        worksheet.write(row, 11, hydrant.place_plate)
        worksheet.write(row, 12, hydrant.distance_front)
        worksheet.write(row, 13, hydrant.distance_right)
        worksheet.write(row, 14, hydrant.distance_left)
        worksheet.write(row, 15, hydrant.description)
        worksheet.write(row, 16, hydrant.note)
        row += 1
    workbook.close()

    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    filename = 'hello.xlsx'
    filepath = BASE_DIR + '/exel_reports/' + filename
    path = open(filepath, 'rb')
    mime_type, _ = mimetypes.guess_type(filepath)
    response = HttpResponse(path, content_type=mime_type)
    response['Content-Disposition'] = "attachment; filename=%s" % filename

    return response


class HydrantViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows hydrants to be viewed or edited.
    """
    queryset = Hydrant.objects.all()
    serializer_class = HydrantSerializer

    def get_queryset(self):
        return filter_queryset(self.request.query_params)
