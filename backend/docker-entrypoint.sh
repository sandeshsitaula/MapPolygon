#!/bin/bash

# # Check if the .env file exists, and create it if not
# if [ ! -f .env ]; then
#     echo "Creating .env file with default values..."
#     echo "POSTGRES_DB=postgres" > .env
#     echo "POSTGRES_USER=postgres" >> .env
#     echo "POSTGRES_PASSWORD=postgres" >> .env
# else
#     echo ".env file found. Using existing environment variables."
# fi

# # Source the .env file to load environment variables
# source .env
sleep 2s
# Check if migrations need to be applied
python manage.py showmigrations | grep -q "0 "  # Checks if there are 0 unapplied migrations
MIGRATION_STATUS=$?

# Apply migrations if needed
if [ $MIGRATION_STATUS -ne 0 ]; then
    echo "Applying migrations..."
    python manage.py migrate
fi
# Start the Django development server
echo "Starting Django development server..."
python manage.py runserver 0.0.0.0:8000 --verbosity 0 > /dev/null 2>&1
