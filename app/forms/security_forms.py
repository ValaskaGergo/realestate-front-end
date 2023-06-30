# -*- coding: utf-8 -*-
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField


class SecurityPasswordForm(FlaskForm):
    current_password = PasswordField(
        render_kw={'placeholder': "Ex.: 123xX_?_Xx321"}
    )

    password = PasswordField(
        render_kw={'placeholder': "Ex.: 123xX_?_Xx321"}
    )

    password_confirm = PasswordField(
        render_kw={'placeholder': "Ex.: 123xX_?_Xx321"}
    )


class SecurityEmailForm(FlaskForm):
    current_email = StringField(
        render_kw={'readonly': True}
    )

    email = StringField(
        render_kw={'placeholder': "Ex.: foo@bar.baz"}
    )
    secret_key = StringField(
        render_kw={'placeholder': "Ex.: 010000100101001101001101"}
    )


class SecurityDeleteUserForm(FlaskForm):
    password = PasswordField(
        render_kw={'placeholder': "Ex.: 123xX_?_Xx321"}
    )
