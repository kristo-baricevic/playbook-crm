from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    pass


class Organization(models.Model):
    name = models.CharField(max_length=255)
    owner = models.OneToOneField(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
