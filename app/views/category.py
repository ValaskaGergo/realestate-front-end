# -*- coding: utf-8 -*-
from app import app
import os
from config import _static
from flask import Blueprint, g, render_template, json, request, make_response, jsonify, session
from app.forms.category_forms import CategoryForm, SubCategoryForm
import deepl
from .utilities.utility import File
from datetime import datetime, timedelta
import uuid
from PIL import Image, ImageDraw, ImageFilter
import requests
import shutil
from pyjsonq import JsonQ
from urllib import parse

mod = Blueprint('category_module', __name__)

Image.MAX_IMAGE_PIXELS = app.config['PIL_IMAGE_MAX_IMAGE_PIXELS']


@mod.route('/category', methods=['GET'])
def category():
    if g.logged_in and g.permission['is_user_login']['user_permission']['is_category_management'] == "True":

        try:
            try:
                lang = parse.unquote(request.cookies.get("abBrowserLang")).replace("%22", "").replace('"', '')
            except TypeError:
                lang = "en"
        except TypeError:
            supported_languages = app.config['SUPPORTED_LANGUAGES']
            lang = request.accept_languages.best_match(supported_languages)

        add_category_form = CategoryForm()
        add_subcategory_form = SubCategoryForm()

        url = app.config['API_SERVER_URL'] + "/get-category-all"
        headers = {'X-Api-Key': app.config['API_KEY']}

        r = requests.get(url, headers=headers, verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            category_data = r.json().get("data")
            toggle_id = session.get('toggle_id')

            return render_template('authentication/admin/category.jinja2',
                                   add_category_form=add_category_form,
                                   category_data=category_data,
                                   add_subcategory_form=add_subcategory_form,
                                   toggle_id=toggle_id,
                                   lang=lang)
    else:
        return render_template('errorhandler/404.jinja2')


# AJAX
@mod.route('/_deepl-category', methods=['POST'])
def _deepl_category():
    if g.logged_in and g.permission['is_user_login']['user_permission']['is_category_management'] == "True":
        data = json.loads(request.get_data())
        lang = data['lang']
        text = data['text']

        if bool(text and text.strip()) is True:
            translator = deepl.Translator(app.config['DEEPL_API_KEY'])

            result_hu = translator.translate_text([text], source_lang=lang, target_lang="HU")
            result_en = translator.translate_text([text], source_lang=lang, target_lang="EN-US")
            result_de = translator.translate_text([text], source_lang=lang, target_lang="DE")
            result_fr = translator.translate_text([text], source_lang=lang, target_lang="FR")
            result_es = translator.translate_text([text], source_lang=lang, target_lang="ES")

            payload = {
                "HU": result_hu[0].text,
                "EN": result_en[0].text,
                "DE": result_de[0].text,
                "FR": result_fr[0].text,
                "ES": result_es[0].text
            }

            data = {"status": 'success', 'message': payload}
            return make_response(jsonify(data), 200)
        else:
            data = {"status": 'error'}
            return make_response(jsonify(data), 404)


@app.route('/category-img-upload', methods=['POST'])
def category_img_upload():
    if g.logged_in and g.permission['is_user_login']['user_permission']['is_category_management'] == "True":
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

        if category_img_upload and File.allowed_file(file_data.filename):
            now = datetime.now()
            timestamp = datetime.timestamp(now)

            tmp = app.config['TMP_IMG_DIRECTORY'] + "category/"
            folder = str(uuid.uuid4()) + "-" + str(timestamp)
            path = tmp + folder
            os.makedirs(path)

            session['tmp_category_img'] = os.path.join(
                "static/images/tmp/category/" + folder, folder + ".jpg")
            file_data.save(os.path.join(path, folder + ".jpg"))

            media_origin = Image.open(os.path.join(path, folder + ".jpg"))
            media_width, media_height = media_origin.size

            end_time_tmp = now - timedelta(minutes=10)
            for x in os.listdir(tmp):
                if x != ".gitkeep":
                    if datetime.fromtimestamp(os.path.getmtime(tmp + "/" + x)) < end_time_tmp:
                        shutil.rmtree(tmp + "/" + x)

            resp = {"status": "success", "data": session.get('tmp_category_img'), "folder": folder,
                    "filename": folder + ".jpg", "width": media_width, "height": media_height}
            return make_response(jsonify(resp), 200)


# AJAX
@mod.route('/_add-category', methods=['POST'])
def _add_category():
    data = json.loads(request.get_data())

    visibility = data['visibility']
    name_hu = data['name_hu']
    name_en = data['name_en']
    name_de = data['name_de']
    name_fr = data['name_fr']
    name_es = data['name_es']
    gender_hu = data['gender_hu']
    gender_en = data['gender_en']
    gender_de = data['gender_de']
    gender_fr = data['gender_fr']
    gender_es = data['gender_es']
    be_used_for_hu = data['be_used_for_hu']
    be_used_for_en = data['be_used_for_en']
    be_used_for_de = data['be_used_for_de']
    be_used_for_fr = data['be_used_for_fr']
    be_used_for_es = data['be_used_for_es']
    color_hu = data['color_hu']
    color_en = data['color_en']
    color_de = data['color_de']
    color_fr = data['color_fr']
    color_es = data['color_es']
    img_data = data['img_data']
    img_data_old = data['img_data_old']

    category_id = data['category_id']
    is_edit_img = data['is_edit_img']
    is_new_img = data['is_new_img']
    is_rm_img = data['is_rm_img']

    if bool(category_id and category_id.strip()) is not True:
        url = app.config['API_SERVER_URL'] + "/add-category"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "email": g.permission['is_user_login']['user']['email'],
            "visibility": visibility,
            "name_hu": name_hu,
            "name_en": name_en,
            "name_de": name_de,
            "name_fr": name_fr,
            "name_es": name_es,
            "gender_hu": gender_hu,
            "gender_en": gender_en,
            "gender_de": gender_de,
            "gender_fr": gender_fr,
            "gender_es": gender_es,
            "be_used_for_hu": be_used_for_hu,
            "be_used_for_en": be_used_for_en,
            "be_used_for_de": be_used_for_de,
            "be_used_for_fr": be_used_for_fr,
            "be_used_for_es": be_used_for_es,
            "color_hu": color_hu,
            "color_en": color_en,
            "color_de": color_de,
            "color_fr": color_fr,
            "color_es": color_es,
            "img_data": img_data,
        }
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            if img_data:
                img_data = json.loads(img_data)

                tmp = app.config['TMP_IMG_DIRECTORY'] + "category/"
                media = os.path.join(_static, "images/category/")
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
                media_origin = Image.open(tmp + "/" + folder + "/" + filename)

                media_cropped = media_origin.crop((x, y, x2, y2))
                media_cropped = media_cropped.convert('RGB')
                if aspect_ratio == 1:
                    width = 350
                    height = 350
                    media_cropped = media_cropped.resize((width, height), Image.ANTIALIAS)
                elif aspect_ratio == 1.7777777777777777:
                    width = 1280
                    height = width * 9 // 16
                    media_cropped = media_cropped.resize((width, height), Image.ANTIALIAS)
                else:
                    width = 720
                    height = width * 3 // 2
                    media_cropped = media_cropped.resize((width, height), Image.ANTIALIAS)

                media_cropped.save(media + folder + "/cropped/" + filename, format='JPEG', subsampling=0,
                                   quality=75)
                shutil.move(tmp + folder + "/" + filename, media + folder + "/" + "/origin/")
                shutil.rmtree(tmp + folder)

            data = {"status": 'success', 'message': r.json()}
            return make_response(jsonify(data), 200)
        else:
            data = {"status": 'error', 'message': r.json()}
            return make_response(jsonify(data), 400)
    else:
        url = app.config['API_SERVER_URL'] + "/edit-category"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "email": g.permission['is_user_login']['user']['email'],
            "category_id": category_id,
            "visibility": visibility,
            "name_hu": name_hu,
            "name_en": name_en,
            "name_de": name_de,
            "name_fr": name_fr,
            "name_es": name_es,
            "gender_hu": gender_hu,
            "gender_en": gender_en,
            "gender_de": gender_de,
            "gender_fr": gender_fr,
            "gender_es": gender_es,
            "be_used_for_hu": be_used_for_hu,
            "be_used_for_en": be_used_for_en,
            "be_used_for_de": be_used_for_de,
            "be_used_for_fr": be_used_for_fr,
            "be_used_for_es": be_used_for_es,
            "color_hu": color_hu,
            "color_en": color_en,
            "color_de": color_de,
            "color_fr": color_fr,
            "color_es": color_es,
            "img_data": img_data,
        }
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            if is_rm_img == "True":
                img_data_old = json.loads(img_data_old)
                media = os.path.join(_static, "images/category/")
                folder = img_data_old['folder']
                shutil.rmtree(media + folder)
            if is_edit_img == "True":
                img_data = json.loads(img_data)
                media = os.path.join(_static, "images/category/")
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
                media_origin = Image.open(media + folder + "/origin/" + filename)

                media_cropped = media_origin.crop((x, y, x2, y2))
                media_cropped = media_cropped.convert('RGB')
                if aspect_ratio == 1:
                    width = 350
                    height = 350
                    media_cropped = media_cropped.resize((width, height), Image.ANTIALIAS)
                elif aspect_ratio == 1.7777777777777777:
                    width = 1280
                    height = width * 9 // 16
                    media_cropped = media_cropped.resize((width, height), Image.ANTIALIAS)
                else:
                    width = 720
                    height = width * 3 // 2
                    media_cropped = media_cropped.resize((width, height), Image.ANTIALIAS)
                media_cropped.save(media + folder + "/cropped/" + filename, format='JPEG', subsampling=0,
                                   quality=75)
            if is_new_img == "True":
                img_data = json.loads(img_data)

                tmp = app.config['TMP_IMG_DIRECTORY'] + "category/"
                media = os.path.join(_static, "images/category/")
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
                media_origin = Image.open(tmp + "/" + folder + "/" + filename)

                media_cropped = media_origin.crop((x, y, x2, y2))
                media_cropped = media_cropped.convert('RGB')
                if aspect_ratio == 1:
                    width = 350
                    height = 350
                    media_cropped = media_cropped.resize((width, height), Image.ANTIALIAS)
                elif aspect_ratio == 1.7777777777777777:
                    width = 1280
                    height = width * 9 // 16
                    media_cropped = media_cropped.resize((width, height), Image.ANTIALIAS)
                else:
                    width = 720
                    height = width * 3 // 2
                    media_cropped = media_cropped.resize((width, height), Image.ANTIALIAS)
                media_cropped.save(media + folder + "/cropped/" + filename, format='JPEG', subsampling=0,
                                   quality=75)
                shutil.move(tmp + folder + "/" + filename, media + folder + "/" + "/origin/")
                shutil.rmtree(tmp + folder)
            data = {"status": 'success', 'message': r.json()}
            return make_response(jsonify(data), 200)
        else:
            data = {"status": 'error', 'message': r.json()}
            return make_response(jsonify(data), 400)


