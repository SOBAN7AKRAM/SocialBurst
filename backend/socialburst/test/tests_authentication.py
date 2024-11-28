from django.urls import reverse
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.test import APITestCase, APIClient
from ..models import User, EmailVerification
from unittest.mock import patch
from django.utils import timezone

class UserSignUpTests(APITestCase):
    def setUp(self):
        self.url = reverse('register')
        self.data = {
            'email': 'john.doe@example.com',
            'password': 'testpassword123',
        }
        
    def test_signup(self):
        email_verif_succ = EmailVerification.objects.create(
            email = 'john.doe@example.com',
            otp = '123456',
            expired_at = timezone.now(),
            is_verified = True
            )
        response = self.client.post(self.url, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().email, 'john.doe@example.com')
    
    def test_signup_duplicate_email(self):
        User.objects.create_user(email='john.doe@example.com', password='testpassword123')
        response = self.client.post(self.url, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

       
    def test_signup_short_password(self):
        # Test signup with a short password
        email_verif_succ = EmailVerification.objects.create(
            email = 'john.doe@example.com',
            otp = '123456',
            expired_at = timezone.now(),
            is_verified = True
            )
        data = {
            'email': 'john.doe@example.com',
            'password': 'short',
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("password", response.data)
        

class SendOtpTests(APITestCase):
    def setUp(self):
        self.url = reverse("send_otp")
    
    @patch('socialburst.views.generate_otp', return_value = "123456")
    @patch("socialburst.views.send_otp_email")
    
    def test_send_otp_success(self, mock_send_otp_email, mock_generate_otp):
        data = {
            'email': 'msobanakram7@gmail.com',
        }
        response = self.client.post(self.url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(EmailVerification.objects.filter(email='msobanakram7@gmail.com').exists())
        self.assertEqual(EmailVerification.objects.filter(email='msobanakram7@gmail.com').count(), 1)

        # Second request to resend OTP
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(EmailVerification.objects.filter(email='msobanakram7@gmail.com').count(), 1)
        self.assertEqual(mock_generate_otp.call_count, 2)
        self.assertEqual(mock_send_otp_email.call_count, 2)
        
class VerifyOtpTests(APITestCase):
    def setUp(self):
        self.url = reverse('verify_otp')
        self.email_verification = EmailVerification.objects.create(
            email = "msobanakram7@gmail.com", 
            otp = "123456", 
            expired_at = timezone.now() + timezone.timedelta(minutes=2)
            )
        
    def test_verify_otp_success(self):
        data = {
            "email" : "msobanakram7@gmail.com",
            "otp" : "123456"
        }
        response = self.client.post(self.url, data, format='json')
        em_v = EmailVerification.objects.get(email = data['email'])
        self.assertEqual(em_v.is_verified, True)
        
    def test_verify_otp_failure(self):
        data = {
            "email" : "msobanakram7@gmail.com",
            "otp" : "123458"
        }
        response = self.client.post(self.url, data, format='json')
        em_v = EmailVerification.objects.get(email = data['email'])
        self.assertEqual(em_v.is_verified, False)

class SignInTests(APITestCase):
    
    def setUp(self):
        self.url = reverse("login")
        self.user = User(email='testuser@example.com')
        self.user.set_password('testpassword')
        self.user.save()
    
    def test_success_signIn_freelancer(self):
        data = {
            "email" : 'testuser@example.com',
            "password" : 'testpassword'
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    def test_failure(self):
        data = {
            "email" : 'testuser@example.com',
            "password" : 'test'
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
class LogoutTestCase(APITestCase):

    def setUp(self):
        self.url = reverse("logout")  # Ensure this points to your logout endpoint
        # Create a user
        self.user = User.objects.create_user(email='testuser@example.com', password='testpassword')

        # Generate refresh and access tokens
        refresh = RefreshToken.for_user(self.user)
        self.refresh_token = str(refresh)
        self.access_token = str(refresh.access_token)

        # Set up the client with the access token
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')

    def test_logout_success(self):
        """Test that a user can log out successfully."""
        # Send the refresh token for logout
        response = self.client.post(self.url, data={"refresh": self.refresh_token})
        self.assertEqual(response.status_code, status.HTTP_205_RESET_CONTENT)
        self.assertEqual(response.data, {"success": "Logged out successfully"})

    def test_logout_without_token(self):
        """Test logout without sending a refresh token."""
        # Clear the credentials
        self.client.credentials()
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {"error": "Refresh token is required"})