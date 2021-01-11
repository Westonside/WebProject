from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse

from .models import User

# Create your views here.
def index(request):
    return render(request, "website/login.html")
