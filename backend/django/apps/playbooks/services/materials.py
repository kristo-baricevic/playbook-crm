from __future__ import annotations

from typing import Iterable

from ..models import Material, PlaybookStep, StepMaterial


def build_materials_context(*, step: PlaybookStep, hard_char_limit: int = 20000) -> str:
    links = (
        StepMaterial.objects.select_related("material")
        .filter(step=step)
        .order_by("id")
    )

    chunks: list[str] = []
    used = 0

    for link in links:
        m: Material = link.material
        text = (m.extracted_text or "").strip()
        if not text:
            continue

        max_chars = link.max_chars or len(text)
        text = text[:max_chars].strip()
        if not text:
            continue

        header = f"[Material: {m.title}]\n"
        piece = header + text + "\n\n"

        if used + len(piece) > hard_char_limit:
            remaining = max(0, hard_char_limit - used)
            if remaining > 0:
                chunks.append(piece[:remaining])
                used += remaining
            break

        chunks.append(piece)
        used += len(piece)

    return "".join(chunks).strip()
