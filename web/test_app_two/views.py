
from django.shortcuts import render
from .models import *


def index(request):
    context = {}
    return render(request, 'test_app_two/index.html', context)
