# -*- coding: utf-8 -*-
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField


class AdminSettingsAddSettingsForm(FlaskForm):
    settings_name = TextAreaField()

    settings_type = StringField()

    settings_value = StringField()


class AdminSettingsEditSettingsForm(AdminSettingsAddSettingsForm):
    settings_id = StringField()
