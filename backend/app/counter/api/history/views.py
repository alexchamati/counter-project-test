from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from  app.counter.models import Counter
from  app.counter.api.counter.serializers import CounterSerializer

@api_view(['GET'])
def api_get_all_history(request):
	try:
		all_history = Counter.objects.all()
	except Counter.DoesNotExist:
			return Response(0)

	serializer = CounterSerializer(all_history, many=True)
	return Response(data=serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def api_get_last_total(request):

	last_counter = False
	try:
		last_counter = Counter.objects.latest('id')
		serializer = CounterSerializer(last_counter)
		return Response(data=serializer.data, status=status.HTTP_200_OK)
	except:
		data = Counter()
		serializer = CounterSerializer(data)
		return Response(data=serializer.data, status=status.HTTP_200_OK)

	return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def api_delete_history_counter(request):

	try:
		historic_counter = Counter.objects.all()
	except:
		historic_counter = 0

	operation_success = historic_counter.delete()
	data = {}
	if operation_success:
		data['success'] = "delete all successful"
	else:
		data['success'] = "delete all failed"
	
	return Response(data=data)
