from django.urls import path

from app.counter.api.counter_views import (
	api_operation,
)

from app.counter.api.history_views import (
	api_get_last_total,
	api_get_all_history,
	api_delete_history_counter,
)

app_name = 'counter'

urlpatterns = [
	path('/counter', api_operation, name="counter"),

	path('/history', api_get_all_history, name="all-history"),
	path('/history/last', api_get_last_total, name="last-total"),
	path('/history/delete-all', api_delete_history_counter, name="delete-history"),
]
