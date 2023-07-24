# -*- coding: utf-8 -*-
from app import app
from config import _templates, _static
from flask import Blueprint, g, render_template, json, request, make_response, jsonify, session, abort
from app.forms.animal_form import UploadingAnimalForm
import requests
from datetime import datetime, timedelta
from urllib import parse
import io
from pyjsonq import JsonQ
import uuid
import os
from PIL import Image, ImageDraw, ImageFilter, ImageFont
import shutil
from .utilities.utility import File, FileVideo, FilePDF
import moviepy.editor as mp
from dateutil import relativedelta
import qrcode
import pikepdf
from .youtube.youtube import YouTube
from slugify import slugify
import ffmpeg
import proglog
import redis

mod = Blueprint('animal_module', __name__)


@mod.route('/uploading-animal', methods=['GET'])
def uploading_animal():
    if g.permission['is_user_login']['user_permission']['subscribed'] == "True" and \
            g.permission['is_user_login']['user_permission']['is_user_management'] == "True" or \
            g.permission['is_user_login']['user_permission']['subscribed_ads'] != "0" and \
            g.permission['is_user_login']['user_permission']['subscribed_ads'] is not None:
        try:
            try:
                lang = parse.unquote(request.cookies.get("abBrowserLang")).replace("%22", "").replace('"', '')
            except TypeError:
                lang = "en"
        except TypeError:
            supported_languages = app.config['SUPPORTED_LANGUAGES']
            lang = request.accept_languages.best_match(supported_languages)

        uploading_animal_form = UploadingAnimalForm()

        user_id = request.args.get("id")
        user_email = request.args.get("email")
        user_name = request.args.get("name")
        user_ads_count = request.args.get("user_ads_count")

        if user_ads_count is not None and int(user_ads_count) == 0:
            abort(404)

        if user_email is not None:
            uploading_animal_form.user_email.data = user_email
        else:
            uploading_animal_form.user_email.data = None

        start_year = datetime.now().year - 100
        end_year = datetime.now().year + 1

        countries_json = io.open(_templates + "/i18n/countries." + lang + ".json", 'r', encoding='utf8')
        countries_read = json.loads(countries_json.read())
        countries = countries_read

        jq = JsonQ(data=countries)
        countries = jq.at("data").sort_by("country", "asc").group_by('region').get()

        url = app.config['API_SERVER_URL'] + "/get-exchange"
        headers = {'X-Api-Key': app.config['API_KEY']}
        r = requests.get(url, headers=headers, verify=app.config['TLS_VERIFY'])
        if r.status_code == 200:
            get_exchange = r.json().get("rates")
            user_currency = g.permission['is_user_login']['user_billing_information']['currency']
            uploading_animal_form.user_to_currency.data = user_currency
            uploading_animal_form.eur1_to_currency.data = round(get_exchange[user_currency], 2)

        uploading_animal_form.animal_id.data = None

        return render_template('authentication/personal/uploading-animal.jinja2',
                               uploading_animal_form=uploading_animal_form,
                               start_year=start_year,
                               end_year=end_year,
                               countries=countries,
                               user_id=user_id,
                               user_name=user_name)
    else:
        return render_template('errorhandler/404.jinja2')


