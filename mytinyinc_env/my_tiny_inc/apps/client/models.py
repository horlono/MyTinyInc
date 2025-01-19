from django.contrib.auth.models import User
from django.db import models

class Client(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    

