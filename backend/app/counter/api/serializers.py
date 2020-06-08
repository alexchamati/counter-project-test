from rest_framework import serializers

from app.counter.models import Counter

class CounterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Counter
        fields = ['id', 'last_total', 'number', 'operation', 'total']