# AJAX
@mod.route('/_uploading-animal', methods=['POST'])
def _uploading_animal():
    form_data = json.loads(request.get_data())

    user_email = form_data['user_email']
    animal_id = form_data['animal_id']
    category_id = form_data['category_id']
    subcategory_id = form_data['subcategory_id']
    category_id_name = form_data['category_id_name']
    subcategory_id_name = form_data['subcategory_id_name']
    name = form_data['name']
    age_year = form_data['age_year']
    age_month = form_data['age_month']
    age_day = form_data['age_day']
    region_origin = form_data['region_origin']
    country_origin = form_data['country_origin']
    region_residence = form_data['region_residence']
    country_residence = form_data['country_residence']
    is_be_used_for = form_data['is_be_used_for']
    be_used_for_hu = form_data['be_used_for_hu']
    be_used_for_en = form_data['be_used_for_en']
    be_used_for_de = form_data['be_used_for_de']
    be_used_for_fr = form_data['be_used_for_fr']
    be_used_for_es = form_data['be_used_for_es']
    is_gender = form_data['is_gender']
    gender_hu = form_data['gender_hu']
    gender_en = form_data['gender_en']
    gender_de = form_data['gender_de']
    gender_fr = form_data['gender_fr']
    gender_es = form_data['gender_es']
    is_color = form_data['is_color']
    color_hu = form_data['color_hu']
    color_en = form_data['color_en']
    color_de = form_data['color_de']
    color_fr = form_data['color_fr']
    color_es = form_data['color_es']
    brief_description = form_data['brief_description']
    description = form_data['description']
    mother = form_data['mother']
    mother_mother = form_data['mother_mother']
    mother_mother_mother = form_data['mother_mother_mother']
    mother_mother_father = form_data['mother_mother_father']
    mother_father = form_data['mother_father']
    mother_father_mother = form_data['mother_father_mother']
    mother_father_father = form_data['mother_father_father']
    father = form_data['father']
    father_mother = form_data['father_mother']
    father_mother_mother = form_data['father_mother_mother']
    father_mother_father = form_data['father_mother_father']
    father_father = form_data['father_father']
    father_father_mother = form_data['father_father_mother']
    father_father_father = form_data['father_father_father']
    img_01_data = form_data['img_01_data']
    img_02_data = form_data['img_02_data']
    img_03_data = form_data['img_03_data']
    img_04_data = form_data['img_04_data']
    img_05_data = form_data['img_05_data']
    img_06_data = form_data['img_06_data']
    img_07_data = form_data['img_07_data']
    img_08_data = form_data['img_08_data']
    img_09_data = form_data['img_09_data']
    img_10_data = form_data['img_10_data']
    img_01_data_old = form_data['img_01_data_old']
    img_02_data_old = form_data['img_02_data_old']
    img_03_data_old = form_data['img_03_data_old']
    img_04_data_old = form_data['img_04_data_old']
    img_05_data_old = form_data['img_05_data_old']
    img_06_data_old = form_data['img_06_data_old']
    img_07_data_old = form_data['img_07_data_old']
    img_08_data_old = form_data['img_08_data_old']
    img_09_data_old = form_data['img_09_data_old']
    img_10_data_old = form_data['img_10_data_old']
    img_01_status = form_data['img_01_status']
    img_02_status = form_data['img_02_status']
    img_03_status = form_data['img_03_status']
    img_04_status = form_data['img_04_status']
    img_05_status = form_data['img_05_status']
    img_06_status = form_data['img_06_status']
    img_07_status = form_data['img_07_status']
    img_08_status = form_data['img_08_status']
    img_09_status = form_data['img_09_status']
    img_10_status = form_data['img_10_status']
    video_01_data = form_data['video_01_data']
    video_01_data_old = form_data['video_01_data_old']
    video_01_status = form_data['video_01_status']
    url_01 = form_data['url_01']
    url_02 = form_data['url_02']
    medical_paper_data = form_data['medical_paper_data']
    medical_paper_data_old = form_data['medical_paper_data_old']
    medical_paper_status = form_data['medical_paper_status']
    breed_registry_data = form_data['breed_registry_data']
    breed_registry_data_old = form_data['breed_registry_data_old']
    breed_registry_status = form_data['breed_registry_status']
    x_ray_data = form_data['x_ray_data']
    x_ray_data_old = form_data['x_ray_data_old']
    x_ray_status = form_data['x_ray_status']
    price = form_data['price']

    if g.permission['is_user_login']['user_permission']['is_user_management'] == "True":
        email = user_email
    else:
        email = g.permission['is_user_login']['user']['email']

    last_modification_user_email = g.permission['is_user_login']['user']['email']

    url = app.config['API_SERVER_URL'] + "/uploading-animal"
    headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
    payload = {
        "last_modification_user_email": last_modification_user_email,
        "email": email,
        "animal_id": animal_id,
        "category_id": category_id,
        "subcategory_id": subcategory_id,
        "name": name,
        "age_year": age_year,
        "age_month": age_month,
        "age_day": age_day,
        "region_origin": region_origin,
        "country_origin": country_origin,
        "region_residence": region_residence,
        "country_residence": country_residence,
        "is_be_used_for": is_be_used_for,
        "be_used_for_hu": be_used_for_hu,
        "be_used_for_en": be_used_for_en,
        "be_used_for_de": be_used_for_de,
        "be_used_for_fr": be_used_for_fr,
        "be_used_for_es": be_used_for_es,
        "is_gender": is_gender,
        "gender_hu": gender_hu,
        "gender_en": gender_en,
        "gender_de": gender_de,
        "gender_fr": gender_fr,
        "gender_es": gender_es,
        "is_color": is_color,
        "color_hu": color_hu,
        "color_en": color_en,
        "color_de": color_de,
        "color_fr": color_fr,
        "color_es": color_es,
        "brief_description": brief_description,
        "description": description,
        "mother": mother,
        "mother_mother": mother_mother,
        "mother_mother_mother": mother_mother_mother,
        "mother_mother_father": mother_mother_father,
        "mother_father": mother_father,
        "mother_father_mother": mother_father_mother,
        "mother_father_father": mother_father_father,
        "father": father,
        "father_mother": father_mother,
        "father_mother_mother": father_mother_mother,
        "father_mother_father": father_mother_father,
        "father_father": father_father,
        "father_father_mother": father_father_mother,
        "father_father_father": father_father_father,
        "img_01_data": img_01_data,
        "img_02_data": img_02_data,
        "img_03_data": img_03_data,
        "img_04_data": img_04_data,
        "img_05_data": img_05_data,
        "img_06_data": img_06_data,
        "img_07_data": img_07_data,
        "img_08_data": img_08_data,
        "img_09_data": img_09_data,
        "img_10_data": img_10_data,
        "img_01_data_old": img_01_data_old,
        "img_02_data_old": img_02_data_old,
        "img_03_data_old": img_03_data_old,
        "img_04_data_old": img_04_data_old,
        "img_05_data_old": img_05_data_old,
        "img_06_data_old": img_06_data_old,
        "img_07_data_old": img_07_data_old,
        "img_08_data_old": img_08_data_old,
        "img_09_data_old": img_09_data_old,
        "img_10_data_old": img_10_data_old,
        "img_01_status": img_01_status,
        "img_02_status": img_02_status,
        "img_03_status": img_03_status,
        "img_04_status": img_04_status,
        "img_05_status": img_05_status,
        "img_06_status": img_06_status,
        "img_07_status": img_07_status,
        "img_08_status": img_08_status,
        "img_09_status": img_09_status,
        "img_10_status": img_10_status,
        "video_01_data": video_01_data,
        "url_01": url_01,
        "url_02": url_02,
        "medical_paper_data": medical_paper_data,
        "medical_paper_data_old": medical_paper_data_old,
        "medical_paper_status": medical_paper_status,
        "breed_registry_data": breed_registry_data,
        "breed_registry_data_old": breed_registry_data_old,
        "breed_registry_status": breed_registry_status,
        "x_ray_data": x_ray_data,
        "x_ray_data_old": x_ray_data_old,
        "x_ray_status": x_ray_status,
        "price": price,

    }
    r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

    if r.status_code == 200:
        r_data = r.json()
        img_data_list = []
        is_editing = r_data['is_editing']

        animal_id = r_data['animal_id']

        # Start IMG 01
        img_01_data_old_json = None
        try:
            img_01_data_old_json = json.loads(img_01_data_old)
        except:
            pass
        if img_01_status == "rm":
            img_01_data = "false"
            try:
                shutil.rmtree(app.config['IMG_DIRECTORY'] + "animal/" + img_01_data_old_json['folder'])
            except:
                pass
        elif img_01_status == "editing":
            img_data_list.append(img_01_data)
            try:
                os.makedirs(app.config['TMP_IMG_DIRECTORY'] + "animal/" + img_01_data_old_json['folder'],
                            exist_ok=True)
                shutil.copy(
                    app.config['IMG_DIRECTORY'] + "animal/" + img_01_data_old_json['folder'] + "/origin/" +
                    img_01_data_old_json['filename'],
                    app.config['TMP_IMG_DIRECTORY'] + "animal/" + img_01_data_old_json['folder'] + "/" +
                    img_01_data_old_json['filename']
                )
            except:
                pass
        elif img_01_status == "new":
            if img_01_data:
                img_data_list.append(img_01_data)
            else:
                img_01_data = "false"

            try:
                shutil.rmtree(app.config['IMG_DIRECTORY'] + "animal/" + img_01_data_old_json['folder'])
            except:
                pass

        elif img_01_status == "unchanged":
            if is_editing == "True":
                try:
                    os.makedirs(app.config['TMP_IMG_DIRECTORY'] + "animal/" + img_01_data_old_json['folder'],
                                exist_ok=True)
                    shutil.copy(
                        app.config['IMG_DIRECTORY'] + "animal/" + img_01_data_old_json['folder'] + "/origin/" +
                        img_01_data_old_json['filename'],
                        app.config['TMP_IMG_DIRECTORY'] + "animal/" + img_01_data_old_json['folder'] + "/" +
                        img_01_data_old_json['filename']
                    )
                except:
                    img_01_data = "false"
            else:
                pass
        else:
            img_01_data = "false"
        # End IMG 01

        # Start IMG 02
        img_02_data_old_json = None
        try:
            img_02_data_old_json = json.loads(img_02_data_old)
        except:
            pass
        if img_02_status == "rm":
            img_02_data = "false"
            try:
                shutil.rmtree(app.config['IMG_DIRECTORY'] + "animal/" + img_02_data_old_json['folder'])
            except:
                pass
        elif img_02_status == "editing":
            img_data_list.append(img_02_data)
            try:
                os.makedirs(app.config['TMP_IMG_DIRECTORY'] + "animal/" + img_02_data_old_json['folder'],
                            exist_ok=True)
                shutil.copy(
                    app.config['IMG_DIRECTORY'] + "animal/" + img_02_data_old_json['folder'] + "/origin/" +
                    img_02_data_old_json['filename'],
                    app.config['TMP_IMG_DIRECTORY'] + "animal/" + img_02_data_old_json['folder'] + "/" +
                    img_02_data_old_json['filename']
                )
            except:
                pass
        elif img_02_status == "new":
            if img_02_data:
                img_data_list.append(img_02_data)
            else:
                img_02_data = "false"

            try:
                shutil.rmtree(app.config['IMG_DIRECTORY'] + "animal/" + img_02_data_old_json['folder'])
            except:
                pass
        elif img_02_status == "unchanged":
            if is_editing == "True":
                try:
                    os.makedirs(app.config['TMP_IMG_DIRECTORY'] + "animal/" + img_02_data_old_json['folder'],
                                exist_ok=True)
                    shutil.copy(
                        app.config['IMG_DIRECTORY'] + "animal/" + img_02_data_old_json['folder'] + "/origin/" +
                        img_02_data_old_json['filename'],
                        app.config['TMP_IMG_DIRECTORY'] + "animal/" + img_02_data_old_json['folder'] + "/" +
                        img_02_data_old_json['filename']
                    )
                except:
                    img_02_data = "false"
            else:
                pass
        else:
            img_02_data = "false"
        # End IMG 02

        # Start IMG 03
        img_03_data_old_json = None
        try:
            img_03_data_old_json = json.loads(img_03_data_old)
        except:
            pass
        if img_03_status == "rm":
            img_03_data = "false"
            try:
                shutil.rmtree(app.config['IMG_DIRECTORY'] + "animal/" + img_03_data_old_json['folder'])
            except:
                pass
        elif img_03_status == "editing":
            img_data_list.append(img_03_data)
            try:
                os.makedirs(app.config['TMP_IMG_DIRECTORY'] + "animal/" + img_03_data_old_json['folder'],
                            exist_ok=True)
                shutil.copy(
                    app.config['IMG_DIRECTORY'] + "animal/" + img_03_data_old_json['folder'] + "/origin/" +
                    img_03_data_old_json['filename'],
                    app.config['TMP_IMG_DIRECTORY'] + "animal/" + img_03_data_old_json['folder'] + "/" +
                    img_03_data_old_json['filename']
                )
            except:
                pass
        elif img_03_status == "new":
            if img_03_data:
                img_data_list.append(img_03_data)
            else:
                img_03_data = "false"

            try:
                shutil.rmtree(app.config['IMG_DIRECTORY'] + "animal/" + img_03_data_old_json['folder'])
            except:
                pass
        elif img_03_status == "unchanged":
            if is_editing == "True":
                try:
                    os.makedirs(app.config['TMP_IMG_DIRECTORY'] + "animal/" + img_03_data_old_json['folder'],
                                exist_ok=True)
                    shutil.copy(
                        app.config['IMG_DIRECTORY'] + "animal/" + img_03_data_old_json['folder'] + "/origin/" +
                        img_03_data_old_json['filename'],
                        app.config['TMP_IMG_DIRECTORY'] + "animal/" + img_03_data_old_json['folder'] + "/" +
                        img_03_data_old_json['filename']
                    )
                except:
                    img_03_data = "false"
            else:
                pass
        else:
            img_03_data = "false"
        # End IMG 03

        # Start IMG 04
        img_04_data_old_json = None
        try:
            img_04_data_old_json = json.loads(img_04_data_old)
        except:
            pass
        if img_04_status == "rm":
            img_04_data = "false"
            try:
                shutil.rmtree(app.config['IMG_DIRECTORY'] + "animal/" + img_04_data_old_json['folder'])
            except:
                pass
        elif img_04_status == "editing":
            img_data_list.append(img_04_data)
            try:
                os.makedirs(app.config['TMP_IMG_DIRECTORY'] + "animal/" + img_04_data_old_json['folder'],
                            exist_ok=True)
                shutil.copy(
                    app.config['IMG_DIRECTORY'] + "animal/" + img_04_data_old_json['folder'] + "/origin/" +
                    img_04_data_old_json['filename'],
                    app.config['TMP_IMG_DIRECTORY'] + "animal/" + img_04_data_old_json['folder'] + "/" +
                    img_04_data_old_json['filename']
                )
            except:
                pass
        elif img_04_status == "new":
            if img_04_data:
                img_data_list.append(img_04_data)
            else:
                img_04_data = "false"

            try:
                shutil.rmtree(app.config['IMG_DIRECTORY'] + "animal/" + img_04_data_old_json['folder'])
            except:
                pass
        elif img_04_status == "unchanged":
            if is_editing == "True":
                try:
                    os.makedirs(app.config['TMP_IMG_DIRECTORY'] + "animal/" + img_04_data_old_json['folder'],
                                exist_ok=True)
                    shutil.copy(
                        app.config['IMG_DIRECTORY'] + "animal/" + img_04_data_old_json['folder'] + "/origin/" +
                        img_04_data_old_json['filename'],
                        app.config['TMP_IMG_DIRECTORY'] + "animal/" + img_04_data_old_json['folder'] + "/" +
                        img_04_data_old_json['filename']
                    )
                except:
                    img_04_data = "false"
            else:
                pass
        else:
            img_04_data = "false"
        # End IMG 04

        # Start IMG 05
        img_05_data_old_json = None
        try:
            img_05_data_old_json = json.loads(img_05_data_old)
        except:
            pass
        if img_05_status == "rm":
            img_05_data = "false"
            try:
                shutil.rmtree(app.config['IMG_DIRECTORY'] + "animal/" + img_05_data_old_json['folder'])
            except:
                pass
        elif img_05_status == "editing":
            img_data_list.append(img_05_data)
            try:
                os.makedirs(app.config['TMP_IMG_DIRECTORY'] + "animal/" + img_05_data_old_json['folder'],
                            exist_ok=True)
                shutil.copy(
                    app.config['IMG_DIRECTORY'] + "animal/" + img_05_data_old_json['folder'] + "/origin/" +
                    img_05_data_old_json['filename'],
                    app.config['TMP_IMG_DIRECTORY'] + "animal/" + img_05_data_old_json['folder'] + "/" +
                    img_05_data_old_json['filename']
                )
            except:
                pass
        elif img_05_status == "new":
            if img_05_data:
                img_data_list.append(img_05_data)
            else:
                img_05_data = "false"

            try:
                shutil.rmtree(app.config['IMG_DIRECTORY'] + "animal/" + img_05_data_old_json['folder'])
            except:
                pass
        elif img_05_status == "unchanged":
            if is_editing == "True":
                try:
                    os.makedirs(app.config['TMP_IMG_DIRECTORY'] + "animal/" + img_05_data_old_json['folder'],
                                exist_ok=True)
                    shutil.copy(
                        app.config['IMG_DIRECTORY'] + "animal/" + img_05_data_old_json['folder'] + "/origin/" +
                        img_05_data_old_json['filename'],
                        app.config['TMP_IMG_DIRECTORY'] + "animal/" + img_05_data_old_json['folder'] + "/" +
                        img_05_data_old_json['filename']
                    )
                except:
                    img_05_data = "false"
            else:
                pass
        else:
            img_05_data = "false"
        # End IMG 05

        # Start IMG 06
        img_06_data_old_json = None
        try:
            img_06_data_old_json = json.loads(img_06_data_old)
        except:
            pass
        if img_06_status == "rm":
            img_06_data = "false"
            try:
                shutil.rmtree(app.config['IMG_DIRECTORY'] + "animal/" + img_06_data_old_json['folder'])
            except:
                pass
        elif img_06_status == "editing":
            img_data_list.append(img_06_data)
            try:
                os.makedirs(app.config['TMP_IMG_DIRECTORY'] + "animal/" + img_06_data_old_json['folder'],
                            exist_ok=True)
                shutil.copy(
                    app.config['IMG_DIRECTORY'] + "animal/" + img_06_data_old_json['folder'] + "/origin/" +
                    img_06_data_old_json['filename'],
                    app.config['TMP_IMG_DIRECTORY'] + "animal/" + img_06_data_old_json['folder'] + "/" +
                    img_06_data_old_json['filename']
                )
            except:
                pass
        elif img_06_status == "new":
            if img_06_data:
                img_data_list.append(img_06_data)
            else:
                img_06_data = "false"

            try:
                shutil.rmtree(app.config['IMG_DIRECTORY'] + "animal/" + img_06_data_old_json['folder'])
            except:
                pass
        elif img_06_status == "unchanged":
            if is_editing == "True":
                try:
                    os.makedirs(app.config['TMP_IMG_DIRECTORY'] + "animal/" + img_06_data_old_json['folder'],
                                exist_ok=True)
                    shutil.copy(
                        app.config['IMG_DIRECTORY'] + "animal/" + img_06_data_old_json['folder'] + "/origin/" +
                        img_06_data_old_json['filename'],
                        app.config['TMP_IMG_DIRECTORY'] + "animal/" + img_06_data_old_json['folder'] + "/" +
                        img_06_data_old_json['filename']
                    )
                except:
                    img_06_data = "false"
            else:
                pass
        else:
            img_06_data = "false"
        # End IMG 06

        # Start IMG 07
        img_07_data_old_json = None
        try:
            img_07_data_old_json = json.loads(img_07_data_old)
        except:
            pass
        if img_07_status == "rm":
            img_07_data = "false"
            try:
                shutil.rmtree(app.config['IMG_DIRECTORY'] + "animal/" + img_07_data_old_json['folder'])
            except:
                pass
        elif img_07_status == "editing":
            img_data_list.append(img_07_data)
            try:
                os.makedirs(app.config['TMP_IMG_DIRECTORY'] + "animal/" + img_07_data_old_json['folder'],
                            exist_ok=True)
                shutil.copy(
                    app.config['IMG_DIRECTORY'] + "animal/" + img_07_data_old_json['folder'] + "/origin/" +
                    img_07_data_old_json['filename'],
                    app.config['TMP_IMG_DIRECTORY'] + "animal/" + img_07_data_old_json['folder'] + "/" +
                    img_07_data_old_json['filename']
                )
            except:
                pass
        elif img_07_status == "new":
            if img_07_data:
                img_data_list.append(img_07_data)
            else:
                img_07_data = "false"

            try:
                shutil.rmtree(app.config['IMG_DIRECTORY'] + "animal/" + img_07_data_old_json['folder'])
            except:
                pass
        elif img_07_status == "unchanged":
            if is_editing == "True":
                try:
                    os.makedirs(app.config['TMP_IMG_DIRECTORY'] + "animal/" + img_07_data_old_json['folder'],
                                exist_ok=True)
                    shutil.copy(
                        app.config['IMG_DIRECTORY'] + "animal/" + img_07_data_old_json['folder'] + "/origin/" +
                        img_07_data_old_json['filename'],
                        app.config['TMP_IMG_DIRECTORY'] + "animal/" + img_07_data_old_json['folder'] + "/" +
                        img_07_data_old_json['filename']
                    )
                except:
                    img_07_data = "false"
            else:
                pass
        else:
            img_07_data = "false"
        # End IMG 07

        # Start IMG 08
        img_08_data_old_json = None
        try:
            img_08_data_old_json = json.loads(img_08_data_old)
        except:
            pass
        if img_08_status == "rm":
            img_08_data = "false"
            try:
                shutil.rmtree(app.config['IMG_DIRECTORY'] + "animal/" + img_08_data_old_json['folder'])
            except:
                pass
        elif img_08_status == "editing":
            img_data_list.append(img_08_data)
            try:
                os.makedirs(app.config['TMP_IMG_DIRECTORY'] + "animal/" + img_08_data_old_json['folder'],
                            exist_ok=True)
                shutil.copy(
                    app.config['IMG_DIRECTORY'] + "animal/" + img_08_data_old_json['folder'] + "/origin/" +
                    img_08_data_old_json['filename'],
                    app.config['TMP_IMG_DIRECTORY'] + "animal/" + img_08_data_old_json['folder'] + "/" +
                    img_08_data_old_json['filename']
                )
            except:
                pass
        elif img_08_status == "new":
            if img_08_data:
                img_data_list.append(img_08_data)
            else:
                img_08_data = "false"

            try:
                shutil.rmtree(app.config['IMG_DIRECTORY'] + "animal/" + img_08_data_old_json['folder'])
            except:
                pass
        elif img_08_status == "unchanged":
            if is_editing == "True":
                try:
                    os.makedirs(app.config['TMP_IMG_DIRECTORY'] + "animal/" + img_08_data_old_json['folder'],
                                exist_ok=True)
                    shutil.copy(
                        app.config['IMG_DIRECTORY'] + "animal/" + img_08_data_old_json['folder'] + "/origin/" +
                        img_08_data_old_json['filename'],
                        app.config['TMP_IMG_DIRECTORY'] + "animal/" + img_08_data_old_json['folder'] + "/" +
                        img_08_data_old_json['filename']
                    )
                except:
                    img_08_data = "false"
            else:
                pass
        else:
            img_08_data = "false"
        # End IMG 08

        # Start IMG 09
        img_09_data_old_json = None
        try:
            img_09_data_old_json = json.loads(img_09_data_old)
        except:
            pass
        if img_09_status == "rm":
            img_09_data = "false"
            try:
                shutil.rmtree(app.config['IMG_DIRECTORY'] + "animal/" + img_09_data_old_json['folder'])
            except:
                pass
        elif img_09_status == "editing":
            img_data_list.append(img_09_data)
            try:
                os.makedirs(app.config['TMP_IMG_DIRECTORY'] + "animal/" + img_09_data_old_json['folder'],
                            exist_ok=True)
                shutil.copy(
                    app.config['IMG_DIRECTORY'] + "animal/" + img_09_data_old_json['folder'] + "/origin/" +
                    img_09_data_old_json['filename'],
                    app.config['TMP_IMG_DIRECTORY'] + "animal/" + img_09_data_old_json['folder'] + "/" +
                    img_09_data_old_json['filename']
                )
            except:
                pass
        elif img_09_status == "new":
            if img_09_data:
                img_data_list.append(img_09_data)
            else:
                img_09_data = "false"

            try:
                shutil.rmtree(app.config['IMG_DIRECTORY'] + "animal/" + img_09_data_old_json['folder'])
            except:
                pass
        elif img_09_status == "unchanged":
            if is_editing == "True":
                try:
                    os.makedirs(app.config['TMP_IMG_DIRECTORY'] + "animal/" + img_09_data_old_json['folder'],
                                exist_ok=True)
                    shutil.copy(
                        app.config['IMG_DIRECTORY'] + "animal/" + img_09_data_old_json['folder'] + "/origin/" +
                        img_09_data_old_json['filename'],
                        app.config['TMP_IMG_DIRECTORY'] + "animal/" + img_09_data_old_json['folder'] + "/" +
                        img_09_data_old_json['filename']
                    )
                except:
                    img_09_data = "false"
            else:
                pass
        else:
            img_09_data = "false"
        # End IMG 09

        # Start IMG 10
        img_10_data_old_json = None
        try:
            img_10_data_old_json = json.loads(img_10_data_old)
        except:
            pass
        if img_10_status == "rm":
            img_10_data = "false"
            try:
                shutil.rmtree(app.config['IMG_DIRECTORY'] + "animal/" + img_10_data_old_json['folder'])
            except:
                pass
        elif img_10_status == "editing":
            img_data_list.append(img_10_data)
            try:
                os.makedirs(app.config['TMP_IMG_DIRECTORY'] + "animal/" + img_10_data_old_json['folder'],
                            exist_ok=True)
                shutil.copy(
                    app.config['IMG_DIRECTORY'] + "animal/" + img_10_data_old_json['folder'] + "/origin/" +
                    img_10_data_old_json['filename'],
                    app.config['TMP_IMG_DIRECTORY'] + "animal/" + img_10_data_old_json['folder'] + "/" +
                    img_10_data_old_json['filename']
                )
            except:
                pass
        elif img_10_status == "new":
            if img_10_data:
                img_data_list.append(img_10_data)
            else:
                img_10_data = "false"

            try:
                shutil.rmtree(app.config['IMG_DIRECTORY'] + "animal/" + img_10_data_old_json['folder'])
            except:
                pass
        elif img_10_status == "unchanged":
            if is_editing == "True":
                try:
                    os.makedirs(app.config['TMP_IMG_DIRECTORY'] + "animal/" + img_10_data_old_json['folder'],
                                exist_ok=True)
                    shutil.copy(
                        app.config['IMG_DIRECTORY'] + "animal/" + img_10_data_old_json['folder'] + "/origin/" +
                        img_10_data_old_json['filename'],
                        app.config['TMP_IMG_DIRECTORY'] + "animal/" + img_10_data_old_json['folder'] + "/" +
                        img_10_data_old_json['filename']
                    )
                except:
                    img_10_data = "false"
            else:
                pass
        else:
            img_10_data = "false"
        # End IMG 10

        for seq in range(len(img_data_list)):
            img_data = json.loads(img_data_list[seq])

            tmp = app.config['TMP_IMG_DIRECTORY'] + "animal/"
            media = os.path.join(_static, "images/animal/")
            folder = img_data['folder']
            filename = img_data['filename']
            aspect_ratio = img_data['aspectRatio']
            x = img_data['x']
            y = img_data['y']
            x2 = img_data['x2']
            y2 = img_data['y2']
            rotate = img_data['rotate']
            scale_x = img_data['scaleX']
            scale_y = img_data['scaleY']

            os.makedirs(media + folder + "/", exist_ok=True)
            os.makedirs(media + folder + "/origin", exist_ok=True)
            os.makedirs(media + folder + "/cropped", exist_ok=True)
            media_origin = Image.open(tmp + folder + "/" + filename)

            media_cropped = media_origin.crop((x, y, x2, y2))
            media_cropped = media_cropped.convert('RGB')
            if aspect_ratio == 1:
                width = 350
                height = 350
                media_cropped = media_cropped.resize((width, height), Image.ANTIALIAS)
            elif aspect_ratio == 1.7777777777777777:
                watermark_1280_720 = Image.open(app.config['IMG_DIRECTORY'] + 'layout/watermark-1280-720.png')
                width = 1280
                height = width * 9 // 16
                media_cropped = media_cropped.resize((width, height), Image.ANTIALIAS)
                media_cropped.paste(watermark_1280_720, (0, 0), watermark_1280_720)
                watermark_1280_720.close()
            else:
                width = 720
                height = width * 3 // 2
                media_cropped = media_cropped.resize((width, height), Image.ANTIALIAS)

            media_cropped.save(media + folder + "/cropped/" + filename, format='JPEG', subsampling=0,
                               quality=75)
            shutil.copy(tmp + folder + "/" + filename, media + folder + "/" + "/origin/")
            #  shutil.rmtree(tmp + folder)

        video_01_data_old_json = None
        if is_editing == "True":
            try:
                video_01_data_old_json = json.loads(video_01_data_old)
            except:
                pass

            if os.path.isdir(app.config['VIDEO_DIRECTORY'] + "animal/" + video_01_data_old_json['folder'] + "/origin/"):
                try:
                    os.makedirs(app.config['TMP_VIDEO_DIRECTORY'] + "animal/" + video_01_data_old_json['folder'],
                                exist_ok=True)
                    shutil.copy(
                        app.config['VIDEO_DIRECTORY'] + "animal/" + video_01_data_old_json['folder'] + "/origin/" +
                        video_01_data_old_json['filename'],
                        app.config['TMP_VIDEO_DIRECTORY'] + "animal/" + video_01_data_old_json['folder'] + "/" +
                        video_01_data_old_json['filename']
                    )
                except:
                    pass

                try:
                    os.makedirs(
                        app.config['TMP_VIDEO_DIRECTORY'] + "animal/" + video_01_data_old_json['folder'] + "/cropped",
                        exist_ok=True)

                    if img_01_data != "":
                        img_01_data = json.loads(img_01_data)
                        shutil.copy(
                            app.config['IMG_DIRECTORY'] + "animal/" + img_01_data['folder'] + "/cropped/" + img_01_data[
                                'filename'],
                            app.config['TMP_VIDEO_DIRECTORY'] + "animal/" + video_01_data_old_json[
                                'folder'] + "/cropped/" + img_01_data['filename']
                        )

                    if img_02_data != "":
                        img_02_data = json.loads(img_02_data)
                        shutil.copy(
                            app.config['IMG_DIRECTORY'] + "animal/" + img_02_data['folder'] + "/cropped/" + img_02_data[
                                'filename'],
                            app.config['TMP_VIDEO_DIRECTORY'] + "animal/" + video_01_data_old_json[
                                'folder'] + "/cropped/" + img_02_data['filename']
                        )

                    if img_03_data != "":
                        img_03_data = json.loads(img_03_data)
                        shutil.copy(
                            app.config['IMG_DIRECTORY'] + "animal/" + img_03_data['folder'] + "/cropped/" + img_03_data[
                                'filename'],
                            app.config['TMP_VIDEO_DIRECTORY'] + "animal/" + video_01_data_old_json[
                                'folder'] + "/cropped/" + img_03_data['filename']
                        )

                    if img_04_data != "":
                        img_04_data = json.loads(img_04_data)
                        shutil.copy(
                            app.config['IMG_DIRECTORY'] + "animal/" + img_04_data['folder'] + "/cropped/" + img_04_data[
                                'filename'],
                            app.config['TMP_VIDEO_DIRECTORY'] + "animal/" + video_01_data_old_json[
                                'folder'] + "/cropped/" + img_04_data['filename']
                        )

                    if img_05_data != "":
                        img_05_data = json.loads(img_05_data)
                        shutil.copy(
                            app.config['IMG_DIRECTORY'] + "animal/" + img_05_data['folder'] + "/cropped/" + img_05_data[
                                'filename'],
                            app.config['TMP_VIDEO_DIRECTORY'] + "animal/" + video_01_data_old_json[
                                'folder'] + "/cropped/" + img_05_data['filename']
                        )

                    if img_06_data != "":
                        img_06_data = json.loads(img_06_data)
                        shutil.copy(
                            app.config['IMG_DIRECTORY'] + "animal/" + img_06_data['folder'] + "/cropped/" + img_06_data[
                                'filename'],
                            app.config['TMP_VIDEO_DIRECTORY'] + "animal/" + video_01_data_old_json[
                                'folder'] + "/cropped/" + img_06_data['filename']
                        )

                    if img_07_data != "":
                        img_07_data = json.loads(img_07_data)
                        shutil.copy(
                            app.config['IMG_DIRECTORY'] + "animal/" + img_07_data['folder'] + "/cropped/" + img_07_data[
                                'filename'],
                            app.config['TMP_VIDEO_DIRECTORY'] + "animal/" + video_01_data_old_json[
                                'folder'] + "/cropped/" + img_07_data['filename']
                        )

                    if img_08_data != "":
                        img_08_data = json.loads(img_08_data)
                        shutil.copy(
                            app.config['IMG_DIRECTORY'] + "animal/" + img_08_data['folder'] + "/cropped/" + img_08_data[
                                'filename'],
                            app.config['TMP_VIDEO_DIRECTORY'] + "animal/" + video_01_data_old_json[
                                'folder'] + "/cropped/" + img_08_data['filename']
                        )

                    if img_09_data != "":
                        img_09_data = json.loads(img_09_data)
                        shutil.copy(
                            app.config['IMG_DIRECTORY'] + "animal/" + img_09_data['folder'] + "/cropped/" + img_09_data[
                                'filename'],
                            app.config['TMP_VIDEO_DIRECTORY'] + "animal/" + video_01_data_old_json[
                                'folder'] + "/cropped/" + img_09_data['filename']
                        )

                    if img_10_data != "":
                        img_10_data = json.loads(img_10_data)
                        shutil.copy(
                            app.config['IMG_DIRECTORY'] + "animal/" + img_10_data['folder'] + "/cropped/" + img_10_data[
                                'filename'],
                            app.config['TMP_VIDEO_DIRECTORY'] + "animal/" + video_01_data_old_json[
                                'folder'] + "/cropped/" + img_10_data['filename']
                        )

                except:
                    pass

            try:
                shutil.rmtree(app.config['VIDEO_DIRECTORY'] + "animal/" + video_01_data_old_json['folder'])
            except:
                pass

        if video_01_status == "unchanged":
            video_01_data = {"folder": video_01_data_old_json['folder']}
        elif video_01_status == "new":
            video_01_data = json.loads(r_data['video_01_data'])
        else:
            now = datetime.now()
            timestamp = datetime.timestamp(now)
            tmp = app.config['TMP_VIDEO_DIRECTORY'] + "animal/"
            folder = str(uuid.uuid4()) + "-" + str(timestamp)
            path = tmp + folder
            os.makedirs(path, exist_ok=True)
            os.makedirs(path + "/cropped", exist_ok=True)
            os.makedirs(path + "/origin", exist_ok=True)

            video_01_data = {"folder": folder}

            url = app.config['API_SERVER_URL'] + "/uploading-animal-only-images-video"
            headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
            payload = {
                "video_id": r_data['animal_video_id'],
                "video_folder": folder
            }
            r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        create_movie(category_name=category_id_name, subcategory_name=subcategory_id_name, animal_name=name,
                     animal_gender=gender_en, animal_color=color_en, animal_age_year=age_year,
                     animal_age_month=age_month, animal_age_day=age_day, animal_mother=mother, animal_father=father,
                     animal_img_01=img_01_data, animal_img_02=img_02_data,
                     animal_img_03=img_03_data, animal_img_04=img_04_data, animal_img_05=img_05_data,
                     animal_img_06=img_06_data, animal_img_07=img_07_data, animal_img_08=img_08_data,
                     animal_img_09=img_09_data, animal_img_10=img_10_data,
                     path=app.config['TMP_VIDEO_DIRECTORY'] + "animal/" + video_01_data['folder'],
                     folder=video_01_data['folder'], is_tmp=True, animal_id=animal_id)

        # Start Medical Paper PDF
        medical_paper_data_old_json = None
        try:
            medical_paper_data_old_json = json.loads(medical_paper_data_old)
        except:
            pass
        if medical_paper_status == "rm":
            try:
                shutil.rmtree(app.config['PDF_DIRECTORY'] + "animal/" + medical_paper_data_old_json['folder'])
            except:
                pass
        elif medical_paper_status == "unchanged":
            pass
        elif medical_paper_status == "new":
            medical_paper_data = json.loads(r_data['medical_paper_data'])

            medical_paper_folder = medical_paper_data['folder']
            medical_paper_filename = medical_paper_data['filename']

            os.makedirs(app.config['PDF_DIRECTORY'] + "animal/" + medical_paper_folder, exist_ok=True)
            shutil.copy(
                app.config['TMP_PDF_DIRECTORY'] + "animal/" + medical_paper_folder + "/" + medical_paper_filename,
                app.config['PDF_DIRECTORY'] + "animal/" + medical_paper_folder + "/" + medical_paper_filename)

            try:
                shutil.rmtree(app.config['PDF_DIRECTORY'] + "animal/" + medical_paper_data_old_json['folder'])
            except:
                pass
        else:
            pass
        # End Medical Paper PDF

        # Start Breed Registry PDF
        breed_registry_data_old_json = None
        try:
            breed_registry_data_old_json = json.loads(breed_registry_data_old)
        except:
            pass
        if breed_registry_status == "rm":
            try:
                shutil.rmtree(app.config['PDF_DIRECTORY'] + "animal/" + breed_registry_data_old_json['folder'])
            except:
                pass
        elif breed_registry_status == "unchanged":
            pass
        elif breed_registry_status == "new":
            breed_registry_data = json.loads(r_data['breed_registry_data'])

            breed_registry_folder = breed_registry_data['folder']
            breed_registry_filename = breed_registry_data['filename']

            os.makedirs(app.config['PDF_DIRECTORY'] + "animal/" + breed_registry_folder, exist_ok=True)
            shutil.copy(
                app.config['TMP_PDF_DIRECTORY'] + "animal/" + breed_registry_folder + "/" + breed_registry_filename,
                app.config['PDF_DIRECTORY'] + "animal/" + breed_registry_folder + "/" + breed_registry_filename)

            try:
                shutil.rmtree(app.config['PDF_DIRECTORY'] + "animal/" + breed_registry_data_old_json['folder'])
            except:
                pass
        else:
            pass
        # End Breed Registry PDF

        # Start X Ray PDF
        x_ray_data_old_json = None
        try:
            x_ray_data_old_json = json.loads(x_ray_data_old)
        except:
            pass
        if x_ray_status == "rm":
            try:
                shutil.rmtree(app.config['PDF_DIRECTORY'] + "animal/" + x_ray_data_old_json['folder'])
            except:
                pass
        elif x_ray_status == "unchanged":
            pass
        elif x_ray_status == "new":
            x_ray_data = json.loads(r_data['x_ray_data'])

            x_ray_folder = x_ray_data['folder']
            x_ray_filename = x_ray_data['filename']

            os.makedirs(app.config['PDF_DIRECTORY'] + "animal/" + x_ray_folder, exist_ok=True)
            shutil.copy(
                app.config['TMP_PDF_DIRECTORY'] + "animal/" + x_ray_folder + "/" + x_ray_filename,
                app.config['PDF_DIRECTORY'] + "animal/" + x_ray_folder + "/" + x_ray_filename)

            try:
                shutil.rmtree(app.config['PDF_DIRECTORY'] + "animal/" + x_ray_data_old_json['folder'])
            except:
                pass
        else:
            pass
        # End X Ray PDF

        data = {"status": 'success', 'message': r.json()}
        return make_response(jsonify(data), 200)
    else:
        data = {"status": 'error', 'message': r.json()}
        return make_response(jsonify(data), 400)


