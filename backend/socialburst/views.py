from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.middleware.csrf import get_token
from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone
from .serializers import EmailVerificationSerializer, UserSerializer
from .models import EmailVerification, User
import numpy as np
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

# Create your views here.

def get_tokens_for_user(user):
    """
    Generate refresh and access tokens for a user.
    """
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


@api_view(["GET"])
def get_csrf_token(request):
    # Get CSRF token
    csrf_token = get_token(request)
    # Return CSRF token as JSON response
    return Response({'csrfToken': csrf_token})

def generate_otp():
    otp = np.random.choice(range(10), size = 6)
    otp_str = ""
    for i in range(6):
        otp_str += str(otp[i])
    return otp_str

def send_otp_email(email, otp):
    subject = "OTP Code for SocialBurst Email Verification"
    message = f"Your OTP code is {otp} for SocialBurst email verification. It is valid for 4 minutes."
    from_email = settings.EMAIL_HOST_USER
    recipient_list = [email]
    send_mail(subject, message, from_email, recipient_list)
    
@api_view(["POST"])
def send_otp(request):
    data = request.data
    email = data.get('email')
    
    otp = generate_otp()
    expired_at = timezone.now() + timezone.timedelta(minutes = 4)
    email_verification_serializer = EmailVerificationSerializer(data = {"email" : email, "otp" : otp, "expired_at" : expired_at})
    if email_verification_serializer.is_valid():
        email_verification_serializer.save()
        send_otp_email(email, otp)
        return Response({"success": "otp sent successfully"}, status=status.HTTP_200_OK)
    return Response(email_verification_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
def verify_otp(request):
    data = request.data
    email = data.get('email')
    otp = data.get('otp')
    
    email_verification_serializer = EmailVerificationSerializer()
    
    try:
        verified_instance = email_verification_serializer.verify_otp(email= email, otp = otp)
        return Response({'success' : "otp verified successfully"}, status=status.HTTP_200_OK)
    except serializers.ValidationError as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(["POST"])
def register(request):
    data = request.data
    try:
        email_verification = EmailVerification.objects.get(email=data.get('email'))
        if not email_verification.is_verified:
            return Response({"email": "Not verified"}, status=status.HTTP_400_BAD_REQUEST)
    except EmailVerification.DoesNotExist:
        return Response({"email": "Not verified"}, status=status.HTTP_400_BAD_REQUEST)
    
    user_serializer = UserSerializer(data = data)
    if user_serializer.is_valid():
        user = user_serializer.save()  # Save the user and get the instance
        tokens = get_tokens_for_user(user)  # Generate JWT tokens
        user_data = user_serializer.data
        
        # Add tokens to the response data
        user_data['tokens'] = tokens
        return Response(user_data, status=status.HTTP_201_CREATED)
    
    return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
def login(request):
    data = request.data
    email = data.get('email')
    password = data.get('password')
    
    try:
        user = User.objects.get(email=email)
        if not user.check_password(password):
            return Response({"error": "Invalid password"}, status=status.HTTP_400_BAD_REQUEST)
        
        tokens = get_tokens_for_user(user)
        user_data = UserSerializer(user).data
        user_data['tokens'] = tokens
        return Response(user_data, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({"error": "User does not exist"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def logout(request):
        refresh_token = request.data.get("refresh")
        if not refresh_token:
            return Response({"error": "Refresh token is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            token = RefreshToken(refresh_token)
            token.blacklist()  # Blacklist the refresh token
            return Response({"success": "Logged out successfully"}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"error": "Invalid or already blacklisted token"}, status=status.HTTP_400_BAD_REQUEST)