# AJAX
@mod.route('/_get-category', methods=['POST'])
def _edit_category():
    try:
        try:
            lang = parse.unquote(request.cookies.get("abBrowserLang")).replace("%22", "").replace('"', '')
        except TypeError:
            lang = "en"
    except TypeError:
        supported_languages = app.config['SUPPORTED_LANGUAGES']
        lang = request.accept_languages.best_match(supported_languages)

    data = json.loads(request.get_data())

    category_id = data['id']

    url = app.config['API_SERVER_URL'] + "/get-category"
    headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
    payload = {
        "email": g.permission['is_user_login']['user']['email'],
        "category_id": category_id
    }
    r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

    if r.status_code == 200:
        category_data = r.json().get("data")

        jq = JsonQ(data=category_data)
        category_data = jq.sort_by("name_" + lang, "asc").get()

        data = {"status": 'success', 'lang': lang, 'message': category_data}
        return make_response(jsonify(data), 200)
    else:
        data = {"status": 'error', 'message': r.json()}
        return make_response(jsonify(data), 400)


# AJAX
@mod.route('/_delete-category', methods=['POST'])
def _delete_category():
    data = json.loads(request.get_data())

    img_data_old = data['img_data_old']
    category_id = data['category_id']

    url = app.config['API_SERVER_URL'] + "/delete-category"
    headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
    payload = {
        "email": g.permission['is_user_login']['user']['email'],
        "category_id": category_id
    }
    r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

    if r.status_code == 200:
        if img_data_old:
            img_data_old = json.loads(img_data_old)
            media = os.path.join(_static, "images/category/")
            folder = img_data_old['folder']
            shutil.rmtree(media + folder)
        data = {"status": 'success', 'message': r.json()}
        return make_response(jsonify(data), 200)
    else:
        data = {"status": 'error', 'message': r.json()}
        return make_response(jsonify(data), 400)


