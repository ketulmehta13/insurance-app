# project urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/v1/', include('api.urls')),
    path('api/v1/accounts/', include('accounts.urls')),  
    path('client/', include('client.urls')),
    path('policy/', include('policy.urls')),
    path('agent/', include('agent.urls')),
    path('insurance_app/', include('insurance_app.urls')),
    path('dashboard/', include('dashboard.urls')),
    path('inquiry/', include('inquiry.urls')),
    path('notifications/', include('notification.urls')),

    
    ]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
