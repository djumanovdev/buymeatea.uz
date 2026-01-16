import json

from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views import View
from django.http import HttpRequest, HttpResponse

from .main import handle_update


@method_decorator(csrf_exempt, name='dispatch')
class BotView(View):

    def post(self, request: HttpRequest) -> HttpResponse:
        update = json.loads(request.body.decode('utf-8'))
        handle_update(update)
        return HttpResponse('ok')
    