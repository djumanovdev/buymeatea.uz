from django.urls import path

from .views import (
    home_view,
    user_info_view,
    donate_view
)


urlpatterns = [
    path('', home_view, name='home'),
    path('/creators/<str:username>', user_info_view, name='user_info'),
    path('/donate', donate_view, name='donate'),
]