# AJAX
@mod.route('/_get-category-select', methods=['GET'])
def _get_category_select():
    try:
        try:
            lang = parse.unquote(request.cookies.get("abBrowserLang")).replace("%22", "").replace('"', '')
        except TypeError:
            lang = "en"
    except TypeError:
        supported_languages = app.config['SUPPORTED_LANGUAGES']
        lang = request.accept_languages.best_match(supported_languages)

    url = app.config['API_SERVER_URL'] + "/get-category-all"
    headers = {'X-Api-Key': app.config['API_KEY']}

    r = requests.get(url, headers=headers, verify=app.config['TLS_VERIFY'])

    if r.status_code == 200:
        category_data = r.json().get("data")

        jq = JsonQ(data=category_data)
        categories = jq.sort_by("name_" + lang, "asc").get()

        data = {"status": 'success', 'lang': lang, 'message': categories}
        return make_response(jsonify(data), 200)
    else:
        data = {"status": 'error', 'message': r.json()}
        return make_response(jsonify(data), 400)


@app.route('/subcategory-img-upload', methods=['POST'])
def subcategory_img_upload():
    if g.logged_in and g.permission['is_user_login']['user_permission']['is_category_management'] == "True":
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

        if category_img_upload and File.allowed_file(file_data.filename):
            now = datetime.now()
            timestamp = datetime.timestamp(now)

            tmp = app.config['TMP_IMG_DIRECTORY'] + "subcategory/"
            folder = str(uuid.uuid4()) + "-" + str(timestamp)
            path = tmp + folder
            os.makedirs(path)

            session['tmp_subcategory_img'] = os.path.join(
                "static/images/tmp/subcategory/" + folder, folder + ".jpg")
            file_data.save(os.path.join(path, folder + ".jpg"))

            media_origin = Image.open(os.path.join(path, folder + ".jpg"))
            media_width, media_height = media_origin.size

            end_time_tmp = now - timedelta(minutes=10)
            for x in os.listdir(tmp):
                if x != ".gitkeep":
                    if datetime.fromtimestamp(os.path.getmtime(tmp + "/" + x)) < end_time_tmp:
                        shutil.rmtree(tmp + "/" + x)

            resp = {"status": "success", "data": session.get('tmp_subcategory_img'), "folder": folder,
                    "filename": folder + ".jpg", "width": media_width, "height": media_height}
            return make_response(jsonify(resp), 200)


