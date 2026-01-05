import requests

BASE = "http://localhost:8000"

def django_get(path):
    return requests.get(BASE + path).json()

def django_post(path, payload):
    return requests.post(BASE + path, json=payload).json()
