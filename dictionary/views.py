from django.http.response import JsonResponse
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponseRedirect
from django.urls import reverse
from .models import *
from django.contrib import messages
import json
from django.views.decorators.csrf import csrf_exempt

# Create your views here.


def index(request):
    return render(request, "dictionary/index.html")


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "dictionary/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "dictionary/login.html")


def logout_view(request):
    logout(request)
    messages.info(request, "You have successfully logged out.")
    return HttpResponseRedirect(reverse("login"))


def register(request):
    if request.method == "POST":
        first_name = request.POST["firstname"]
        last_name = request.POST["lastname"]
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "dictionary/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.first_name = first_name
            user.last_name = last_name
            user.save()
        except IntegrityError:
            return render(request, "dictionary/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "dictionary/register.html")


@csrf_exempt
def profile(request):
    user = User.objects.get(username=request.user)
    words = Word.objects.filter(user=user).order_by("word")
    
    if request.method == "POST":
        data = json.loads(request.body)
        word = data.get('word')
        phonetic = data.get('phonetics')
        sound = data.get('sound')
        partOfSpeech = data.get('partOfSpeech')
        definition = data.get('definition')
        synonyms = data.get('synonyms')
        example = data.get('example')
        language = data.get('languageToSend')

        send = Word(
            user = user,
            word = word,
            sound = sound,
            partOfSpeech = partOfSpeech,
            phonetic = phonetic,
            definition = definition,
            synonyms = synonyms,
            example = example,
            language = language
        )
        send.save()
        return JsonResponse({"message": "word saved successfully."}, status=201)
    else:
        return render(request, "dictionary/profile.html", {'user': user, 'words': words})


def remove_word(request, word_id):
    word = Word.objects.get(pk=word_id)
    word.delete()
    return HttpResponseRedirect(reverse('profile'))