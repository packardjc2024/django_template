from django.db import models

default_message = (
    "Hello Jeremy,"
    "\n\nI'd like to schedule an interview with you...\n\n"
)

# Create your models here.
class Contact(models.Model):
    first_name = models.CharField(blank=False, null=False)
    last_name = models.CharField(blank=False, null=False)
    phone_number = models.CharField(blank=True, null=True)
    email = models.EmailField(blank=False, null=False)
    comments = models.TextField(blank=False, null=False, default=default_message)