@app.route('/uploading-animal-img-upload', methods=['POST'])
def uploading_animal_img_upload():
    if g.logged_in:
        if 'file' not in request.files:
            return make_response(jsonify('{"status": "errors", "data": "Not Found"}'), 404)

        file_data = request.files['file']

        if file_data.filename == '':
            return make_response(jsonify('{"status": "errors", "data": "Not Found"}'), 404)

        if not File.allowed_file(file_data.filename):
            return make_response(jsonify('{"status": "errors", "data": "Unsupported Media Type"}'), 415)

        file_length = request.content_length

        if file_length is not None and file_length > app.config['MAX_CONTENT_LENGTH_IMG']:
            return make_response(jsonify('{"status": "errors", "data": "Request Entity Too Large"}'), 413)

        if uploading_animal_img_upload and File.allowed_file(file_data.filename):
            now = datetime.now()
            timestamp = datetime.timestamp(now)

            tmp = app.config['TMP_IMG_DIRECTORY'] + "animal/"
            folder = str(uuid.uuid4()) + "-" + str(timestamp)
            path = tmp + folder
            os.makedirs(path)

            session['tmp_animal_img'] = os.path.join(
                "/static/images/tmp/animal/" + folder, folder + ".jpg")
            file_data.save(os.path.join(path, folder + ".jpg"))

            media_origin = Image.open(os.path.join(path, folder + ".jpg"))
            media_width, media_height = media_origin.size

            end_time_tmp = now - timedelta(hours=1)
            for x in os.listdir(tmp):
                if x != ".gitkeep":
                    if datetime.fromtimestamp(os.path.getmtime(tmp + "/" + x)) < end_time_tmp:
                        shutil.rmtree(tmp + "/" + x)

            resp = {"status": "success", "data": session.get('tmp_animal_img'), "folder": folder,
                    "filename": folder + ".jpg", "width": media_width, "height": media_height}
            return make_response(jsonify(resp), 200)


