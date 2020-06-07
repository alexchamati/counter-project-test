import os

if 'DJANGO_DEPLOYMENT_ENVIRONMENT' in os.environ:
    if os.environ['DJANGO_DEPLOYMENT_ENVIRONMENT'] == "development":
        print ("DJANGO: Development Server.")
        from .development_settings import *
else:
	print ("Django: Production Server.")
	from .production_settings import *

