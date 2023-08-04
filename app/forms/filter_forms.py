# -*- coding: utf-8 -*-
from flask_wtf import FlaskForm
from wtforms import StringField, HiddenField


class FilterForm(FlaskForm):
    where_input = StringField(
        render_kw={'placeholder': ""}
    )

    where_all = HiddenField(
        render_kw={'readonly': True}
    )

    where_name = HiddenField(
        render_kw={'readonly': True}
    )

    where_description = HiddenField(
        render_kw={'readonly': True}
    )


    price_min = HiddenField(
        render_kw={'readonly': True}
    )

    price_max = HiddenField(
        render_kw={'readonly': True}
    )

    category_all = HiddenField(
    )

    subcategory_all = HiddenField(
    )

    gender_all = HiddenField(
    )

    color_all = HiddenField(
    )

    be_used_for_all = HiddenField(
    )


    region_residence = HiddenField(
        render_kw={'readonly': True}
    )

    country_residence = HiddenField(
        render_kw={'readonly': True}
    )


    order_by_price = HiddenField(
        render_kw={'readonly': True}
    )


    order_by_rating = HiddenField(
        render_kw={'readonly': True}
    )

    encode = HiddenField(
        render_kw={'readonly': True}
    )

    only_one_category_id = HiddenField(
        render_kw={'readonly': True}
    )

    only_one_subcategory_id = HiddenField(
        render_kw={'readonly': True}
    )

    seller_user_id = HiddenField(
        render_kw={'readonly': True}
    )

    seller_user_name = HiddenField(
        render_kw={'readonly': True}
    )

    wishlist = HiddenField(
        render_kw={'readonly': True}
    )

    snap = HiddenField(
        render_kw={'readonly': True}
    )
