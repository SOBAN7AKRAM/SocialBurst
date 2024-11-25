# Generated by Django 5.1.2 on 2024-11-17 17:16

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('socialburst', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('platform', models.CharField(max_length=50)),
                ('post_id', models.CharField(max_length=100)),
                ('title', models.CharField(max_length=255)),
                ('description', models.TextField(blank=True, null=True)),
                ('video_url', models.URLField()),
                ('status', models.CharField(max_length=50)),
                ('scheduled_time', models.DateTimeField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='socialburst.user')),
            ],
        ),
        migrations.CreateModel(
            name='ScheduledPost',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('scheduled_time', models.DateTimeField()),
                ('status', models.CharField(choices=[('pending', 'Pending'), ('completed', 'Completed'), ('failed', 'Failed')], default='pending', max_length=50)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='scheduled_posts', to='socialburst.post')),
            ],
        ),
        migrations.CreateModel(
            name='SocialMediaAccount',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('platform', models.CharField(choices=[('facebook', 'Facebook'), ('instagram', 'Instagram'), ('youtube', 'YouTube')], max_length=50)),
                ('account_id', models.CharField(max_length=255)),
                ('access_token', models.CharField(max_length=255)),
                ('additional_info', models.JSONField(blank=True, null=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='socialburst.user')),
            ],
        ),
    ]