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
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    platform = models.CharField(max_length=50, choices=PLATFORM_CHOICES)
    account_id = models.CharField(max_length=255)
    access_token = models.CharField(max_length=255)
    refresh_token = models.CharField(max_length=255, null=True, blank=True)  # Optional
    expires_at = models.DateTimeField(null=True, blank=True)  # Track token expiry
    additional_info = models.JSONField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.username} - {self.platform}"

class FacebookPage(models.Model):
    social_account = models.ForeignKey(SocialMediaAccount, on_delete=models.CASCADE, related_name='pages')
    page_id = models.CharField(max_length=255)  # Unique page ID from Facebook API
    page_name = models.CharField(max_length=255)  # Page name
    page_access_token = models.CharField(max_length=255)  # Token specific to the page
    created_at = models.DateTimeField(auto_now_add=True)
    
class FacebookGroup(models.Model):
    social_account = models.ForeignKey(SocialMediaAccount, on_delete=models.CASCADE, related_name='groups')
    group_id = models.CharField(max_length=255)  # Unique group ID from Facebook API
    group_name = models.CharField(max_length=255)  # Group name
    created_at = models.DateTimeField(auto_now_add=True)


class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    social_account = models.ForeignKey(SocialMediaAccount, on_delete=models.CASCADE, related_name='posts')
    post_id = models.CharField(max_length=100, null=True, blank=True)  # For API-generated IDs
    title = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    video_url = models.URLField()
    media_url = models.URLField(null=True, blank=True)  # Optional for additional media
    status = models.CharField(
        max_length=50,
        choices=[('posted', 'Posted'), ('scheduled', 'Scheduled'), ('failed', 'Failed')],
        default='scheduled'
    )
    scheduled_time = models.DateTimeField(null=True, blank=True)  # This can be None if it's not scheduled
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Post: {self.title} ({self.status})"

    def is_past_due(self):
        # Check if the post's scheduled time has passed
        return self.scheduled_time and self.scheduled_time <= timezone.now()

    def schedule_post(self, scheduled_time):
        """Set a post to be scheduled at a specific time."""
        self.scheduled_time = scheduled_time
        self.status = 'scheduled'
        self.save()

    def mark_as_posted(self):
        """Mark the post as successfully posted."""
        self.status = 'posted'
        self.save()

    def mark_as_failed(self, reason=None):
        """Mark the post as failed and log the reason."""
        self.status = 'failed'
        self.save()
        # Optionally log the failure reason, if applicable
        