def create_movie(category_name, subcategory_name, animal_name, animal_gender, animal_color, animal_age_year,
                 animal_age_month, animal_age_day, animal_mother, animal_father, animal_img_01, animal_img_02,
                 animal_img_03, animal_img_04, animal_img_05, animal_img_06, animal_img_07, animal_img_08,
                 animal_img_09, animal_img_10, path, folder, is_tmp, animal_id):
    try:
        animal_img_01 = json.loads(animal_img_01)
    except:
        pass

    try:
        animal_img_02 = json.loads(animal_img_02)
    except:
        pass

    try:
        animal_img_03 = json.loads(animal_img_03)
    except:
        pass

    try:
        animal_img_04 = json.loads(animal_img_04)
    except:
        pass

    try:
        animal_img_05 = json.loads(animal_img_05)
    except:
        pass

    try:
        animal_img_06 = json.loads(animal_img_06)
    except:
        pass

    try:
        animal_img_07 = json.loads(animal_img_07)
    except:
        pass

    try:
        animal_img_08 = json.loads(animal_img_08)
    except:
        pass

    try:
        animal_img_09 = json.loads(animal_img_09)
    except:
        pass

    try:
        animal_img_10 = json.loads(animal_img_10)
    except:
        pass

    audio_input = mp.AudioFileClip(app.config['SOUND_DIRECTORY'] + "/Full House Dusk.mp3")

    video_input = None
    video_output = None
    video_output_end = None
    video_output_duration = None

    try:
        video_input = mp.VideoFileClip(os.path.join(path, folder + ".mp4"), audio=False)

        if video_input.w > video_input.h:
            video_output = video_input.resize((1920, 1080)).set_start(5)
        else:
            video_output = video_input.resize(height=1080).set_start(5).set_pos(("center", "center"))
        video_output_end = video_output.end
        video_output_duration = video_output.duration
    except:
        video_output_end = 5
        video_output_duration = 0

    #  Start First Background
    first_background = (mp.ImageClip(app.config['IMG_DIRECTORY'] + 'layout/first-background-video.png')
                        .set_start(0)
                        .set_duration(5)
                        .set_pos(("left", "top")))
    #  End First Background

    # Start First Background IMG
    if animal_img_01 is not False:
        try:
            animal_img_01_origin = Image.open(
                app.config['TMP_IMG_DIRECTORY'] + "animal/" + animal_img_01['folder'] + "/" + animal_img_01['filename'])
        except:
            animal_img_01_origin = Image.open(
                app.config['IMG_DIRECTORY'] + "animal/" + animal_img_01['folder'] + "/origin/" + animal_img_01[
                    'filename'])
        animal_img_01_cropped = animal_img_01_origin.crop(
            (animal_img_01['x'], animal_img_01['y'], animal_img_01['x2'], animal_img_01['y2']))
        animal_img_01_cropped = animal_img_01_cropped.convert('RGB')
        animal_img_01_cropped = animal_img_01_cropped.resize((935, 527), Image.ANTIALIAS)
        animal_img_01_cropped.save(path + "/cropped/" + animal_img_01['filename'], format='JPEG',
                                   subsampling=0, quality=75)
        first_background_img = (mp.ImageClip(path + "/cropped/" + animal_img_01['filename'])
                                .set_start(0)
                                .set_duration(first_background.duration)
                                .set_pos((15, 277)))
        animal_img_01_origin.close()
    else:
        first_background_img = (mp.ImageClip(app.config['IMG_DIRECTORY'] + 'layout/first-background-video-img.png')
                                .set_start(0)
                                .set_duration(first_background.duration)
                                .set_pos((15, 277)))
    # End First Background IMG

    # Start First Background TXT
    fnt40 = ImageFont.truetype(_static + "/fonts/SairaCondensed-Medium.ttf", 40)
    fnt50 = ImageFont.truetype(_static + "/fonts/SairaCondensed-Medium.ttf", 50)
    if animal_mother != "false" and animal_father != "false":
        txt_img = Image.new(mode="RGB", size=(776, 1000), color=(22, 22, 22))
        txt_set_pos = (1019, 15)
    else:
        txt_img = Image.new(mode="RGB", size=(776, 850), color=(22, 22, 22))
        txt_set_pos = (1019, 132)
    txt_img.convert("RGBA")
    txt = ImageDraw.Draw(txt_img)
    txt.text((0, 114), "Name:", font=fnt40, fill=(255, 255, 255, 1))
    txt.text((34, 164), animal_name, font=fnt50, fill=(255, 255, 255, 1))
    txt.text((0, 232), "Breed:", font=fnt40, fill=(255, 255, 255, 1))
    txt.text((34, 282), subcategory_name, font=fnt50, fill=(255, 255, 255, 1))
    txt.text((0, 350), "Gender:", font=fnt40, fill=(255, 255, 255, 1))
    txt.text((34, 400), animal_gender, font=fnt50, fill=(255, 255, 255, 1))
    txt.text((0, 468), "Colour:", font=fnt40, fill=(255, 255, 255, 1))
    txt.text((34, 518), animal_color, font=fnt50, fill=(255, 255, 255, 1))
    txt.text((0, 586), "Age:", font=fnt40, fill=(255, 255, 255, 1))
    try:
        today = datetime.now()
        date1 = datetime(int(animal_age_year), int(animal_age_month), int(animal_age_day))
        date2 = today
        diff = relativedelta.relativedelta(date2, date1)
        years = diff.years
        months = diff.months
        days = diff.days
    except:
        years = 0
        months = 0
        days = 0
    if years == 0 and months == 0:
        txt.text((34, 636), str(days) + " days", font=fnt50,
                 fill=(255, 255, 255, 1))
    elif years == 0 and months != 0:
        txt.text((34, 636), str(months) + " months, " + str(days) + " days", font=fnt50,
                 fill=(255, 255, 255, 1))
    else:
        txt.text((34, 636), str(years) + " years, " + str(months) + " months, " + str(days) + " days", font=fnt50,
                 fill=(255, 255, 255, 1))
    if animal_mother != "false" and animal_father != "false":
        txt.text((0, 704), "Mother:", font=fnt40, fill=(255, 255, 255, 1))
        txt.text((34, 754), animal_mother, font=fnt50, fill=(255, 255, 255, 1))
        txt.text((0, 822), "Father:", font=fnt40, fill=(255, 255, 255, 1))
        txt.text((34, 872), animal_father, font=fnt50, fill=(255, 255, 255, 1))

    txt_img.save(path + "/cropped/txt-img.png", format='PNG',
                 subsampling=0, quality=75)
    txt_show = (mp.ImageClip(path + "/cropped/txt-img.png")
                .set_start(0)
                .set_duration(first_background.duration)
                .set_pos(txt_set_pos))
    # End First Background TXT

    # Start QR Code
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=4,
        border=4,
    )
    if animal_id is not False:
        qr.add_data(
            'https://anlirealestate.com/' + slugify(category_name) + "/" + slugify(subcategory_name) + "/" + slugify(
                animal_name) + "/" + str(animal_id))
    else:
        qr.add_data('https://anlirealestate.com/')
    qr.make(fit=True)

    qr_img_create = qr.make_image(fill_color="white", back_color=(28, 28, 28))
    qr_img_create.save(path + "/cropped/qr_origin.png", format='PNG',
                       subsampling=0, quality=75)

    qr_img_origin = Image.open(path + "/cropped/qr_origin.png")

    """
    qr_img_cropped = qr_img_origin.crop((16, 16, 132, 132))
    qr_img_cropped = qr_img_cropped.convert('RGB')
    qr_img_cropped = qr_img_cropped.resize((100, 100), Image.ANTIALIAS)
    qr_img_cropped.save(path + "/cropped/qr.png", format='PNG', subsampling=0, quality=75)
    """
    qr_img_cropped = qr_img_origin.resize((100, 100), Image.ANTIALIAS)
    qr_img_cropped.save(path + "/cropped/qr.png", format='PNG', subsampling=0, quality=75)

    qr_show = (mp.ImageClip(path + "/cropped/qr.png")
               .set_start(0)
               .set_duration(first_background.duration)
               .set_pos((1795, 25)))
    # End QR Code

    # Start IMG Gallery
    gallery_list = [animal_img_01, animal_img_02, animal_img_03, animal_img_04, animal_img_05, animal_img_06,
                    animal_img_07, animal_img_08, animal_img_09, animal_img_10]
    gallery_show_list = []
    gallery_img_start = 0

    for idx, elem in enumerate(gallery_list):
        if elem is not False:
            try:
                img_origin = Image.open(
                    app.config['TMP_IMG_DIRECTORY'] + "animal/" + elem['folder'] + "/" + elem['filename'])
            except:
                img_origin = Image.open(
                    app.config['IMG_DIRECTORY'] + "animal/" + elem['folder'] + "/origin/" + elem['filename'])
            img_cropped = img_origin.crop((elem['x'], elem['y'], elem['x2'], elem['y2']))
            img_cropped = img_cropped.convert('RGB')
            img_cropped = img_cropped.resize((1920, 1080), Image.ANTIALIAS)
            img_cropped.save(path + "/cropped/" + elem['filename'], format='JPEG',
                             subsampling=0, quality=75)

            if idx == 0:
                elem['folder'] = (mp.ImageClip(path + "/cropped/" + elem['filename'])
                                  .set_start(video_output_end)
                                  .set_duration(5)
                                  .set_pos((0, 0)))
            else:
                gallery_img_start += 4
                elem['folder'] = (mp.ImageClip(path + "/cropped/" + elem['filename'])
                                  .set_start((video_output_end + gallery_img_start))
                                  .set_duration(5)
                                  .set_pos((0, 0))
                                  .fx(mp.transfx.slide_in, 1, 'right'))

            img_origin.close()
            gallery_show_list.append(elem['folder'])
    # End IMG Gallery

    # Start Breeders Logo
    breeders_logo = (mp.ImageClip(app.config['IMG_DIRECTORY'] + 'layout/anli_breeders_logo.png')
                     .set_start(5)
                     .set_duration(video_output_duration + (len(gallery_show_list) * 5) - len(gallery_show_list))
                     .resize(height=125)
                     .margin(right=15, top=15, opacity=0)
                     .set_pos(("right", "top")))
    # End Breeders Logo

    # Start Bottom Links
    bottom_links = (mp.ImageClip(app.config['IMG_DIRECTORY'] + 'layout/video-bottom-link.png')
                    .set_start(5)
                    .set_duration(video_output_duration + (len(gallery_show_list) * 5) - len(gallery_show_list))
                    .set_pos(("left", "bottom")))
    # End Bottom Links

    #  Start Last Background
    last_background = (mp.ImageClip(app.config['IMG_DIRECTORY'] + 'layout/last-background-video.png')
                       .set_start(5 + video_output_duration + (len(gallery_show_list) * 5) - len(gallery_show_list))
                       .set_duration(5)
                       .set_pos(("left", "top")))
    #  End Last Background

    # Start Mixed Clips
    if video_output is not None:
        clips = [
            first_background,
            first_background_img,
            txt_show,
            qr_show,
            video_output,
            breeders_logo,
            bottom_links
        ]
    else:
        clips = [
            first_background,
            first_background_img,
            txt_show,
            qr_show,
            breeders_logo,
            bottom_links
        ]
    for gallery in gallery_show_list:
        clips.append(gallery)
    clips.append(breeders_logo)
    clips.append(bottom_links)
    clips.append(last_background)
    video_final = mp.CompositeVideoClip(
        clips,
        size=(1920, 1080), bg_color=(76, 97, 128))
    # End Mixed Clips

    video_final.fps = 24

    # Start Write Video
    video_final.audio = mp.afx.audio_loop(audio_input, duration=video_final.duration)
    video_final.write_videofile(os.path.join(path + "/cropped", folder + ".mp4"), threads=4,
                                codec="libx264", preset="ultrafast",
                                temp_audiofile=path + "/" + folder + ".mp3", logger=movie_logger)
    # End Write Video

    if is_tmp is True:
        os.makedirs(app.config['VIDEO_DIRECTORY'] + "animal/" + folder + "/cropped", exist_ok=True)

        try:
            os.makedirs(app.config['VIDEO_DIRECTORY'] + "animal/" + folder + "/origin", exist_ok=True)
            shutil.copy(app.config['TMP_VIDEO_DIRECTORY'] + "animal/" + folder + "/" + folder + ".mp4",
                        app.config['VIDEO_DIRECTORY'] + "animal/" + folder + "/origin/" + folder + ".mp4")
        except:
            pass

        shutil.copy(path + "/cropped/" + folder + ".mp4",
                    app.config['VIDEO_DIRECTORY'] + "animal/" + folder + "/cropped/" + folder + ".mp4")

        video_cover_img = Image.fromarray(video_final.get_frame(1))
        video_cover_img.save(app.config['TMP_VIDEO_DIRECTORY'] + "animal/" + folder + "/cropped/video-cover.png",
                             format='PNG',
                             subsampling=0, quality=75)
        shutil.copy(path + "/cropped/video-cover.png",
                    app.config['VIDEO_DIRECTORY'] + "animal/" + folder + "/cropped/video-cover.png")

        # Start YouTube Upload
        youtube_file = app.config['VIDEO_DIRECTORY'] + "animal/" + folder + "/cropped/" + folder + ".mp4"
        youtube_cover = app.config['VIDEO_DIRECTORY'] + "animal/" + folder + "/cropped/video-cover.png"
        YouTube.upload(animal_id=animal_id, file=youtube_file, youtube_cover=youtube_cover, category_name=category_name,
                       subcategory_name=subcategory_name)
        # End YouTube Upload
    else:
        pass

    first_background.close()
    first_background_img.close()
    txt_show.close()
    breeders_logo.close()
    bottom_links.close()
    last_background.close()
    try:
        video_input.close()
        video_output.close()
    except:
        pass
    audio_input.close()
    video_final.close()

    redispy = redis.Redis(host='localhost', port=6379, db=0)
    redispy.delete('videoLogger-' + str(g.permission['is_user_login']['user_profile']['username']))

    resp = {"status": "success", "data": session.get('tmp_animal_video'), "folder": folder,
            "filename": folder + ".mp4"}
    return make_response(jsonify(resp), 200)


