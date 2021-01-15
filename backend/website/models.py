from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    pass

class Post(models.Model):
    user = models.ForeignKey('User', on_delete = models.CASCADE)
    title = models.TextField(blank=True)
    content = models.TextField(blank = True)
    timestamp = models.DateTimeField(auto_now_add=True)
    tags = models.TextField(blank=True)
    
    def __str__(self):
        return(f"{self.user} posted {self.title}: {self.content}")

    def serialize(self,request):
        liked = Likes.objects.filter(postId=self.pk, likeUser = request.user, liked=True).first()
        return{
            "user": self.user,
            "title": self.title,
            "content": self.conent,
            "tags": self.tags,
            "likes": Likes.objects.filter(post_id=self.pk, liked=True).count(),
            "timestamp": self.timestamp.strftime("%b %-d %Y, %-I:%M %p"),
            "liked": False if liked is None else True if liked.liked is True else False
            }

class Likes(models.Model):
    post_id = models.ForeignKey('Post', on_delete = models.CASCADE)
    like_user = models.ForeignKey('User', on_delete = models.CASCADE)
    liked = models.BooleanField(default=False)
            
    def __str__(self):
        return(f"{self.like_user} liked = {self.liked} the post {self.post_id}")


class comment(models.Model):
    post_id = models.ForeignKey('Post', on_delete = models.CASCADE)
    comment_user = models.ForeignKey('User', on_delete = models.CASCADE)
    content = models.TextField(blank = True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return(f"{self.comment_user} commented on {self.post_id}: {self.content} at {self.timestamp}")

    def serialize(self,request):
        return{
            "post_id": self.post_id,
            "comment_user": self.comment_user,
            "content": self.content,
            "timestamp": self.timestamp.strftime("%b %-d %Y, %-I:%M %p"),
            "can_edit": True if self.comment_user == request.user else False
            
        }



