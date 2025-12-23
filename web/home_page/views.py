from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from .forms import *
from .models import *
from pathlib import Path
from django.conf import settings
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

# Create your views here.
def index(request):
    context = {}
    context['form_submitted'] = False

    # About Section cards
    context['about_cards'] = []
    about_cards = [
        {
        'header': 'Goals',
        'text': (
            "<p>I am seeking a career as a full-stack software engineer; "
            "however, I am also open to a career focused on the back-end. "
            "The focus of my studies has been a Python-based stack; however, "
            "I am open to and enjoy learning new languages. I am especially "
            "interested in learning more C/C++.</p>"
        )
        },
        {
            'header': 'Work Experience',
            'text': (
                "<ul><li>2 years - Teaching English as a second language</li>"
                "<li>5 years - Helped start and run a tourism business</li>"
                "<li>5 years - Firefighter/EMT</li>"
                "<li>4 months - Technical Services Analyst (SQL)</li></ul>"
            )
        },
        {
            'header': 'Education',
            'text': (
                "<ul><li>B.A International Studies</li>"
                "<li>Software Developer Using Python - Community College "
                "non-degree career course</li>"
                "<li>Certiport IT Specialist in Python</li>"
                "<li>Certifport IT specialist in Databases</li>"
                "<li>1 1/2 years programming full-time self-study</li>"
            )
        }
    ]
    for about in about_cards:
        name = about['header'].lower().replace(' ', '-')
        context['about_cards'].append({
            'header': about['header'],
            'text': about['text'],
            'card_id': name,
            'parent_id': f'{name}-card',
            'front_id': f'{name}-front',
            'back_id': f'{name}-back',
        })

    # Skills section cards
    context['skills'] = []
    skills = [
        'Front End',
        'Back End',
        'Web Based',
        'Misc',
    ]
    for skill in skills:
        name = skill.lower().replace(' ', '-')
        temp_dict = {
            'header': skill,
            'card_id': name,
            'front_id': f'{name}-front',
            'back_id': f'{name}-back',
        }
        logos_path = Path.joinpath(Path(settings.BASE_DIR, 'static', 'logos', f'{skill.lower().replace(' ', '_')}'))
        logos = [name for name in os.listdir(logos_path) if name.endswith('.png')]
        temp_dict['logos'] = [f"static/logos/{skill.lower().replace(' ', '_')}/{logo}" for logo in logos]
        context['skills'].append(temp_dict)
    
    # Project section cards
    context['projects'] = [
        {
        'name': 'Portfolio',
        'img_url': 'site_pictures/portfolio_screenshot.png',
        'text': (
            "This project was created using Python's Django "
            "framework and PostgreSQL in Docker containers. "
            "It is running on an Ubuntu server using Nginx."
        ),
        'github_link': 'https://github.com/packardjc2024/docker_portfolio',
        'project_link': "#",
        'alt': 'Portofolio Screenshot',
        },
        {
        'name': "Docker Setup",
        'img_url': 'site_pictures/docker_setup_screenshot.png',
        'text': (
            "This app automates setting up a new Django/Postgres "
            "dockerized app. All you have to do is enter in the secrets "
            "necessary for the app and the app will encrypt the secrets, "
            "create the Django, Postgres database, and docker files all "
            "for you. Spinning up a new dockerized app only takes seconds!"
        ),
        'github_link': 'https://github.com/packardjc2024/docker_setup',
        'project_link': False,
        'alt': 'Docker Setup Screenshot',
        },
        {
        'name': "CSVQL",
        'img_url': '/site_pictures/csvql.png',
        'text': (
            "Coming Soon..."
        ),
        'github_link': '',
        'project_link': '',
        'alt': 'CSVQL Screenshot',
        },
    ]

    # Handle requestes and serve html files
    if request.method == 'GET':
        context['contact_form'] = ContactForm()
    elif request.method == 'POST':
        load_dotenv()
        contact_form = ContactForm(request.POST)
        if contact_form.is_valid():
            # Process the form
            data = contact_form.cleaned_data
            contact_form.save()
            # Send an email
            sender = settings.EMAIL_HOST_USER
            recipient = settings.EMAIL_HOST_USER
            host = settings.EMAIL_HOST
            port = settings.EMAIL_PORT
            password = settings.EMAIL_HOST_PASSWORD
            server = smtplib.SMTP(host, port)
            server.starttls()
            server.login(sender, password)
            message = MIMEMultipart()
            message['From'] = sender
            message['To'] = recipient
            message['Subject'] = 'Contact Form Submitted'
            body = (
                f'From: {data['first_name']} {data['last_name']}\n'
                f'Email: {data['email']}\n'
                f'Phone Number: {data['phone_number']}\n\n'
                f'Comments: {data['comments']}'
            )
            message.attach(MIMEText(body, 'plain'))
            server.sendmail(sender, recipient, message.as_string())
            server.quit()
            context['form_submitted'] = True
        else:
            context['context_form'] = contact_form
    return render(request, 'home_page/index.html', context)