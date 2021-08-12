from django.db import models
from django.contrib.auth.models import AbstractUser,User
from django.db.models.deletion import CASCADE

# Create your models here.


class User(AbstractUser):
    pass


class Word(models.Model):
    user = models.ForeignKey(User, on_delete=CASCADE, related_name="user")
    word = models.CharField(max_length=20, null=True)
    phonetic = models.CharField(max_length=20,null=True)
    partOfSpeech = models.CharField(max_length=20,null=True)
    definition = models.CharField(max_length=400,null=True)
    example = models.CharField(max_length=200,null=True)
    synonyms = models.CharField(max_length=400,null=True)
    sound = models.URLField(null=True)
    language = models.CharField(max_length=15, null=True)