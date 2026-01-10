"""
Adds and a new app to an existing django project. Must be run from the root 
directory of the django project. It will make all necessary changes to both
settings.py and project.urls.py.
"""


import subprocess
import re
from pathlib import Path


###############################################################################
# Define necessary variables
###############################################################################
APP_NAME = 'test_app'
DJANGO_ROOT = Path('web')

###############################################################################
# Run django commands
###############################################################################
subprocess.run(['python3', 'manage.py', 'startapp', f'{APP_NAME}'])

###############################################################################
# Make necessary changes at project level
###############################################################################
def update_list(file_path, list_name, appended_value):
    """
    Opens the file and then finds the list and appends the given value
    to the end of the list before saving the file. 
    """
    file_text = file_path.read_text(encoding='utf-8')
    pattern = (
        rf'({list_name}\s*=\s*\[)'
        r'([\s\S]*?)'
        r'(\]\s*)'
    )
    # replacement = rf"\1\2    '{appended_value}',\n\3"
    result = re.sub(pattern, replacement, file_text, count=1)
    file_path.write_text(result, encoding='utf-8')

SETTINGS_PATH = DJANGO_ROOT.joinpath('project', 'settings.py')
URLS_PATH = DJANGO_ROOT.joinpath('project', 'urls.py')

# Add the app to settings.py
replacement = replacement = rf"\1\2    '{APP_NAME}',\n\3"
update_list(SETTINGS_PATH, 'INSTALLED_APPS', 'TEST_APP')

# Add the app to urls.py
path_value = f"path('{APP_NAME}/', include('{APP_NAME}.urls'))"
replacement = rf"\1\2    {path_value},\n\3"
update_list(URLS_PATH, 'urlpatterns', 'test')


###############################################################################
# Create necessary files and directories
###############################################################################
APP_PATH = DJANGO_ROOT.joinpath(APP_NAME)
TEMPLATES_PATH = APP_PATH.joinpath('templates', APP_NAME)
INDEX_PATH = TEMPLATES_PATH.joinpath('index.html')
STATIC_PATH = APP_PATH.joinpath('static', APP_NAME)
JS_PATH = STATIC_PATH.joinpath(f'{APP_NAME}.js')
CSS_PATH = STATIC_PATH.joinpath(f'{APP_NAME}.css')
APP_URLS_PATH = APP_PATH.joinpath('urls.py')
APP_VIEWS_PATH = APP_PATH.joinpath('views.py')

# Create the templates and static folders
TEMPLATES_PATH.mkdir(parents=True, exist_ok=True)
INDEX_PATH.touch()
STATIC_PATH.mkdir(parents=True, exist_ok=True)
JS_PATH.touch()
CSS_PATH.touch()

# Write the app urls.py file and add the base
APP_URLS_PATH.touch()
app_urls_text = f"""
from django.urls import path
from . import views
from account.decorators import conditional_login_required


app_name = '{APP_NAME}'

urlpatterns = [
    path('', conditional_login_required(views.index), name='index'),
]
"""
with open(APP_URLS_PATH, 'w') as file:
    file.write(app_urls_text)

# Create the index view in the new app views.py
app_views_text = f"""
from django.shortcuts import render
from .models import *


def index(request):
    context = {{}}
    return render(request, '{APP_NAME}/index.html', context)
"""
with open(APP_VIEWS_PATH, 'w') as file:
    file.write(app_views_text)

# Create the base html in index.html
html_text = f"""
{{% extends 'base.html' %}}
{{% load static %}}


<!-- Add the static files to the header block -->
{{% block header_extension %}}
<link rel="stylesheet" type="text/css" href='{{% static "{APP_NAME}/{APP_NAME}.css" %}}'>
<script type="text/javascript" src="{{% static '{APP_NAME}/{APP_NAME}.js' %}}"></script>
{{% endblock %}}


<!-- Add the index's content to the main header block -->
{{% block body_extension %}}

<p>{APP_NAME} page under construction.</p>

{{% endblock %}}
"""
with open(INDEX_PATH, 'w') as file:
    file.write(html_text)