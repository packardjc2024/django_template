from django.shortcuts import render
from .forms import *
from .models import *


def index(request):
    context = {}
    return render(request, 'home_page/index.html', context)