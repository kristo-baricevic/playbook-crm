#!/usr/bin/env bash
set -e

cd backend/django

python3 -m venv .venv
source .venv/bin/activate

pip install --upgrade pip
pip install -r requirements.txt

createdb salesapp || true

python manage.py migrate
python manage.py createsuperuser || true