# AJAX
@mod.route('/_add-subcategory', methods=['POST'])
def _add_subcategory():
    data = json.loads(request.get_data())

    visibility = data['visibility']
    name_hu = data['name_hu']
    name_en = data['name_en']
    name_de = data['name_de']
    name_fr = data['name_fr']
    name_es = data['name_es']
    description_hu = data['description_hu']
    description_en = data['description_en']
    description_de = data['description_de']
    description_fr = data['description_fr']
    description_es = data['description_es']
    img_data = data['img_data']
    img_data_old = data['img_data_old']

    subcategory_id = data['subcategory_id']
    category_id_select = data['category_id_select']
    is_edit_img = data['is_edit_img']
    is_new_img = data['is_new_img']
    is_rm_img = data['is_rm_img']

    if bool(subcategory_id and subcategory_id.strip()) is not True:
        url = app.config['API_SERVER_URL'] + "/add-subcategory"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "email": g.permission['is_user_login']['user']['email'],
            "category_id_select": category_id_select,
            "visibility": visibility,
            "name_hu": name_hu,
            "name_en": name_en,
            "name_de": name_de,
            "name_fr": name_fr,
            "name_es": name_es,
            "description_hu": description_hu,
            "description_en": description_en,
            "description_de": description_de,
            "description_fr": description_fr,
            "description_es": description_es,
            "img_data": img_data,
        }
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            if img_data:
                img_data = json.loads(img_data)

                tmp = app.config['TMP_IMG_DIRECTORY'] + "subcategory/"
                media = os.path.join(_static, "images/subcategory/")
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
                media_origin = Image.open(tmp + "/" + folder + "/" + filename)

                media_cropped = media_origin.crop((x, y, x2, y2))
                media_cropped = media_cropped.convert('RGB')
                if aspect_ratio == 1:
                    width = 350
                    height = 350
                    media_cropped = media_cropped.resize((width, height), Image.ANTIALIAS)
                elif aspect_ratio == 1.7777777777777777:
                    width = 1280
                    height = width * 9 // 16
                    media_cropped = media_cropped.resize((width, height), Image.ANTIALIAS)
                else:
                    width = 720
                    height = width * 3 // 2
                    media_cropped = media_cropped.resize((width, height), Image.ANTIALIAS)
                media_cropped.save(media + folder + "/cropped/" + filename, format='JPEG', subsampling=0,
                                   quality=75)
                shutil.move(tmp + folder + "/" + filename, media + folder + "/" + "/origin/")
                shutil.rmtree(tmp + folder)
            data = {"status": 'success', 'message': r.json()}
            return make_response(jsonify(data), 200)
        else:
            data = {"status": 'error', 'message': r.json()}
            return make_response(jsonify(data), 400)

    else:
        url = app.config['API_SERVER_URL'] + "/edit-subcategory"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "email": g.permission['is_user_login']['user']['email'],
            "subcategory_id": subcategory_id,
            "category_id_select": category_id_select,
            "visibility": visibility,
            "name_hu": name_hu,
            "name_en": name_en,
            "name_de": name_de,
            "name_fr": name_fr,
            "name_es": name_es,
            "description_hu": description_hu,
            "description_en": description_en,
            "description_de": description_de,
            "description_fr": description_fr,
            "description_es": description_es,
            "img_data": img_data,
        }
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            if is_rm_img == "True":
                img_data_old = json.loads(img_data_old)
                media = os.path.join(_static, "images/subcategory/")
                folder = img_data_old['folder']
                shutil.rmtree(media + folder)
            if is_edit_img == "True":
                img_data = json.loads(img_data)
                media = os.path.join(_static, "images/subcategory/")
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
                media_origin = Image.open(media + folder + "/origin/" + filename)

                media_cropped = media_origin.crop((x, y, x2, y2))
                media_cropped = media_cropped.convert('RGB')
                if aspect_ratio == 1:
                    app.logger.info("ar 1")
                    width = 350
                    height = 350
                    media_cropped = media_cropped.resize((width, height), Image.ANTIALIAS)
                elif aspect_ratio == 1.7777777777777777:
                    width = 1280
                    height = width * 9 // 16
                    media_cropped = media_cropped.resize((width, height), Image.ANTIALIAS)
                else:
                    width = 720
                    height = width * 3 // 2
                    media_cropped = media_cropped.resize((width, height), Image.ANTIALIAS)
                media_cropped.save(media + folder + "/cropped/" + filename, format='JPEG', subsampling=0,
                                   quality=75)
            if is_new_img == "True":
                img_data = json.loads(img_data)

                tmp = app.config['TMP_IMG_DIRECTORY'] + "subcategory/"
                media = os.path.join(_static, "images/subcategory/")
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
                media_origin = Image.open(tmp + "/" + folder + "/" + filename)

                media_cropped = media_origin.crop((x, y, x2, y2))
                media_cropped = media_cropped.convert('RGB')
                if aspect_ratio == 1:
                    width = 350
                    height = 350
                    media_cropped = media_cropped.resize((width, height), Image.ANTIALIAS)
                elif aspect_ratio == 1.7777777777777777:
                    width = 1280
                    height = width * 9 // 16
                    media_cropped = media_cropped.resize((width, height), Image.ANTIALIAS)
                else:
                    width = 720
                    height = width * 3 // 2
                    media_cropped = media_cropped.resize((width, height), Image.ANTIALIAS)
                media_cropped.save(media + folder + "/cropped/" + filename, format='JPEG', subsampling=0,
                                   quality=75)
                shutil.move(tmp + folder + "/" + filename, media + folder + "/" + "/origin/")
                shutil.rmtree(tmp + folder)
            data = {"status": 'success', 'message': r.json()}
            return make_response(jsonify(data), 200)
        else:
            data = {"status": 'error', 'message': r.json()}
            return make_response(jsonify(data), 400)


