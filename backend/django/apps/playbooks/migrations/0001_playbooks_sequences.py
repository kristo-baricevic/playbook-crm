from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Playbook",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=255)),
                ("description", models.TextField(blank=True, default="")),
                ("is_active", models.BooleanField(default=True)),
                ("created_at", models.DateTimeField(db_index=True, default=django.utils.timezone.now)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name="Material",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(max_length=255)),
                ("file", models.FileField(blank=True, null=True, upload_to="materials/")),
                ("mime_type", models.CharField(blank=True, default="", max_length=100)),
                ("tags", models.JSONField(blank=True, default=list)),
                ("extracted_text", models.TextField(blank=True, default="")),
                ("created_at", models.DateTimeField(db_index=True, default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name="PlaybookRun",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("person_id", models.CharField(db_index=True, max_length=64)),
                ("person_payload", models.JSONField(blank=True, default=dict)),
                ("start_date", models.DateField(db_index=True)),
                ("status", models.CharField(choices=[("ACTIVE", "Active"), ("PAUSED", "Paused"), ("COMPLETED", "Completed")], default="ACTIVE", max_length=16)),
                ("created_at", models.DateTimeField(db_index=True, default=django.utils.timezone.now)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("playbook", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="runs", to="playbook.playbook")),
            ],
        ),
        migrations.CreateModel(
            name="PlaybookStep",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("step_index", models.PositiveIntegerField(db_index=True, default=0)),
                ("day_offset", models.IntegerField(db_index=True, default=0)),
                ("action_type", models.CharField(choices=[("EMAIL_SEND", "Email: Send"), ("LINKEDIN_CONNECT", "LinkedIn: Connect"), ("LINKEDIN_MESSAGE", "LinkedIn: Message")], max_length=32)),
                ("instructions", models.TextField(blank=True, default="")),
                ("enabled", models.BooleanField(default=True)),
                ("from_email", models.EmailField(blank=True, default="", max_length=254)),
                ("reply_to", models.EmailField(blank=True, default="", max_length=254)),
                ("created_at", models.DateTimeField(db_index=True, default=django.utils.timezone.now)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("playbook", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="steps", to="playbook.playbook")),
            ],
            options={"ordering": ["step_index", "id"]},
        ),
        migrations.CreateModel(
            name="StepMaterial",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("role", models.CharField(blank=True, default="required", max_length=32)),
                ("max_chars", models.PositiveIntegerField(blank=True, null=True)),
                ("material", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="playbook.material")),
                ("step", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="playbook.playbookstep")),
            ],
            options={"unique_together": {("step", "material")}},
        ),
        migrations.AddField(
            model_name="playbookstep",
            name="materials",
            field=models.ManyToManyField(related_name="steps", through="playbook.StepMaterial", to="playbook.material"),
        ),
        migrations.CreateModel(
            name="SequenceEvent",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("scheduled_for", models.DateTimeField(db_index=True)),
                ("status", models.CharField(choices=[("QUEUED", "Queued"), ("GENERATED", "Generated"), ("READY", "Ready"), ("SENT", "Sent"), ("FAILED", "Failed"), ("SKIPPED", "Skipped")], default="QUEUED", max_length=16)),
                ("generated_subject", models.TextField(blank=True, default="")),
                ("generated_body", models.TextField(blank=True, default="")),
                ("final_subject", models.TextField(blank=True, default="")),
                ("final_body", models.TextField(blank=True, default="")),
                ("provider_message_id", models.CharField(blank=True, default="", max_length=255)),
                ("provider_payload", models.JSONField(blank=True, default=dict)),
                ("error", models.TextField(blank=True, default="")),
                ("created_at", models.DateTimeField(db_index=True, default=django.utils.timezone.now)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("run", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="events", to="playbook.playbookrun")),
                ("step", models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name="events", to="playbook.playbookstep")),
            ],
            options={"ordering": ["scheduled_for", "id"]},
        ),
        migrations.AddIndex(
            model_name="playbookstep",
            index=models.Index(fields=["playbook", "step_index"], name="playbook_pl_playbook_c3a2e0_idx"),
        ),
        migrations.AddIndex(
            model_name="playbookstep",
            index=models.Index(fields=["playbook", "day_offset"], name="playbook_pl_playbook_9dbd30_idx"),
        ),
        migrations.AddIndex(
            model_name="playbookrun",
            index=models.Index(fields=["playbook", "person_id"], name="playbook_pl_playbook_4b3e83_idx"),
        ),
        migrations.AddIndex(
            model_name="playbookrun",
            index=models.Index(fields=["status", "start_date"], name="playbook_pl_status_3d01b8_idx"),
        ),
        migrations.AddIndex(
            model_name="sequenceevent",
            index=models.Index(fields=["run", "scheduled_for"], name="playbook_se_run_id_5a9f5a_idx"),
        ),
        migrations.AddIndex(
            model_name="sequenceevent",
            index=models.Index(fields=["status", "scheduled_for"], name="playbook_se_status_7d5cd2_idx"),
        ),
    ]
