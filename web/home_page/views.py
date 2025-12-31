from django.shortcuts import render
from .forms import *
from .models import *
from account.decorators import conditional_login_required


@conditional_login_required
def index(request):
    context = {}
    return render(request, 'home_page/index.html', context)