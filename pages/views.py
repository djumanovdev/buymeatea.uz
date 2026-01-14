from django.shortcuts import render
from django.http import HttpRequest, HttpResponse


def home_view(request: HttpRequest) -> HttpResponse:
    return render(request, 'home.html')


def user_info_view(request: HttpRequest, username: str) -> HttpResponse:
    context = {
        'user': {
            'id': 1,
            'username': 'alijon',
            'first_name': 'Ali',
            'last_name': 'Valiyev',
            'bio': 'a software engineer from Uzbekistan.',
        }
    }
    return render(request, 'user_info.html', context)


def donate_view(request: HttpRequest) -> HttpResponse:
    if request.method == 'POST':
        # feat

        return render(request, 'donate.html')
    
    return render(request, 'home.html')
