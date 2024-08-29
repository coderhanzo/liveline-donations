# Generated by Django 5.0.6 on 2024-08-21 10:57

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('campaigns', '0001_initial'),
        ('contact_analytics', '0001_initial'),
        ('users', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='animal',
            name='profile',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='contact_analytics.accountprofile'),
        ),
        migrations.AddField(
            model_name='communitydevelopment',
            name='profile',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='contact_analytics.accountprofile'),
        ),
        migrations.AddField(
            model_name='disabilitysupport',
            name='profile',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='contact_analytics.accountprofile'),
        ),
        migrations.AddField(
            model_name='educationalinstitution',
            name='profile',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='contact_analytics.accountprofile'),
        ),
        migrations.AddField(
            model_name='emergencyrelief',
            name='profile',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='contact_analytics.accountprofile'),
        ),
        migrations.AddField(
            model_name='environmentalprotection',
            name='profile',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='contact_analytics.accountprofile'),
        ),
        migrations.AddField(
            model_name='healthcareinstitution',
            name='profile',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='contact_analytics.accountprofile'),
        ),
        migrations.AddField(
            model_name='healthcarepatient',
            name='profile',
            field=models.OneToOneField(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='patient_profile', to='contact_analytics.accountprofile'),
        ),
        migrations.AddField(
            model_name='monetarycampaign',
            name='causes',
            field=models.ManyToManyField(blank=True, related_name='campaigns', to='campaigns.cause'),
        ),
        migrations.AddField(
            model_name='monetarycampaign',
            name='created_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='campaigns', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='monetarycampaign',
            name='institution',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='users.institution'),
        ),
        migrations.AddField(
            model_name='monetarycampaign',
            name='last_edited_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='edited_campaigns', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='monetarycampaign',
            name='subscribers',
            field=models.ManyToManyField(blank=True, related_name='subscribed_campaigns', to='contact_analytics.accountprofile'),
        ),
        migrations.AddField(
            model_name='healthcarepatient',
            name='campaigns',
            field=models.ManyToManyField(blank=True, related_name='HEALTHCARE_PATIENT', to='campaigns.monetarycampaign'),
        ),
        migrations.AddField(
            model_name='healthcareinstitution',
            name='campaigns',
            field=models.ManyToManyField(blank=True, related_name='HEALTHCARE_INSTITUTION', to='campaigns.monetarycampaign'),
        ),
        migrations.AddField(
            model_name='environmentalprotection',
            name='campaigns',
            field=models.ManyToManyField(blank=True, related_name='ENVIRONMENTAL_PROTECTION', to='campaigns.monetarycampaign'),
        ),
        migrations.AddField(
            model_name='emergencyrelief',
            name='campaigns',
            field=models.ManyToManyField(blank=True, related_name='EMERGENCY_RELIEF', to='campaigns.monetarycampaign'),
        ),
        migrations.AddField(
            model_name='educationalinstitution',
            name='campaigns',
            field=models.ManyToManyField(blank=True, related_name='EDUCATIONAL_INSTITUTION', to='campaigns.monetarycampaign'),
        ),
        migrations.AddField(
            model_name='disabilitysupport',
            name='campaigns',
            field=models.ManyToManyField(blank=True, related_name='DISABILITY_SUPPORT', to='campaigns.monetarycampaign'),
        ),
        migrations.AddField(
            model_name='communitydevelopment',
            name='campaigns',
            field=models.ManyToManyField(blank=True, related_name='COMMUNITY_DEVELOPMENT', to='campaigns.monetarycampaign'),
        ),
        migrations.AddField(
            model_name='animal',
            name='campaigns',
            field=models.ManyToManyField(blank=True, related_name='ANIMAL', to='campaigns.monetarycampaign'),
        ),
        migrations.AddField(
            model_name='photo',
            name='campaigns',
            field=models.ManyToManyField(blank=True, related_name='photos', to='campaigns.monetarycampaign'),
        ),
        migrations.AddField(
            model_name='socialwelfareprogram',
            name='campaigns',
            field=models.ManyToManyField(blank=True, related_name='SOCIAL_WELFARE_PROGRAM', to='campaigns.monetarycampaign'),
        ),
        migrations.AddField(
            model_name='socialwelfareprogram',
            name='profile',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='contact_analytics.accountprofile'),
        ),
        migrations.AlterUniqueTogether(
            name='photo',
            unique_together={('hash_key', 'institution')},
        ),
    ]
