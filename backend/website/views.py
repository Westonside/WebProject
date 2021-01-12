from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.urls import reverse
from .models import User
from django.db import IntegrityError

# Create your views here.

def index(request):
    if request.user.is_anonymous:
        return HttpResponseRedirect(reverse("login"))

    return HttpResponse("The user logged")

def login(request):
    
    if request.method == "POST":
        userEmail = request.POST["email"]
        passWord = request.POST["password"]

        user = authenticate(request, email = userEmail, password = passWord)

        if user is not None:
            login(request,user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return HttpResponse("invalid user")
    else:
        return render(request, "website/login.html")

def logOut(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def registerUser(request):
    if request.method == "POST":
        userName = request.POST["firstname"]
        lastName = request.post["lastname"]
        userName = request.POST["username"]
        email = request.POST["email"]
        passWord = request.POST["password"]

        try:
            user = User.objects.create_user(userName, email, passWord)
            user.save()
            login(request, user)
            return HttpResponse("username taken")
        except IntegrityError:
            return HttpResponseRedirect(reverse("index"))
    
    elif request.method == "GET":
        return render(request, "website/login.html")



    
