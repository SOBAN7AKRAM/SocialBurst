from django.urls import path
from . import views
# from .views import FacebookLoginView, FacebookCallbackView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("token", TokenObtainPairView.as_view(), name="token_obtain_pair"),  
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path('get-csrf-token', views.get_csrf_token, name='get_csrf_token'),
    path('send-otp', views.send_otp, name='send_otp'),
    path('verify-otp', views.verify_otp, name='verify_otp'),
    path('register', views.register, name='register'),
    path('login', views.login, name='login'),
    path('logout', views.logout, name='logout'),
    path('auth/facebook/login/', views.FacebookLoginView.as_view(), name='facebook-login'),
    path('auth/facebook/callback/', views.FacebookCallbackView.as_view(), name='facebook-callback'),
   
]