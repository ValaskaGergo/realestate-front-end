# -*- coding: utf-8 -*-
from flask_wtf import FlaskForm
from wtforms import StringField


class BillingAddressForm(FlaskForm):
    user_email = StringField(
        render_kw={'readonly': True}
    )

    billing_is_company = StringField(
        render_kw={'readonly': True}
    )

    billing_first_name = StringField(
        render_kw={'placeholder': "Ex.: John"}
    )

    billing_last_name = StringField(
        render_kw={'placeholder': "Ex.: Doe"}
    )

    billing_company_name = StringField(
        render_kw={'placeholder': "Ex.: Example Inc."}
    )

    billing_company_tax = StringField(
        render_kw={'placeholder': "Ex.: 12345678"}
    )

    billing_phone = StringField(
        render_kw={'placeholder': "Ex.: 12345678"}
    )

    billing_email = StringField(
        render_kw={'placeholder': "Ex.: foo@bar.baz"}
    )

    billing_country = StringField(
        render_kw={'readonly': True}
    )

    billing_zip_number = StringField(
        render_kw={'placeholder': "Ex.: 1234"}
    )

    billing_place = StringField(
        render_kw={'placeholder': "Ex.: Houston"}
    )

    billing_street = StringField(
        render_kw={'placeholder': "Ex.: 123 Street 1/A"}
    )

    billing_is_shipping_address = StringField(
        render_kw={'readonly': True}
    )

    billing_currency = StringField(
        render_kw={'readonly': True}
    )


class ShippingAddressForm(FlaskForm):
    shipping_first_name = StringField(
        render_kw={'placeholder': "Ex.: John"}
    )

    shipping_last_name = StringField(
        render_kw={'placeholder': "Ex.: Doe"}
    )

    shipping_company_name = StringField(
        render_kw={'placeholder': "Ex.: Example Inc."}
    )

    shipping_phone = StringField(
        render_kw={'placeholder': "Ex.: +12345678"}
    )

    shipping_email = StringField(
        render_kw={'placeholder': "Ex.: foo@bar.baz"}
    )

    shipping_country = StringField(
        render_kw={'readonly': True}
    )

    shipping_zip_number = StringField(
        render_kw={'placeholder': "Ex.: 1234"}
    )

    shipping_place = StringField(
        render_kw={'placeholder': "Ex.: Houston"}
    )

    shipping_street = StringField(
        render_kw={'placeholder': "Ex.: 123 Street 1/A"}
    )

    shipping_currency = StringField(
        render_kw={'readonly': True}
    )
