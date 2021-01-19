from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name = "index"),
    path("login", views.loginUser, name = "login"),
    path("register", views.registerUser, name = "register"),
    path("logout", views.logOut, name = "logout"),
    path("getPost/<str:section>", views.getPost, name = "getPost"),
    path("postPost", views.postPost, name ="post")
    ]