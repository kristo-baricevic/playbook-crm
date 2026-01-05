from __future__ import annotations

from dataclasses import dataclass
from typing import Optional

from django.core.mail import EmailMessage


@dataclass(frozen=True)
class SendResult:
    provider_message_id: str
    provider_payload: dict


def send_email_message(*, to_email: str, subject: str, body: str, from_email: str, reply_to: str = "") -> SendResult:
    msg = EmailMessage(
        subject=subject,
        body=body,
        from_email=from_email or None,
        to=[to_email],
        reply_to=[reply_to] if reply_to else None,
    )
    msg.content_subtype = "plain"
    msg.send(fail_silently=False)
    return SendResult(provider_message_id="", provider_payload={})