def movie_start_time():
    return datetime.now().strftime("%H:%M:%S")


class MovieLogger(proglog.TqdmProgressBarLogger):
    start_time = movie_start_time()
    redispy = redis.Redis(host='localhost', port=6379, db=0)

    def callback(self, **changes):
        if len(self.bars):
            try:
                time_now = datetime.now().strftime("%H:%M:%S")

                count_end = next(reversed(self.bars.items()))[1]['total']
                count_now = next(reversed(self.bars.items()))[1]['index']

                time_start_secs = int(self.start_time[0:2]) * 3600 + int(self.start_time[3:5]) * 60 + int(
                    self.start_time[6:8])
                time_now_secs = int(time_now[0:2]) * 3600 + int(time_now[3:5]) * 60 + int(time_now[6:8])

                time_left_secs = (count_end - count_now) * (time_now_secs - time_start_secs) / count_now
                time_left_minutes = time_left_secs / 60
                time_left_hours = time_left_minutes / 60

                percentage = (next(reversed(self.bars.items()))[1]['index'] / next(reversed(self.bars.items()))[1][
                    'total']) * 100

                percentage = int(percentage)
                time_left_hours = int(time_left_hours)
                time_left_minutes = int(time_left_minutes)
                time_left_secs = int(time_left_secs)

                minutes = time_left_secs // 60
                seconds = time_left_secs % 60
                payload = {
                    "percentage": percentage,
                    "minutes": minutes,
                    "seconds": seconds
                }

                # Start file logger
                # tmp_video_directory_logger = app.config['TMP_VIDEO_DIRECTORY'] + "logger/"
                # logger_json = str(g.permission['is_user_login']['user']['id']) + ".json"

                # json_object = json.dumps(payload, indent=4)

                # with open(tmp_video_directory_logger + logger_json, 'w') as f: f.write(json_object)
                # End file logger

                # Start Redis
                self.redispy.set('videoLogger-' + str(g.permission['is_user_login']['user_profile']['username']),
                                 json.dumps(payload))
                # End Redis
            except ZeroDivisionError:
                pass


