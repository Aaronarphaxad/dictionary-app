# Generated by Django 3.2.5 on 2021-07-18 11:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dictionary', '0004_word_partofspeech'),
    ]

    operations = [
        migrations.AlterField(
            model_name='word',
            name='sound',
            field=models.URLField(null=True),
        ),
    ]
