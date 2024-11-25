from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager, Group, Permission
from django.utils import timezone

# Create your models here.
class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)
    
class User(AbstractUser):
    email = models.EmailField(unique = True)
    username = None
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    groups = models.ManyToManyField(
        Group,
        related_name='customuser_groups',
        blank=True,
        help_text='The groups this user belongs to.'
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='customuser_permissions',
        blank=True,
        help_text='Specific permissions for this user.'
    )
    
    objects = CustomUserManager()
    
class EmailVerification(models.Model):
    email = models.EmailField(default='default@example.com')
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    expired_at = models.DateTimeField()
    is_verified = models.BooleanField(default=False)

class SocialMediaAccount(models.Model):
    PLATFORM_CHOICES = [
        ('facebook', 'Facebook'),
        ('instagram', 'Instagram'),
        ('youtube', 'YouTube'),
        # Add more platforms as needed...
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    platform = models.CharField(max_length=50, choices=PLATFORM_CHOICES)
    account_id = models.CharField(max_length=255)
    access_token = models.CharField(max_length=255)
    additional_info = models.JSONField(null=True, blank=True)

class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    platform = models.CharField(max_length=50)  # 'Instagram', 'YouTube', etc.
    post_id = models.CharField(max_length=100)  # ID returned by the platform's API
    title = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    video_url = models.URLField()  # URL of the uploaded video on the platform
    status = models.CharField(max_length=50)  # 'posted', 'scheduled', 'failed'
    scheduled_time = models.DateTimeField(null=True, blank=True)  # If scheduling is used
    created_at = models.DateTimeField(auto_now_add=True)
    
class ScheduledPost(models.Model):
    post = models.ForeignKey('Post', on_delete=models.CASCADE, related_name='scheduled_posts')
    scheduled_time = models.DateTimeField()
    status = models.CharField(max_length=50, choices=[('pending', 'Pending'), ('completed', 'Completed'), ('failed', 'Failed')], default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Scheduled Post: {self.post.title} for {self.scheduled_time}"

    def is_past_due(self):
        return self.scheduled_time <= timezone.now()