movie_logger = MovieLogger()


# AJAX
@mod.route('/_movie-logger', methods=['GET'])
def _movie_logger():
    tmp_video_directory_logger = app.config['TMP_VIDEO_DIRECTORY'] + "logger/"
    logger_json = str(g.permission['is_user_login']['user']['id']) + ".json"

    if os.path.exists(tmp_video_directory_logger + logger_json):
        with open(tmp_video_directory_logger + logger_json) as f:
            data = json.load(f)
        data = {"status": 'success', 'message': data}
        return make_response(jsonify(data), 200)
    else:
        data = {"status": 'processing'}
        return make_response(jsonify(data), 202)


@app.route('/uploading-animal-video-upload', methods=['POST'])
def uploading_animal_video_upload():
    category_name = request.form['category_name']
    subcategory_name = request.form['subcategory_name']
    animal_name = request.form['animal_name']
    animal_gender = request.form['animal_gender']
    animal_color = request.form['animal_color']
    animal_age_year = request.form['animal_age_year']
    animal_age_month = request.form['animal_age_month']
    animal_age_day = request.form['animal_age_day']
    animal_mother = request.form['animal_mother']
    animal_father = request.form['animal_father']
    animal_img_01 = request.form['animal_img_01']
    animal_img_02 = request.form['animal_img_02']
    animal_img_03 = request.form['animal_img_03']
    animal_img_04 = request.form['animal_img_04']
    animal_img_05 = request.form['animal_img_05']
    animal_img_06 = request.form['animal_img_06']
    animal_img_07 = request.form['animal_img_07']
    animal_img_08 = request.form['animal_img_08']
    animal_img_09 = request.form['animal_img_09']
    animal_img_10 = request.form['animal_img_10']

    if g.logged_in:
        if 'file' not in request.files:
            return make_response(jsonify('{"status": "errors", "data": "Not Found"}'), 404)

        file_data = request.files['file']

        if file_data.filename == '':
            return make_response(jsonify('{"status": "errors", "data": "Not Found"}'), 404)

        if not FileVideo.allowed_file(file_data.filename):
            return make_response(jsonify('{"status": "errors", "data": "Unsupported Media Type"}'), 415)

        file_length = request.content_length

        if file_length is not None and file_length > app.config['MAX_CONTENT_LENGTH_VIDEO']:
            return make_response(jsonify('{"status": "errors", "data": "Request Entity Too Large"}'), 413)

        if uploading_animal_video_upload and FileVideo.allowed_file(file_data.filename):
            now = datetime.now()
            timestamp = datetime.timestamp(now)

            tmp = app.config['TMP_VIDEO_DIRECTORY'] + "animal/"
            folder = str(uuid.uuid4()) + "-" + str(timestamp)
            path = tmp + folder
            os.makedirs(path, exist_ok=True)
            os.makedirs(path + "/cropped", exist_ok=True)

            session['tmp_animal_video'] = os.path.join(
                "/static/videos/tmp/animal/" + folder + "/cropped/", folder + ".mp4")
            file_data.save(os.path.join(path, folder + "_.mp4"))

            end_time_tmp = now - timedelta(hours=1)
            for x in os.listdir(tmp):
                if x != ".gitkeep":
                    if datetime.fromtimestamp(os.path.getmtime(tmp + "/" + x)) < end_time_tmp:
                        shutil.rmtree(tmp + "/" + x)

            animal_id = False

            # Start ffmpeg
            input_file = os.path.join(path, folder + "_.mp4")
            output_file = str(path + "/" + folder + ".mp4")

            try:
                stream = ffmpeg.input(input_file).filter('fps', fps=25)
                stream = ffmpeg.output(stream, output_file, preset='medium', crf=30)
                ffmpeg.run(stream, overwrite_output=True)
            except:
                pass
            # End ffmpeg

            #  Start moviepy
            return create_movie(category_name, subcategory_name, animal_name, animal_gender, animal_color,
                                animal_age_year,
                                animal_age_month, animal_age_day, animal_mother, animal_father, animal_img_01,
                                animal_img_02,
                                animal_img_03, animal_img_04, animal_img_05, animal_img_06, animal_img_07,
                                animal_img_08,
                                animal_img_09, animal_img_10, path, folder, is_tmp=False,
                                animal_id=animal_id)


@app.route('/uploading-animal-medical-paper-pdf-upload', methods=['POST'])
def uploading_animal_medical_paper_pdf_upload():
    if g.logged_in:
        if 'file' not in request.files:
            return make_response(jsonify('{"status": "errors", "data": "Not Found"}'), 404)

        file_data = request.files['file']

        if file_data.filename == '':
            return make_response(jsonify('{"status": "errors", "data": "Not Found"}'), 404)

        if not FilePDF.allowed_file(file_data.filename):
            return make_response(jsonify('{"status": "errors", "data": "Unsupported Media Type"}'), 415)

        file_length = request.content_length

        if file_length is not None and file_length > app.config['MAX_CONTENT_LENGTH_PDF']:
            return make_response(jsonify('{"status": "errors", "data": "Request Entity Too Large"}'), 413)

        if uploading_animal_img_upload and FilePDF.allowed_file(file_data.filename):
            now = datetime.now()
            timestamp = datetime.timestamp(now)

            tmp = app.config['TMP_PDF_DIRECTORY'] + "animal/"
            folder = str(uuid.uuid4()) + "-" + str(timestamp)
            path = tmp + folder
            os.makedirs(path)

            session['tmp_animal_pdf_medical_paper'] = os.path.join(
                "/static/pdf/tmp/animal/" + folder, folder + ".pdf")
            file_data.save(os.path.join(path, folder + ".pdf"))

            with pikepdf.open(os.path.join(path, folder + ".pdf"), allow_overwriting_input=True) as pdf:
                try:
                    del pdf.Root.Metadata
                except:
                    pass
                with pdf.open_metadata() as meta:
                    meta['dc:title'] = "Medical Certificates"
                pdf.save(os.path.join(path, folder + ".pdf"))

            end_time_tmp = now - timedelta(hours=1)
            for x in os.listdir(tmp):
                if x != ".gitkeep":
                    if datetime.fromtimestamp(os.path.getmtime(tmp + "/" + x)) < end_time_tmp:
                        shutil.rmtree(tmp + "/" + x)

            resp = {"status": "success", "data": session.get('tmp_animal_pdf_medical_paper'), "folder": folder,
                    "filename": folder + ".pdf"}
            return make_response(jsonify(resp), 200)


@app.route('/uploading-animal-breed-registry-pdf-upload', methods=['POST'])
def uploading_animal_breed_registry_pdf_upload():
    if g.logged_in:
        if 'file' not in request.files:
            return make_response(jsonify('{"status": "errors", "data": "Not Found"}'), 404)

        file_data = request.files['file']

        if file_data.filename == '':
            return make_response(jsonify('{"status": "errors", "data": "Not Found"}'), 404)

        if not FilePDF.allowed_file(file_data.filename):
            return make_response(jsonify('{"status": "errors", "data": "Unsupported Media Type"}'), 415)

        file_length = request.content_length

        if file_length is not None and file_length > app.config['MAX_CONTENT_LENGTH_PDF']:
            return make_response(jsonify('{"status": "errors", "data": "Request Entity Too Large"}'), 413)

        if uploading_animal_img_upload and FilePDF.allowed_file(file_data.filename):
            now = datetime.now()
            timestamp = datetime.timestamp(now)

            tmp = app.config['TMP_PDF_DIRECTORY'] + "animal/"
            folder = str(uuid.uuid4()) + "-" + str(timestamp)
            path = tmp + folder
            os.makedirs(path)

            session['tmp_animal_pdf_breed_registry'] = os.path.join(
                "/static/pdf/tmp/animal/" + folder, folder + ".pdf")
            file_data.save(os.path.join(path, folder + ".pdf"))

            with pikepdf.open(os.path.join(path, folder + ".pdf"), allow_overwriting_input=True) as pdf:
                try:
                    del pdf.Root.Metadata
                except:
                    pass
                with pdf.open_metadata() as meta:
                    meta['dc:title'] = "Breed Registry"
                pdf.save(os.path.join(path, folder + ".pdf"))

            end_time_tmp = now - timedelta(hours=1)
            for x in os.listdir(tmp):
                if x != ".gitkeep":
                    if datetime.fromtimestamp(os.path.getmtime(tmp + "/" + x)) < end_time_tmp:
                        shutil.rmtree(tmp + "/" + x)

            resp = {"status": "success", "data": session.get('tmp_animal_pdf_breed_registry'), "folder": folder,
                    "filename": folder + ".pdf"}
            return make_response(jsonify(resp), 200)


