from django.db import models

# Create your models here.
class Counter(models.Model):
	last_total = models.DecimalField(max_digits=19, decimal_places=2, default=0)
	number = models.DecimalField(max_digits=19, decimal_places=2, default=0)
	operation = models.CharField(max_length=1, blank=True, default='')
	total = models.DecimalField(max_digits=19, decimal_places=2, default=0)

	class Meta:
		ordering = ['id']
