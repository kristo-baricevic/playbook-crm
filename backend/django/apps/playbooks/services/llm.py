from __future__ import annotations

import json
from dataclasses import dataclass
from typing import Any, Optional

import requests
from django.conf import settings


@dataclass(frozen=True)
class GeneratedContent:
    subject: str
    body: str
    raw: str


def _require_setting(name: str) -> str:
    val = getattr(settings, name, None)
    if not val:
        raise RuntimeError(f"Missing Django setting: {name}")
    return val


def generate_with_llm(*, instructions: str, materials_context: str, person: dict[str, Any], action_type: str) -> GeneratedContent:
    api_url = _require_setting("LLM_API_URL")

    system = (
        "You are generating outreach content.\n"
        "Return ONLY valid JSON.\n"
        "For EMAIL_SEND: {\"subject\": \"...\", \"body\": \"...\"}\n"
        "For LINKEDIN_CONNECT and LINKEDIN_MESSAGE: {\"subject\": \"\", \"body\": \"...\"}\n"
        "No markdown fences."
    )

    user = {
        "action_type": action_type,
        "instructions": instructions or "",
        "person": person or {},
        "materials_context": materials_context or "",
    }

    payload = {
        "messages": [
            {"role": "system", "content": system},
            {"role": "user", "content": json.dumps(user)},
        ],
    }

    r = requests.post(api_url, json=payload, timeout=60)
    r.raise_for_status()

    data = r.json()
    content = data.get("content") or data.get("message") or data.get("output") or ""
    if not isinstance(content, str) or not content.strip():
        raise RuntimeError("LLM response missing `content` string")

    raw = content.strip()

    try:
        parsed = json.loads(raw)
    except Exception as e:
        raise RuntimeError(f"LLM did not return valid JSON: {e}\nRaw:\n{raw}")

    subject = (parsed.get("subject") or "").strip()
    body = (parsed.get("body") or "").strip()

    if not body:
        raise RuntimeError(f"LLM JSON missing body. Raw:\n{raw}")

    return GeneratedContent(subject=subject, body=body, raw=raw)