@app.route('/uploading-animal-x-ray-pdf-upload', methods=['POST'])
def uploading_animal_x_ray_pdf_upload():
    if g.logged_in:
        if 'file' not in request.files:
            return make_response(jsonify('{"status": "errors", "data": "Not Found"}'), 404)

        file_data = request.files['file']

        if file_data.filename == '':
            return make_response(jsonify('{"status": "errors", "data": "Not Found"}'), 404)

        if not FilePDF.allowed_file(file_data.filename):
            return make_response(jsonify('{"status": "errors", "data": "Unsupported Media Type"}'), 415)

        file_length = request.content_length

        if file_length is not None and file_length > app.config['MAX_CONTENT_LENGTH_PDF']:
            return make_response(jsonify('{"status": "errors", "data": "Request Entity Too Large"}'), 413)

        if uploading_animal_img_upload and FilePDF.allowed_file(file_data.filename):
            now = datetime.now()
            timestamp = datetime.timestamp(now)

            tmp = app.config['TMP_PDF_DIRECTORY'] + "animal/"
            folder = str(uuid.uuid4()) + "-" + str(timestamp)
            path = tmp + folder
            os.makedirs(path)

            session['tmp_animal_pdf_x_ray'] = os.path.join(
                "/static/pdf/tmp/animal/" + folder, folder + ".pdf")
            file_data.save(os.path.join(path, folder + ".pdf"))

            with pikepdf.open(os.path.join(path, folder + ".pdf"), allow_overwriting_input=True) as pdf:
                try:
                    del pdf.Root.Metadata
                except:
                    pass
                with pdf.open_metadata() as meta:
                    meta['dc:title'] = "X-ray"
                pdf.save(os.path.join(path, folder + ".pdf"))

            end_time_tmp = now - timedelta(hours=1)
            for x in os.listdir(tmp):
                if x != ".gitkeep":
                    if datetime.fromtimestamp(os.path.getmtime(tmp + "/" + x)) < end_time_tmp:
                        shutil.rmtree(tmp + "/" + x)

            resp = {"status": "success", "data": session.get('tmp_animal_pdf_x_ray'), "folder": folder,
                    "filename": folder + ".pdf"}
            return make_response(jsonify(resp), 200)


@mod.route('/list-of-uploaded-animals', methods=['GET'])
@mod.route('/list-of-uploaded-animals/page/<page_number>', methods=['GET'])
def list_of_uploaded_animals(page_number=None):
    if page_number is None:
        page_number = 1

    if g.logged_in and g.permission['is_user_login']['user_permission']['subscribed'] == "True":

        try:
            try:
                lang = parse.unquote(request.cookies.get("abBrowserLang")).replace("%22", "").replace('"', '')
            except TypeError:
                lang = "en"
        except TypeError:
            supported_languages = app.config['SUPPORTED_LANGUAGES']
            lang = request.accept_languages.best_match(supported_languages)

        url = app.config['API_SERVER_URL'] + "/list-of-uploaded-animals"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "page_number": page_number,
            "email": g.permission['is_user_login']['user']['email'],
        }
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            animals = r.json().get("data")
            pagination_list = r.json().get("pagination_list")
            pagination = r.json().get("pagination")
            return render_template('authentication/personal/list-of-uploaded-animals.jinja2',
                                   pagination_list=pagination_list,
                                   page_number=pagination['page_number'],
                                   users_limit=pagination['animals_limit'],
                                   users_count=pagination['animals_count'],
                                   pagination_count=pagination['pagination_count'],
                                   pagination_first=pagination['pagination_first'],
                                   pagination_last=pagination['pagination_last'],
                                   pagination_next=pagination['pagination_next'],
                                   pagination_previous=pagination['pagination_previous'],
                                   lang=lang,
                                   animals=animals)
    else:
        return render_template('errorhandler/404.jinja2')


@mod.route('/edit-of-uploaded-animal/<animal_id>', methods=['GET'])
def edit_of_uploaded_animal(animal_id):
    if g.logged_in and g.permission['is_user_login']['user_permission']['subscribed'] == "True" or \
            g.permission['is_user_login']['user_permission']['is_user_management'] == "True":

        try:
            try:
                lang = parse.unquote(request.cookies.get("abBrowserLang")).replace("%22", "").replace('"', '')
            except TypeError:
                lang = "en"
        except TypeError:
            supported_languages = app.config['SUPPORTED_LANGUAGES']
            lang = request.accept_languages.best_match(supported_languages)

        uploading_animal_form = UploadingAnimalForm()

        user_id = request.args.get("id")
        user_name = request.args.get("name")

        url = app.config['API_SERVER_URL'] + "/edit-of-uploaded-animal"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "email": g.permission['is_user_login']['user']['email'],
            "animal_id": animal_id
        }
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            animal = r.json().get("data")[0]

            start_year = datetime.now().year - 100
            end_year = datetime.now().year + 1

            countries_json = io.open(_templates + "/i18n/countries." + lang + ".json", 'r', encoding='utf8')
            countries_read = json.loads(countries_json.read())
            countries = countries_read

            jq = JsonQ(data=countries)
            countries = jq.at("data").sort_by("country", "asc").group_by('region').get()

            uploading_animal_form.user_email.data = animal['user']['user_email']
            uploading_animal_form.animal_id.data = animal['animal']['id']
            uploading_animal_form.category_id.data = animal['animal']['category_id']
            uploading_animal_form.category_id_name.data = animal['category']['name_en']
            uploading_animal_form.subcategory_id.data = animal['animal']['subcategory_id']
            uploading_animal_form.subcategory_id_name.data = animal['subcategory']['name_en']
            uploading_animal_form.name.data = animal['animal']['name']
            uploading_animal_form.age_year.data = animal['animal']['age_year']
            uploading_animal_form.age_month.data = animal['animal']['age_month']
            uploading_animal_form.age_day.data = animal['animal']['age_day']
            uploading_animal_form.region_origin.data = animal['animal']['region_origin']
            uploading_animal_form.country_origin.data = animal['animal']['country_origin']
            uploading_animal_form.region_residence.data = animal['animal']['region_residence']
            uploading_animal_form.country_residence.data = animal['animal']['country_residence']
            be_used_for_hu = animal['animal']['be_used_for_hu'].lstrip()
            be_used_for_en = animal['animal']['be_used_for_en'].lstrip()
            be_used_for_de = animal['animal']['be_used_for_de'].lstrip()
            be_used_for_fr = animal['animal']['be_used_for_fr'].lstrip()
            be_used_for_es = animal['animal']['be_used_for_es'].lstrip()
            be_used_for_list = animal['animal']['be_used_for_' + lang].lstrip()
            gender_hu = animal['animal']['gender_hu'].lstrip()
            gender_en = animal['animal']['gender_en'].lstrip()
            gender_de = animal['animal']['gender_de'].lstrip()
            gender_fr = animal['animal']['gender_fr'].lstrip()
            gender_es = animal['animal']['gender_es'].lstrip()
            gender_list = animal['animal']['gender_' + lang].lstrip()
            color_hu = animal['animal']['color_hu'].lstrip()
            color_en = animal['animal']['color_en'].lstrip()
            color_de = animal['animal']['color_de'].lstrip()
            color_fr = animal['animal']['color_fr'].lstrip()
            color_es = animal['animal']['color_es'].lstrip()
            color_list = animal['animal']['color_' + lang].lstrip()
            uploading_animal_form.brief_description.data = animal['animal']['brief_description']
            uploading_animal_form.description.data = animal['animal']['description']
            uploading_animal_form.mother.data = animal['animal']['mother']
            uploading_animal_form.mother_mother.data = animal['animal']['mother_mother']
            uploading_animal_form.mother_mother_mother.data = animal['animal']['mother_mother_mother']
            uploading_animal_form.mother_mother_father.data = animal['animal']['mother_mother_father']
            uploading_animal_form.mother_father.data = animal['animal']['mother_father']
            uploading_animal_form.mother_father_mother.data = animal['animal']['mother_father_mother']
            uploading_animal_form.mother_father_father.data = animal['animal']['mother_father_father']
            uploading_animal_form.father.data = animal['animal']['father']
            uploading_animal_form.father_mother.data = animal['animal']['father_mother']
            uploading_animal_form.father_mother_mother.data = animal['animal']['father_mother_mother']
            uploading_animal_form.father_mother_father.data = animal['animal']['father_mother_father']
            uploading_animal_form.father_father.data = animal['animal']['father_father']
            uploading_animal_form.father_father_mother.data = animal['animal']['father_father_mother']
            uploading_animal_form.father_father_father.data = animal['animal']['father_father_father']
            uploading_animal_form.url_01.data = animal['animal']['url_01']
            uploading_animal_form.url_02.data = animal['animal']['url_02']

            if animal['photo']['img_01'] != "None":
                uploading_animal_form.img_01.data = animal['photo']['img_01']
                uploading_animal_form.img_01_data.data = animal['photo']['img_01_data']
                uploading_animal_form.img_01_data_old.data = animal['photo']['img_01_data']
                uploading_animal_form.img_01_status.data = "unchanged"

            if animal['photo']['img_02'] != "None":
                uploading_animal_form.img_02.data = animal['photo']['img_02']
                uploading_animal_form.img_02_data.data = animal['photo']['img_02_data']
                uploading_animal_form.img_02_data_old.data = animal['photo']['img_02_data']
                uploading_animal_form.img_02_status.data = "unchanged"

            if animal['photo']['img_03'] != "None":
                uploading_animal_form.img_03.data = animal['photo']['img_03']
                uploading_animal_form.img_03_data.data = animal['photo']['img_03_data']
                uploading_animal_form.img_03_data_old.data = animal['photo']['img_03_data']
                uploading_animal_form.img_03_status.data = "unchanged"

            if animal['photo']['img_04'] != "None":
                uploading_animal_form.img_04.data = animal['photo']['img_04']
                uploading_animal_form.img_04_data.data = animal['photo']['img_04_data']
                uploading_animal_form.img_04_data_old.data = animal['photo']['img_04_data']
                uploading_animal_form.img_04_status.data = "unchanged"

            if animal['photo']['img_05'] != "None":
                uploading_animal_form.img_05.data = animal['photo']['img_05']
                uploading_animal_form.img_05_data.data = animal['photo']['img_05_data']
                uploading_animal_form.img_05_data_old.data = animal['photo']['img_05_data']
                uploading_animal_form.img_05_status.data = "unchanged"

            if animal['photo']['img_06'] != "None":
                uploading_animal_form.img_06.data = animal['photo']['img_06']
                uploading_animal_form.img_06_data.data = animal['photo']['img_06_data']
                uploading_animal_form.img_06_data_old.data = animal['photo']['img_06_data']
                uploading_animal_form.img_06_status.data = "unchanged"

            if animal['photo']['img_07'] != "None":
                uploading_animal_form.img_07.data = animal['photo']['img_07']
                uploading_animal_form.img_07_data.data = animal['photo']['img_07_data']
                uploading_animal_form.img_07_data_old.data = animal['photo']['img_07_data']
                uploading_animal_form.img_07_status.data = "unchanged"

            if animal['photo']['img_08'] != "None":
                uploading_animal_form.img_08.data = animal['photo']['img_08']
                uploading_animal_form.img_08_data.data = animal['photo']['img_08_data']
                uploading_animal_form.img_08_data_old.data = animal['photo']['img_08_data']
                uploading_animal_form.img_08_status.data = "unchanged"

            if animal['photo']['img_09'] != "None":
                uploading_animal_form.img_09.data = animal['photo']['img_09']
                uploading_animal_form.img_09_data.data = animal['photo']['img_09_data']
                uploading_animal_form.img_09_data_old.data = animal['photo']['img_09_data']
                uploading_animal_form.img_09_status.data = "unchanged"

            if animal['photo']['img_10'] != "None":
                uploading_animal_form.img_10.data = animal['photo']['img_10']
                uploading_animal_form.img_10_data.data = animal['photo']['img_10_data']
                uploading_animal_form.img_10_data_old.data = animal['photo']['img_10_data']
                uploading_animal_form.img_10_status.data = "unchanged"

            if animal['video']['video_01'] != "None":
                uploading_animal_form.video_01.data = animal['video']['video_01']
                uploading_animal_form.video_01_data.data = animal['video']['video_01_data']
                uploading_animal_form.video_01_data_old.data = animal['video']['video_01_data']
                uploading_animal_form.video_01_status.data = "unchanged"

            uploading_animal_form.medical_paper.data = animal['pdf']['medical_paper']
            uploading_animal_form.medical_paper_data.data = animal['pdf']['medical_paper_data']
            uploading_animal_form.medical_paper_data_old.data = animal['pdf']['medical_paper_data']
            uploading_animal_form.medical_paper_status.data = "unchanged"

            uploading_animal_form.breed_registry.data = animal['pdf']['breed_registry']
            uploading_animal_form.breed_registry_data.data = animal['pdf']['breed_registry_data']
            uploading_animal_form.breed_registry_data_old.data = animal['pdf']['breed_registry_data']
            uploading_animal_form.breed_registry_status.data = "unchanged"

            uploading_animal_form.x_ray.data = animal['pdf']['x_ray']
            uploading_animal_form.x_ray_data.data = animal['pdf']['x_ray_data']
            uploading_animal_form.x_ray_data_old.data = animal['pdf']['x_ray_data']
            uploading_animal_form.x_ray_status.data = "unchanged"

            uploading_animal_form.price.data = animal['animal']['price']

            url = app.config['API_SERVER_URL'] + "/get-exchange"
            headers = {'X-Api-Key': app.config['API_KEY']}
            r = requests.get(url, headers=headers, verify=app.config['TLS_VERIFY'])
            if r.status_code == 200:
                get_exchange = r.json().get("rates")
                user_currency = g.permission['is_user_login']['user_billing_information']['currency']
                uploading_animal_form.user_to_currency.data = user_currency
                uploading_animal_form.eur1_to_currency.data = round(get_exchange[user_currency], 2)

            return render_template('authentication/personal/edit-of-uploaded-animal.jinja2', lang=lang,
                                   uploading_animal_form=uploading_animal_form,
                                   start_year=start_year,
                                   end_year=end_year,
                                   countries=countries,
                                   animal=animal,
                                   be_used_for_hu=be_used_for_hu,
                                   be_used_for_en=be_used_for_en,
                                   be_used_for_de=be_used_for_de,
                                   be_used_for_fr=be_used_for_fr,
                                   be_used_for_es=be_used_for_es,
                                   be_used_for_list=be_used_for_list,
                                   gender_hu=gender_hu,
                                   gender_en=gender_en,
                                   gender_de=gender_de,
                                   gender_fr=gender_fr,
                                   gender_es=gender_es,
                                   gender_list=gender_list,
                                   color_hu=color_hu,
                                   color_en=color_en,
                                   color_de=color_de,
                                   color_fr=color_fr,
                                   color_es=color_es,
                                   color_list=color_list,
                                   user_id=user_id,
                                   user_name=user_name,
                                   is_worker=g.permission['is_user_login']['user_permission']['is_worker']
                                   )
        if r.status_code == 404:
            return render_template('errorhandler/404.jinja2')
    else:
        return render_template('errorhandler/404.jinja2')


