from rest_framework import serializers
from .models import User, EmailVerification
from django.utils import timezone

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'date_joined', 'password']
        extra_kwargs = {
            'password' : {'write_only': True}
        }
        
    def validate(self, data):    
        password = data.get('password')
        if len(password) < 8:
            raise serializers.ValidationError({"password": "Password must be atleast 8 characters long"})  
        return data
    
    def create(self, validated_data):
        user = User(
            email = validated_data['email'], 
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class EmailVerificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailVerification
        fields = ["email", "otp", "created_at", "expired_at", "is_verified"]
        
    def create(self, validated_data):
        email_verification= EmailVerification.objects.update_or_create(
            email = validated_data['email'],
            defaults={
                'otp': validated_data['otp'],
                'expired_at': validated_data['expired_at'],
            }
        )
        return email_verification
        
    def verify_otp(self, email, otp):
        try:
            instance = EmailVerification.objects.get(email = email)
            if instance.otp == otp and instance.expired_at > timezone.now():
                instance.is_verified = True
                instance.save()
                return instance
            else:
                raise serializers.ValidationError("Invalid or Expired OTP")
        except EmailVerification.DoesNotExist:
            raise serializers.ValidationError("Email not found")