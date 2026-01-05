from client import django_get, django_post

def handle_message(message: str):
    if "generate" in message:
        django_post("/api/generate/", {})
        return {"reply": "Emails scheduled."}

    if "open rate" in message:
        data = django_get("/api/analytics/charts/?type=open_rate")
        return {"reply": data}

    return {"reply": "I did not understand."}