# AJAX
@mod.route('/_get-category-to-subcategories', methods=['POST'])
def _get_category_to_subcategories():
    try:
        try:
            lang = parse.unquote(request.cookies.get("abBrowserLang")).replace("%22", "").replace('"', '')
        except TypeError:
            lang = "en"
    except TypeError:
        supported_languages = app.config['SUPPORTED_LANGUAGES']
        lang = request.accept_languages.best_match(supported_languages)

    data = json.loads(request.get_data())

    url = app.config['API_SERVER_URL'] + "/get-category-to-subcategories"
    headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
    payload = {
        "category_id": data['category_id']
    }
    r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

    if r.status_code == 200:
        subcategories_data = r.json().get("data")

        jq = JsonQ(data=subcategories_data)
        subcategories = jq.sort_by("name_" + lang, "asc").get()

        try:
            session['toggle_id'] = subcategories_data[0]['category_id']
        except:
            session['toggle_id'] = None

        data = {"status": 'success', 'lang': lang, 'message': subcategories}
        return make_response(jsonify(data), 200)
    else:
        data = {"status": 'error', 'message': r.json()}
        return make_response(jsonify(data), 400)


# AJAX
@mod.route('/_get-subcategory', methods=['POST'])
def _edit_subcategory():
    data = json.loads(request.get_data())
    subcategory_id = data['id']

    url = app.config['API_SERVER_URL'] + "/get-subcategory"
    headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
    payload = {
        "email": g.permission['is_user_login']['user']['email'],
        "subcategory_id": subcategory_id
    }
    r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

    if r.status_code == 200:
        data = {"status": 'success', 'message': r.json()}
        return make_response(jsonify(data), 200)
    else:
        data = {"status": 'error', 'message': r.json()}
        return make_response(jsonify(data), 400)


# AJAX
@mod.route('/_delete-subcategory', methods=['POST'])
def _delete_subcategory():
    data = json.loads(request.get_data())

    img_data_old = data['img_data_old']
    subcategory_id = data['subcategory_id']

    url = app.config['API_SERVER_URL'] + "/delete-subcategory"
    headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
    payload = {
        "email": g.permission['is_user_login']['user']['email'],
        "subcategory_id": subcategory_id,
    }
    r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

    if r.status_code == 200:
        if img_data_old:
            img_data_old = json.loads(img_data_old)
            media = os.path.join(_static, "images/subcategory/")
            folder = img_data_old['folder']
            shutil.rmtree(media + folder)
        data = {"status": 'success', 'message': r.json()}
        return make_response(jsonify(data), 200)
    else:
        data = {"status": 'error', 'message': r.json()}
        return make_response(jsonify(data), 400)
