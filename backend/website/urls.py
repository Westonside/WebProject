from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name = "index"),
    path("/login", views.login, name = "login"),
    path("/register", views.registerUser, name = "register"),
    path("/logout", views.logOut, name = "logout")
    ]