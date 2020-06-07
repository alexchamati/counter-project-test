from django.urls import path

from app.counter.api.history.views import (
	api_get_last_total,
	api_get_all_history,
	api_delete_history_counter,
)

app_name = 'counter'

urlpatterns = [
	path('', api_get_all_history, name="all-history"),
	path('/last', api_get_last_total, name="last-counter"),
	path('/delete-all', api_delete_history_counter, name="delete"),
]
