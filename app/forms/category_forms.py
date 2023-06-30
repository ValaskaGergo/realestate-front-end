# -*- coding: utf-8 -*-
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField


class CategoryForm(FlaskForm):
    category_id = StringField(
        render_kw={'readonly': True}
    )

    name_hu = StringField(
        render_kw={'placeholder': ""}
    )

    name_en = StringField(
        render_kw={'placeholder': ""}
    )

    name_de = StringField(
        render_kw={'placeholder': ""}
    )

    name_fr = StringField(
        render_kw={'placeholder': ""}
    )

    name_es = StringField(
        render_kw={'placeholder': ""}
    )

    gender_hu = TextAreaField(
        render_kw={'placeholder': ""}
    )

    gender_en = TextAreaField(
        render_kw={'placeholder': ""}
    )

    gender_de = TextAreaField(
        render_kw={'placeholder': ""}
    )

    gender_fr = TextAreaField(
        render_kw={'placeholder': ""}
    )

    gender_es = TextAreaField(
        render_kw={'placeholder': ""}
    )

    be_used_for_hu = TextAreaField(
        render_kw={'placeholder': ""}
    )

    be_used_for_en = TextAreaField(
        render_kw={'placeholder': ""}
    )

    be_used_for_de = TextAreaField(
        render_kw={'placeholder': ""}
    )

    be_used_for_fr = TextAreaField(
        render_kw={'placeholder': ""}
    )

    be_used_for_es = TextAreaField(
        render_kw={'placeholder': ""}
    )

    color_hu = TextAreaField(
        render_kw={'placeholder': ""}
    )

    color_en = TextAreaField(
        render_kw={'placeholder': ""}
    )

    color_de = TextAreaField(
        render_kw={'placeholder': ""}
    )

    color_fr = TextAreaField(
        render_kw={'placeholder': ""}
    )

    color_es = TextAreaField(
        render_kw={'placeholder': ""}
    )

    img = StringField(
        render_kw={'placeholder': ""}
    )

    img_data = StringField(
        render_kw={'readonly': True}
    )

    img_data_old = StringField(
        render_kw={'readonly': True}
    )

    is_edit_img = StringField(
        render_kw={'readonly': True}
    )

    is_new_img = StringField(
        render_kw={'readonly': True}
    )

    is_rm_img = StringField(
        render_kw={'readonly': True}
    )

    visibility = StringField(
        render_kw={'readonly': True}
    )


class SubCategoryForm(CategoryForm):
    subcategory_id = StringField(
        render_kw={'readonly': True}
    )

    category_id_select = StringField(
        render_kw={'readonly': True}
    )

    description_hu = TextAreaField(
        render_kw={'placeholder': ""}
    )

    description_en = TextAreaField(
        render_kw={'placeholder': ""}
    )

    description_de = TextAreaField(
        render_kw={'placeholder': ""}
    )

    description_fr = TextAreaField(
        render_kw={'placeholder': ""}
    )

    description_es = TextAreaField(
        render_kw={'placeholder': ""}
    )
