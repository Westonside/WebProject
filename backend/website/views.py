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

    return render(request, "website/index.html")

def loginUser(request):
    
    if request.method == "POST":
        user_email = request.POST["email"]
        user_password = request.POST["password"]
        print(user_email, user_password)
        user = authenticate(request, username = user_email, password = user_password)
        
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
        
        firstName = request.POST["firstname"]
        lastName = request.POST["lastname"]
        # userName = request.POST["username"]
        email = request.POST["email"]
        passWord = request.POST["password"]

        try: 
            user = User.objects.create_user( username = email,email = email,password = passWord, first_name = firstName, last_name = lastName)
            user.save()
            login(request,user)
            return HttpResponseRedirect(reverse("index"))
        except IntegrityError:
            return HttpResponse("failure")
    
    elif request.method == "GET":
        return render(request, "website/register.html")



    
