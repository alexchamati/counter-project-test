from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from decimal import Decimal

from  app.counter.models import Counter
from  app.counter.api.counter.serializers import CounterSerializer

import json

@api_view(['POST'])
def api_operation(request):

	data_json = json.dumps(request.data)
	data = json.loads(data_json)
	number = data['value']
	operation = data['operation']

	last_counter = False
	try:
		last_counter = Counter.objects.latest('id')
	except:
		pass

	if last_counter != False:
		last_total = last_counter.total
	else:
		last_total = 0


	if operation == '+':
		total = last_total + Decimal(number)
	elif operation == '-':
		total = last_total - Decimal(number)
	elif operation == '/':
		total = last_total / Decimal(number)
	elif operation == 'x':
		total = last_total * Decimal(number)

	total = round(total, 2)
	
	counter = Counter()
	data = { 
		"success": "Operation Successful",
		"last_total": last_total,
		"number": number,
		"operation": operation,
		'total': total
	}

	serializer = CounterSerializer(counter, data=data)
	if serializer.is_valid():
		serializer.save()
		return Response(data=serializer.data, status=status.HTTP_201_CREATED)
	
	return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
