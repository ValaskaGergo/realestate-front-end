# -*- coding: utf-8 -*-
from flask_wtf import FlaskForm
from wtforms import StringField


class AccountPaymentForm(FlaskForm):
    payment_data = StringField(
        render_kw={'readonly': True}
    )
