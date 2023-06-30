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

    where_family = HiddenField(
        render_kw={'readonly': True}
    )

    where_family_mother = HiddenField(
        render_kw={'readonly': True}
    )

    where_family_mother_mother = HiddenField(
        render_kw={'readonly': True}
    )

    where_family_mother_father = HiddenField(
        render_kw={'readonly': True}
    )

    where_family_mother_mother_mother = HiddenField(
        render_kw={'readonly': True}
    )

    where_family_mother_mother_father = HiddenField(
        render_kw={'readonly': True}
    )

    where_family_mother_father_mother = HiddenField(
        render_kw={'readonly': True}
    )

    where_family_mother_father_father = HiddenField(
        render_kw={'readonly': True}
    )

    where_family_father = HiddenField(
        render_kw={'readonly': True}
    )

    where_family_father_mother = HiddenField(
        render_kw={'readonly': True}
    )

    where_family_father_father = HiddenField(
        render_kw={'readonly': True}
    )

    where_family_father_mother_mother = HiddenField(
        render_kw={'readonly': True}
    )

    where_family_father_mother_father = HiddenField(
        render_kw={'readonly': True}
    )

    where_family_father_father_mother = HiddenField(
        render_kw={'readonly': True}
    )

    where_family_father_father_father = HiddenField(
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

    age_min = HiddenField(
        render_kw={'readonly': True}
    )

    age_max = HiddenField(
        render_kw={'readonly': True}
    )

    height_min = HiddenField(
        render_kw={'readonly': True}
    )

    height_max = HiddenField(
        render_kw={'readonly': True}
    )

    region_residence = HiddenField(
        render_kw={'readonly': True}
    )

    country_residence = HiddenField(
        render_kw={'readonly': True}
    )

    region_origin = HiddenField(
        render_kw={'readonly': True}
    )

    country_origin = HiddenField(
        render_kw={'readonly': True}
    )

    order_by_price = HiddenField(
        render_kw={'readonly': True}
    )

    order_by_age = HiddenField(
        render_kw={'readonly': True}
    )

    order_by_height = HiddenField(
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