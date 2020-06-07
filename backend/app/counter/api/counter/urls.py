from django.urls import path

from app.counter.api.counter.views import (
	api_operation,
)

app_name = 'counter'

urlpatterns = [
	path('', api_operation, name="counter"),
]
