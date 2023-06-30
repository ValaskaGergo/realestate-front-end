# -*- coding: utf-8 -*-
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField


class SignInForm(FlaskForm):
    email = StringField(
        render_kw={'placeholder': "Ex.: foo@bar.baz"}
    )

    password = PasswordField(
        render_kw={'placeholder': "Ex.: 123xX_?_Xx321"}
    )

    remember = StringField(
        render_kw={'readonly': True}
    )
