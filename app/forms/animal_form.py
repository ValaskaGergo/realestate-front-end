# -*- coding: utf-8 -*-
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField


class UploadingAnimalForm(FlaskForm):
    user_email = StringField(
        render_kw={'readonly': True}
    )

    user_ads_count = StringField(
        render_kw={'readonly': True}
    )

    animal_id = StringField(
        render_kw={'readonly': True}
    )

    category_id = StringField(
        render_kw={'readonly': True}
    )

    category_id_name = StringField(
        render_kw={'readonly': True}
    )

    subcategory_id = StringField(
        render_kw={'readonly': True}
    )

    subcategory_id_name = StringField(
        render_kw={'readonly': True}
    )

    name = StringField(
        render_kw={'placeholder': ""}
    )

    age_year = StringField(
        render_kw={'readonly': True}
    )

    age_month = StringField(
        render_kw={'readonly': True}
    )

    age_day = StringField(
        render_kw={'readonly': True}
    )

    region_origin = StringField(
        render_kw={'readonly': True}
    )

    country_origin = StringField(
        render_kw={'readonly': True}
    )

    region_residence = StringField(
        render_kw={'readonly': True}
    )

    country_residence = StringField(
        render_kw={'readonly': True}
    )

    is_be_used_for = StringField(
        render_kw={'readonly': True}
    )

    be_used_for_hu = StringField(
        render_kw={'readonly': True}
    )

    be_used_for_en = StringField(
        render_kw={'readonly': True}
    )

    be_used_for_de = StringField(
        render_kw={'readonly': True}
    )

    be_used_for_fr = StringField(
        render_kw={'readonly': True}
    )

    be_used_for_es = StringField(
        render_kw={'readonly': True}
    )

    is_gender = StringField(
        render_kw={'readonly': True}
    )

    gender_hu = StringField(
        render_kw={'readonly': True}
    )

    gender_en = StringField(
        render_kw={'readonly': True}
    )

    gender_de = StringField(
        render_kw={'readonly': True}
    )

    gender_fr = StringField(
        render_kw={'readonly': True}
    )

    gender_es = StringField(
        render_kw={'readonly': True}
    )

    is_color = StringField(
        render_kw={'readonly': True}
    )

    color_hu = StringField(
        render_kw={'readonly': True}
    )

    color_en = StringField(
        render_kw={'readonly': True}
    )

    color_de = StringField(
        render_kw={'readonly': True}
    )

    color_fr = StringField(
        render_kw={'readonly': True}
    )

    color_es = StringField(
        render_kw={'readonly': True}
    )

    brief_description = StringField(
        render_kw={'placeholder': ""}
    )

    description = TextAreaField(
        render_kw={'placeholder': ""}
    )

    mother = StringField(
        render_kw={'placeholder': ""}
    )

    mother_mother = StringField(
        render_kw={'placeholder': ""}
    )

    mother_mother_mother = StringField(
        render_kw={'placeholder': ""}
    )

    mother_mother_father = StringField(
        render_kw={'placeholder': ""}
    )

    mother_father = StringField(
        render_kw={'placeholder': ""}
    )

    mother_father_mother = StringField(
        render_kw={'placeholder': ""}
    )

    mother_father_father = StringField(
        render_kw={'placeholder': ""}
    )

    father = StringField(
        render_kw={'placeholder': ""}
    )

    father_mother = StringField(
        render_kw={'placeholder': ""}
    )

    father_mother_mother = StringField(
        render_kw={'placeholder': ""}
    )

    father_mother_father = StringField(
        render_kw={'placeholder': ""}
    )

    father_father = StringField(
        render_kw={'placeholder': ""}
    )

    father_father_mother = StringField(
        render_kw={'placeholder': ""}
    )

    father_father_father = StringField(
        render_kw={'placeholder': ""}
    )

    img_01 = StringField(
        render_kw={'placeholder': ""}
    )

    img_02 = StringField(
        render_kw={'placeholder': ""}
    )

    img_03 = StringField(
        render_kw={'placeholder': ""}
    )

    img_04 = StringField(
        render_kw={'placeholder': ""}
    )

    img_05 = StringField(
        render_kw={'placeholder': ""}
    )

    img_06 = StringField(
        render_kw={'placeholder': ""}
    )

    img_07 = StringField(
        render_kw={'placeholder': ""}
    )

    img_08 = StringField(
        render_kw={'placeholder': ""}
    )

    img_09 = StringField(
        render_kw={'placeholder': ""}
    )

    img_10 = StringField(
        render_kw={'placeholder': ""}
    )

    img_01_data = StringField(
        render_kw={'readonly': True}
    )

    img_02_data = StringField(
        render_kw={'readonly': True}
    )

    img_03_data = StringField(
        render_kw={'readonly': True}
    )

    img_04_data = StringField(
        render_kw={'readonly': True}
    )

    img_05_data = StringField(
        render_kw={'readonly': True}
    )

    img_06_data = StringField(
        render_kw={'readonly': True}
    )

    img_07_data = StringField(
        render_kw={'readonly': True}
    )

    img_08_data = StringField(
        render_kw={'readonly': True}
    )

    img_09_data = StringField(
        render_kw={'readonly': True}
    )

    img_10_data = StringField(
        render_kw={'readonly': True}
    )

    img_01_data_old = StringField(
        render_kw={'readonly': True}
    )

    img_02_data_old = StringField(
        render_kw={'readonly': True}
    )

    img_03_data_old = StringField(
        render_kw={'readonly': True}
    )

    img_04_data_old = StringField(
        render_kw={'readonly': True}
    )

    img_05_data_old = StringField(
        render_kw={'readonly': True}
    )

    img_06_data_old = StringField(
        render_kw={'readonly': True}
    )

    img_07_data_old = StringField(
        render_kw={'readonly': True}
    )

    img_08_data_old = StringField(
        render_kw={'readonly': True}
    )

    img_09_data_old = StringField(
        render_kw={'readonly': True}
    )

    img_10_data_old = StringField(
        render_kw={'readonly': True}
    )

    img_01_status = StringField(
        render_kw={'readonly': True}
    )

    img_02_status = StringField(
        render_kw={'readonly': True}
    )

    img_03_status = StringField(
        render_kw={'readonly': True}
    )

    img_04_status = StringField(
        render_kw={'readonly': True}
    )

    img_05_status = StringField(
        render_kw={'readonly': True}
    )

    img_06_status = StringField(
        render_kw={'readonly': True}
    )

    img_07_status = StringField(
        render_kw={'readonly': True}
    )

    img_08_status = StringField(
        render_kw={'readonly': True}
    )

    img_09_status = StringField(
        render_kw={'readonly': True}
    )

    img_10_status = StringField(
        render_kw={'readonly': True}
    )

    video_01 = StringField(
        render_kw={'placeholder': ""}
    )

    video_01_data = StringField(
        render_kw={'readonly': True}
    )

    video_01_data_old = StringField(
        render_kw={'readonly': True}
    )

    video_01_status = StringField(
        render_kw={'readonly': True}
    )

    url_01 = StringField(
        render_kw={'placeholder': ""}
    )

    url_02 = StringField(
        render_kw={'placeholder': ""}
    )

    breed_registry = StringField(
        render_kw={'placeholder': ""}
    )

    breed_registry_data = StringField(
        render_kw={'readonly': True}
    )

    breed_registry_data_old = StringField(
        render_kw={'readonly': True}
    )

    breed_registry_status = StringField(
        render_kw={'readonly': True}
    )

    x_ray = StringField(
        render_kw={'placeholder': ""}
    )

    x_ray_data = StringField(
        render_kw={'readonly': True}
    )

    x_ray_data_old = StringField(
        render_kw={'readonly': True}
    )

    x_ray_status = StringField(
        render_kw={'readonly': True}
    )

    price = StringField(
        render_kw={'placeholder': ""}
    )

    user_to_currency = StringField(
        render_kw={'readonly': True}
    )

    eur1_to_currency = StringField(
        render_kw={'readonly': True}
    )
