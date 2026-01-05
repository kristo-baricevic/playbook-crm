from __future__ import annotations

from datetime import datetime, time, timedelta

from django.utils import timezone

from ..models import PlaybookRun, SequenceEvent


def create_events_for_run(*, run: PlaybookRun, default_local_time: time = time(9, 0)) -> list[SequenceEvent]:
    steps = list(run.playbook.steps.filter(enabled=True).order_by("step_index", "id"))

    created: list[SequenceEvent] = []
    tz = timezone.get_current_timezone()

    for step in steps:
        dt = datetime.combine(run.start_date + timedelta(days=step.day_offset), default_local_time)
        scheduled_for = timezone.make_aware(dt, tz)

        created.append(
            SequenceEvent.objects.create(
                run=run,
                step=step,
                scheduled_for=scheduled_for,
                status=SequenceEvent.Status.QUEUED,
            )
        )

    return created
