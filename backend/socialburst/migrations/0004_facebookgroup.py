# Generated by Django 5.1.2 on 2024-11-26 18:28

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('socialburst', '0003_remove_post_platform_post_media_url_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='FacebookGroup',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('group_id', models.CharField(max_length=255)),
                ('group_name', models.CharField(max_length=255)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('social_account', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='groups', to='socialburst.socialmediaaccount')),
            ],
        ),
    ]