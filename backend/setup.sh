
python manage.py \
makemigrations \
counter
python manage.py \
migrate
uwsgi --chdir=./ \
    --module=app.wsgi:application \
    --env DJANGO_SETTINGS_MODULE=app.settings \
    --master \
	--pidfile=/tmp/project-master.pid \
    --socket=0.0.0.0:49152 \
    --processes=5 \
	--uid=www-data \
	--gid=www-data \
    --harakiri=20 \
    --max-requests=5000 \
    --vacuum
