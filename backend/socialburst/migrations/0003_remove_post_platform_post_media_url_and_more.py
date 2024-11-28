# Generated by Django 5.1.2 on 2024-11-26 17:44

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('socialburst', '0002_post_scheduledpost_socialmediaaccount'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='platform',
        ),
        migrations.AddField(
            model_name='post',
            name='media_url',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='post',
            name='social_account',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='posts', to='socialburst.socialmediaaccount'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='socialmediaaccount',
            name='expires_at',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='socialmediaaccount',
            name='refresh_token',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='post',
            name='post_id',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='post',
            name='status',
            field=models.CharField(choices=[('posted', 'Posted'), ('scheduled', 'Scheduled'), ('failed', 'Failed')], default='scheduled', max_length=50),
        ),
        migrations.CreateModel(
            name='FacebookPage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('page_id', models.CharField(max_length=255)),
                ('page_name', models.CharField(max_length=255)),
                ('page_access_token', models.CharField(max_length=255)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('social_account', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='pages', to='socialburst.socialmediaaccount')),
            ],
        ),
        migrations.DeleteModel(
            name='ScheduledPost',
        ),
    ]