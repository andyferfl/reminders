#!/bin/bash

# Collect static files
echo "Collect static files"
python manage.py collectstatic --noinput

# Make custom user migrations
echo "Make custom user migrations"
python manage.py makemigrations users

# Make reminders migrations
echo "Make reminders migrations"
python manage.py makemigrations reminders

# Apply database migrations
echo "Apply database migrations"
python manage.py migrate

# Create superuser
echo "Create superuser"
echo "from users.models import CustomUser; CustomUser.objects.create_superuser('admin', 'admin', '.farMac')" | python manage.py shell


# Start server
echo "Starting server"
python manage.py runserver 0.0.0.0:8000

