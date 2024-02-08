#!/bin/bash


sleep 6s
# Check if migrations need to be applied
python manage.py showmigrations | grep -q "0 "  # Checks if there are 0 unapplied migrations
MIGRATION_STATUS=$?

# Apply migrations if needed
if [ $MIGRATION_STATUS -ne 0 ]; then
    echo "Applying migrations..."
    python manage.py migrate
fi

#echo "running celery"
#celery -A djangoProject worker --loglevel=info &
# Start the Django development server
echo "Starting Django development server..."

taskiq worker -fsd taskiq_matrix.instance:broker &

#python kiq worker -fsd taskiq_matrix.instance:broker
#anage.py runserver 0.0.0.0:8000
uvicorn djangoProject.asgi:application --host 0.0.0.0 --port 8000 --reload
