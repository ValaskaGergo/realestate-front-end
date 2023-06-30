# -*- coding: utf-8 -*-
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField


class PasswordResetForm(FlaskForm):
    email = StringField(
        render_kw={'placeholder': "Ex.: foo@bar.baz"}
    )


class PasswordResetFormPin(FlaskForm):
    code = StringField(
        render_kw={'readonly': True}
    )

    email = StringField(
        render_kw={'readonly': True}
    )

    pin = StringField(
        render_kw={'placeholder': "Ex.: 123456"}
    )


class PasswordResetDataForm(FlaskForm):
    code = StringField(
        render_kw={'readonly': True}
    )

    email = StringField(
        render_kw={'readonly': True}
    )

    password = PasswordField(
        render_kw={'placeholder': "Ex.: 123xX_?_Xx321"}
    )
    password_confirm = PasswordField(
        render_kw={'placeholder': "Ex.: 123xX_?_Xx321"}
    )
