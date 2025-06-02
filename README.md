This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Reading Room - Next.js + Django Authentication Setup Guide

This guide will help you set up the authentication system for Reading Room using Next.js frontend and Django backend with dj-rest-auth and SimpleJWT.

## Backend Setup (Django)

1. Create a new Django project and install required packages:

```bash
# Create a new virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install required packages
pip install django djangorestframework django-cors-headers dj-rest-auth djangorestframework-simplejwt django-allauth django-allauth[google]

# Create requirements.txt
pip freeze > requirements.txt
```

2. Update Django settings (`settings.py`):

```python
INSTALLED_APPS = [
    # ...
    'rest_framework',
    'corsheaders',
    'dj_rest_auth',
    'django.contrib.sites',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Add this at the top
    # ... other middleware
]

# CORS settings
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # Next.js development server
]

# REST Framework settings
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}

# JWT settings
from datetime import timedelta
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': True,
}

# dj-rest-auth settings
REST_AUTH = {
    'USE_JWT': True,
    'JWT_AUTH_COOKIE': 'auth',
    'JWT_AUTH_REFRESH_COOKIE': 'refresh-auth',
}

# django-allauth settings
AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend',
]

SITE_ID = 1

# Google OAuth settings
SOCIALACCOUNT_PROVIDERS = {
    'google': {
        'APP': {
            'client_id': 'your-google-client-id',
            'secret': 'your-google-client-secret',
            'key': ''
        },
        'SCOPE': [
            'profile',
            'email',
        ],
        'AUTH_PARAMS': {
            'access_type': 'online',
        }
    }
}

# Email settings (for development)
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
```

3. Update URLs (`urls.py`):

```python
from django.contrib import admin
from django.urls import path, include
from dj_rest_auth.views import LoginView, LogoutView
from dj_rest_auth.registration.views import RegisterView
from allauth.socialaccount.views import signup

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/login/', LoginView.as_view(), name='rest_login'),
    path('api/auth/logout/', LogoutView.as_view(), name='rest_logout'),
    path('api/auth/register/', RegisterView.as_view(), name='rest_register'),
    path('api/auth/google/', signup, name='google_login'),
    path('api/auth/google/callback/', signup, name='google_callback'),
]
```

4. Create a custom user model (optional but recommended):

```python
# users/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    profile_picture = models.URLField(blank=True)
    bio = models.TextField(blank=True)
    # Add any additional fields you need
```

5. Update settings to use custom user model:

```python
# settings.py
AUTH_USER_MODEL = 'users.CustomUser'
```

## Frontend Setup (Next.js)

The frontend is already set up with the following components:

1. Authentication Context (`lib/auth-context.tsx`)
2. API Client (`lib/api.ts`)
3. Auth Service (`lib/auth.ts`)
4. Google OAuth Callback (`app/auth/google-callback/page.tsx`)

### Environment Variables

Create a `.env.local` file in your Next.js project root:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

### Google OAuth Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable the Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:8000/api/auth/google/callback/` (Django)
   - `http://localhost:3000/auth/google-callback` (Next.js)
6. Copy the client ID and secret to your Django settings

## Testing the Setup

1. Start the Django development server:

```bash
python manage.py migrate
python manage.py runserver
```

2. Start the Next.js development server:

```bash
npm run dev
```

3. Test the authentication flow:
   - Register a new user
   - Login with email/password
   - Login with Google
   - Test protected routes
   - Test token refresh
   - Test logout

## Security Considerations

1. Always use HTTPS in production
2. Set appropriate CORS settings for production
3. Use secure cookie settings in production
4. Implement rate limiting
5. Add CSRF protection
6. Use environment variables for sensitive data
7. Implement proper error handling
8. Add request validation
9. Set up proper logging

## Additional Resources

- [Django REST framework documentation](https://www.django-rest-framework.org/)
- [dj-rest-auth documentation](https://dj-rest-auth.readthedocs.io/)
- [SimpleJWT documentation](https://django-rest-framework-simplejwt.readthedocs.io/)
- [django-allauth documentation](https://django-allauth.readthedocs.io/)
- [Next.js documentation](https://nextjs.org/docs)
- [NextAuth.js documentation](https://next-auth.js.org/)