# AJAX
@mod.route('/_del-of-uploaded-animal', methods=['POST'])
def _del_of_uploaded_animal():
    if g.logged_in:
        data = json.loads(request.get_data())

        worker_email = g.permission['is_user_login']['user']['email']
        user_email = data['user_email']
        animal_id = data['animal_id']

        url = app.config['API_SERVER_URL'] + "/del-of-uploaded-animal"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "worker_email": worker_email,
            "user_email": user_email,
            "animal_id": animal_id
        }
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:

            img_01_data_old = data['img_01_data_old']
            img_02_data_old = data['img_02_data_old']
            img_03_data_old = data['img_03_data_old']
            img_04_data_old = data['img_04_data_old']
            img_05_data_old = data['img_05_data_old']
            img_06_data_old = data['img_06_data_old']
            img_07_data_old = data['img_07_data_old']
            img_08_data_old = data['img_08_data_old']
            img_09_data_old = data['img_09_data_old']
            img_10_data_old = data['img_10_data_old']

            video_01_data_old = data['video_01_data_old']

            medical_paper_data_old = data['medical_paper_data_old']

            breed_registry_data_old = data['breed_registry_data_old']

            x_ray_data_old = data['x_ray_data_old']

            if img_01_data_old != "":
                try:
                    img_01_data = json.loads(img_01_data_old)
                    shutil.rmtree(app.config['IMG_DIRECTORY'] + "animal/" + img_01_data['folder'])
                except FileNotFoundError:
                    pass

            if img_02_data_old != "":
                try:
                    img_02_data = json.loads(img_02_data_old)
                    shutil.rmtree(app.config['IMG_DIRECTORY'] + "animal/" + img_02_data['folder'])
                except FileNotFoundError:
                    pass

            if img_03_data_old != "":
                try:
                    img_03_data = json.loads(img_03_data_old)
                    shutil.rmtree(app.config['IMG_DIRECTORY'] + "animal/" + img_03_data['folder'])
                except FileNotFoundError:
                    pass

            if img_04_data_old != "":
                try:
                    img_04_data = json.loads(img_04_data_old)
                    shutil.rmtree(app.config['IMG_DIRECTORY'] + "animal/" + img_04_data['folder'])
                except FileNotFoundError:
                    pass

            if img_05_data_old != "":
                try:
                    img_05_data = json.loads(img_05_data_old)
                    shutil.rmtree(app.config['IMG_DIRECTORY'] + "animal/" + img_05_data['folder'])
                except FileNotFoundError:
                    pass

            if img_06_data_old != "":
                try:
                    img_06_data = json.loads(img_06_data_old)
                    shutil.rmtree(app.config['IMG_DIRECTORY'] + "animal/" + img_06_data['folder'])
                except FileNotFoundError:
                    pass

            if img_07_data_old != "":
                try:
                    img_07_data = json.loads(img_07_data_old)
                    shutil.rmtree(app.config['IMG_DIRECTORY'] + "animal/" + img_07_data['folder'])
                except FileNotFoundError:
                    pass

            if img_08_data_old != "":
                try:
                    img_08_data = json.loads(img_08_data_old)
                    shutil.rmtree(app.config['IMG_DIRECTORY'] + "animal/" + img_08_data['folder'])
                except FileNotFoundError:
                    pass

            if img_09_data_old != "":
                try:
                    img_09_data = json.loads(img_09_data_old)
                    shutil.rmtree(app.config['IMG_DIRECTORY'] + "animal/" + img_09_data['folder'])
                except FileNotFoundError:
                    pass

            if img_10_data_old != "":
                try:
                    img_10_data = json.loads(img_10_data_old)
                    shutil.rmtree(app.config['IMG_DIRECTORY'] + "animal/" + img_10_data['folder'])
                except FileNotFoundError:
                    pass

            if video_01_data_old != "":
                try:
                    video_01_data = json.loads(video_01_data_old)
                    shutil.rmtree(app.config['VIDEO_DIRECTORY'] + "animal/" + video_01_data['folder'])
                except FileNotFoundError:
                    pass

            if medical_paper_data_old != "":
                try:
                    medical_paper_data = json.loads(medical_paper_data_old)
                    shutil.rmtree(app.config['PDF_DIRECTORY'] + "animal/" + medical_paper_data['folder'])
                except FileNotFoundError:
                    pass

            if breed_registry_data_old != "":
                try:
                    breed_registry_data = json.loads(breed_registry_data_old)
                    shutil.rmtree(app.config['PDF_DIRECTORY'] + "animal/" + breed_registry_data['folder'])
                except FileNotFoundError:
                    pass

            if x_ray_data_old != "":
                try:
                    x_ray_data = json.loads(x_ray_data_old)
                    shutil.rmtree(app.config['PDF_DIRECTORY'] + "animal/" + x_ray_data['folder'])
                except FileNotFoundError:
                    pass

            data = r.json()

            youtube_video_id = data['youtube_video_id']

            YouTube.delete(youtube_video_id)

            return make_response(jsonify(data), 200)
        else:
            data = {"status": 'error', 'message': r.json()}
            return make_response(jsonify(data), 400)


# AJAX
@mod.route('/_inactivate-of-uploaded-animal', methods=['POST'])
def _inactivate_of_uploaded_animal():
    if g.logged_in:
        data = json.loads(request.get_data())

        worker_email = g.permission['is_user_login']['user']['email']
        user_email = data['user_email']
        animal_id = data['animal_id']
        btn = data['btn']

        url = app.config['API_SERVER_URL'] + "/inactivate-of-uploaded-animal"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "worker_email": worker_email,
            "user_email": user_email,
            "animal_id": animal_id,
            "btn": btn
        }
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            data = r.json()

            animal_id = data['animal_id']
            youtube_video_id = data['youtube_video_id']
            title = data['title']
            mother = data['mother']
            father = data['father']
            category_name = data['category_name']
            subcategory_name = data['subcategory_name']
            youtube_video_status = data['youtube_video_status']

            YouTube.update(animal_id, youtube_video_id, title, mother, father, category_name, subcategory_name,
                           youtube_video_status)

            return make_response(jsonify(data), 200)
        else:
            data = {"status": 'error', 'message': r.json()}
            return make_response(jsonify(data), 400)


# AJAX
@mod.route('/_activate-of-uploaded-animal', methods=['POST'])
def _activate_of_uploaded_animal():
    if g.logged_in:
        data = json.loads(request.get_data())

        worker_email = g.permission['is_user_login']['user']['email']
        user_email = data['user_email']
        animal_id = data['animal_id']
        btn = data['btn']

        url = app.config['API_SERVER_URL'] + "/activate-of-uploaded-animal"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "worker_email": worker_email,
            "user_email": user_email,
            "animal_id": animal_id,
            "btn": btn
        }
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            data = r.json()

            animal_id = data['animal_id']
            youtube_video_id = data['youtube_video_id']
            title = data['title']
            mother = data['mother']
            father = data['father']
            category_name = data['category_name']
            subcategory_name = data['subcategory_name']
            youtube_video_status = data['youtube_video_status']

            YouTube.update(animal_id, youtube_video_id, title, mother, father, category_name, subcategory_name,
                           youtube_video_status)

            return make_response(jsonify(data), 200)
        else:
            data = {"status": 'error', 'message': r.json()}
            return make_response(jsonify(data), 400)
