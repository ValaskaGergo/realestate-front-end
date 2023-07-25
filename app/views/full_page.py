# -*- coding: utf-8 -*-
from app import app
from config import _templates, _static
from flask import Blueprint, json, request, make_response, jsonify, render_template, g, redirect, url_for
from flask_caching import Cache
import requests
from urllib import parse
from os import path
import io
from app.forms.full_page_forms import QuestionAndAnswerForm, QuestionEditForm, AnswerEditForm, TalkingForm, \
    TalkingEditForm, TalkingAnswerEditForm
from fpdf import FPDF, HTMLMixin
from datetime import datetime, timedelta
import uuid
import os
from PIL import Image, ImageDraw, ImageFont
from pyjsonq import JsonQ
import re

mod = Blueprint('full_page_module', __name__)
cache = Cache(app)


@mod.route('/<category_name>/<subcategory_name>/<page_url>/<page_id>', methods=['GET'])
def full_page(category_name, subcategory_name, page_url, page_id):
    now_date = datetime.now()
    question_and_answer_form = QuestionAndAnswerForm()
    question_edit_form = QuestionEditForm()
    answer_edit_form = AnswerEditForm()
    talking_form = TalkingForm()
    talking_edit_form = TalkingEditForm()
    talking_answer_edit_form = TalkingAnswerEditForm()
    try:
        try:
            lang = parse.unquote(request.cookies.get("abBrowserLang")).replace("%22", "").replace('"', '')
        except TypeError:
            lang = "en"
    except TypeError:
        supported_languages = app.config['SUPPORTED_LANGUAGES']
        lang = request.accept_languages.best_match(supported_languages)

    try:
        user_id = g.permission['is_user_login']['user']['id']
    except KeyError:
        user_id = None

    url = app.config['API_SERVER_URL'] + "/full-page"
    headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
    payload = {
        "user_id": user_id,
        "page_id": page_id,
        "lang": lang
    }
    r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

    if r.status_code == 200:
        data = r.json()

        if data is None:
            return redirect(url_for('index_module.index'))

        video_01_folder = data['animal']['video']['video_01'].replace(".mp4", "")
        video_01_origin = path.join(_static,
                                    "videos/animal/" + video_01_folder + "/origin/" + data['animal']['video'][
                                        'video_01'])
        if path.isfile(video_01_origin):
            is_video_01_origin = True
        else:
            is_video_01_origin = False

        countries_json = io.open(_templates + "/i18n/countries." + lang + ".json", 'r', encoding='utf8')
        countries_read = json.loads(countries_json.read())
        countries = countries_read

        try:
            breed_registry_data = json.loads(data['animal']['pdf']['breed_registry_data'])
            breed_registry_folder = breed_registry_data['folder']
            breed_registry_file = breed_registry_data['filename']
        except TypeError:
            breed_registry_folder = None
            breed_registry_file = None

        try:
            x_ray_data = json.loads(data['animal']['pdf']['x_ray_data'])
            x_ray_folder = x_ray_data['folder']
            x_ray_file = x_ray_data['filename']
        except TypeError:
            x_ray_folder = None
            x_ray_file = None

        category = None
        subcategory = None
        gender = None
        color = None
        be_used_for = None
        if lang == "hu":
            category = data['animal']['category']['name_hu']
            subcategory = data['animal']['subcategory']['name_hu']
            gender = data['animal']['animal']['gender_hu']
            color = data['animal']['animal']['color_hu']
            be_used_for = data['animal']['animal']['be_used_for_hu']
        elif lang == "en":
            category = data['animal']['category']['name_en']
            subcategory = data['animal']['subcategory']['name_en']
            gender = data['animal']['animal']['gender_en']
            color = data['animal']['animal']['color_en']
            be_used_for = data['animal']['animal']['be_used_for_en']
        elif lang == "de":
            category = data['animal']['category']['name_de']
            subcategory = data['animal']['subcategory']['name_de']
            gender = data['animal']['animal']['gender_de']
            color = data['animal']['animal']['color_de']
            be_used_for = data['animal']['animal']['be_used_for_de']
        elif lang == "fr":
            category = data['animal']['category']['name_fr']
            subcategory = data['animal']['subcategory']['name_fr']
            gender = data['animal']['animal']['gender_fr']
            color = data['animal']['animal']['color_fr']
            be_used_for = data['animal']['animal']['be_used_for_fr']
        elif lang == "es":
            category = data['animal']['category']['name_es']
            subcategory = data['animal']['subcategory']['name_es']
            gender = data['animal']['animal']['gender_es']
            color = data['animal']['animal']['color_es']
            be_used_for = data['animal']['animal']['be_used_for_es']

        seller = data['animal']['seller']
        customer = data['animal']['customer']

        jq = JsonQ(data=countries)
        seller_country = jq.at("data").where("country_code", "=", seller['seller_country']).get()

    else:
        data = {"status": 'error', 'message': r.json()}
        return make_response(jsonify(data), 400)

    if g.logged_in:
        return render_template('authentication/full-page.jinja2',
                               now_date=now_date,
                               lang=lang,
                               page_id=page_id,
                               question_and_answer_form=question_and_answer_form,
                               question_edit_form=question_edit_form,
                               answer_edit_form=answer_edit_form,
                               talking_form=talking_form,
                               talking_edit_form=talking_edit_form,
                               talking_answer_edit_form=talking_answer_edit_form,
                               animal=data,
                               category=category,
                               subcategory=subcategory,
                               is_video_01_origin=is_video_01_origin,
                               gender=gender,
                               color=color,
                               be_used_for=be_used_for,
                               countries=countries,
                               breed_registry_folder=breed_registry_folder,
                               breed_registry_file=breed_registry_file,
                               x_ray_folder=x_ray_folder,
                               x_ray_file=x_ray_file,
                               seller_data=[seller],
                               seller_country=seller_country[0],
                               customer_data=[customer]
                               )
    else:
        return render_template('anonymous/full-page.jinja2',
                               now_date=now_date,
                               lang=lang,
                               page_id=page_id,
                               question_and_answer_form=question_and_answer_form,
                               question_edit_form=question_edit_form,
                               answer_edit_form=answer_edit_form,
                               talking_form=talking_form,
                               talking_edit_form=talking_edit_form,
                               talking_answer_edit_form=talking_answer_edit_form,
                               animal=data,
                               category=category,
                               subcategory=subcategory,
                               is_video_01_origin=is_video_01_origin,
                               gender=gender,
                               color=color,
                               be_used_for=be_used_for,
                               countries=countries,
                               breed_registry_folder=breed_registry_folder,
                               breed_registry_file=breed_registry_file,
                               x_ray_folder=x_ray_folder,
                               x_ray_file=x_ray_file,
                               seller_data=[seller],
                               seller_country=seller_country[0],
                               customer_data=[customer]
                               )


# AJAX
@mod.route('/_full-data-info-box', methods=['POST'])
def _full_data_info_box():
    data = json.loads(request.get_data())

    animal_id = data['animal_id']

    url = app.config['API_SERVER_URL'] + "/full-data-info-box"
    headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
    payload = {
        "animal_id": animal_id,
    }
    r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

    if r.status_code == 200:
        data = {"status": 'success', 'message': r.json()}
        return make_response(jsonify(data), 200)
    else:
        data = {"status": 'error', 'message': r.json()}
        return make_response(jsonify(data), 400)


# AJAX
@mod.route('/_wishlist', methods=['POST'])
def _wishlist():
    data = json.loads(request.get_data())

    animal_id = data['animal_id']
    user_id = data['user_id']
    wishlist_status = data['wishlist_status']

    url = app.config['API_SERVER_URL'] + "/wishlist"
    headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
    payload = {
        "animal_id": animal_id,
        "user_id": user_id,
        "wishlist_status": wishlist_status
    }
    r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

    if r.status_code == 200:
        data = {"status": 'success', 'message': r.json()}
        return make_response(jsonify(data), 200)
    else:
        data = {"status": 'error', 'message': r.json()}
        return make_response(jsonify(data), 400)


class PDF(FPDF, HTMLMixin):
    pass


@mod.route('/_animal-pdf', methods=['POST'])
def _animal_pdf():
    json_data = json.loads(request.get_data())

    try:
        try:
            lang = parse.unquote(request.cookies.get("abBrowserLang")).replace("%22", "").replace('"', '')
        except TypeError:
            lang = "en"
    except TypeError:
        supported_languages = app.config['SUPPORTED_LANGUAGES']
        lang = request.accept_languages.best_match(supported_languages)

    try:
        user_id = g.permission['is_user_login']['user']['id']
    except KeyError:
        user_id = None

    page_id = json_data['page_id']
    page_url = json_data['page_url']

    url = app.config['API_SERVER_URL'] + "/full-page"
    headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
    payload = {
        "user_id": user_id,
        "page_id": page_id,
        "lang": lang
    }
    r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

    if r.status_code == 200:
        now = datetime.now()
        timestamp = datetime.timestamp(now)

        data = r.json()

        #  Start i18n
        i18n_json = io.open(_templates + "/i18n/anlibreeders." + lang + ".json", 'r', encoding='utf8')
        i18n_read = json.loads(i18n_json.read())
        i18n = i18n_read
        #  End i18n

        pdf_tmp = app.config['TMP_PDF_DIRECTORY'] + "full/"
        pdf_folder = str(uuid.uuid4()) + "-" + str(timestamp) + "/"
        pdf_filename = str(uuid.uuid4()) + "-" + str(timestamp) + ".pdf"
        family1_filename = str(uuid.uuid4()) + "-" + str(timestamp) + "family1.png"
        family2_filename = str(uuid.uuid4()) + "-" + str(timestamp) + "family2.png"
        pdf_path = pdf_tmp + pdf_folder
        os.makedirs(pdf_path)

        pdf_ab_logo = app.config['IMG_DIRECTORY'] + "pdf/layout/ab-logo.png"
        name = data['animal']['animal']['name']

        rating = data['animal']['rating']['rating']

        if g.logged_in:
            price_eur_data = json_data['priceEurdata']
            price_eur_to_data = json_data['priceEurTodata']
        else:
            price_eur_data = "*****"
            price_eur_to_data = "*****"
        price_eur_currency = json_data['priceEurCurrency']
        price_eur_to_currency = json_data['priceEurToCurrency']

        # brief_description = data['animal']['animal']['brief_description']
        brief_description = json_data['briefDescription'].replace("<br>", "\n").strip()

        img_01_folder = data['animal']['photo']['img_01'].replace(".jpg", "")
        img_01 = app.config['IMG_DIRECTORY'] + "animal/" + img_01_folder + "/cropped/" + data['animal']['photo'][
            'img_01']

        #  Start Family Tree
        font_title = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 14)
        font_body = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 20)

        i18n_unknown = i18n['anlihouse-A304']

        father = data['animal']['animal']['father'] if data['animal']['animal'][
                                                           'father'] != "" else i18n_unknown
        father_mother = data['animal']['animal']['father_mother'] if data['animal']['animal'][
                                                                         'father_mother'] != "" else i18n_unknown
        father_mother_mother = data['animal']['animal']['father_mother_mother'] if data['animal']['animal'][
                                                                                       'father_mother_mother'] != "" else i18n_unknown
        father_mother_father = data['animal']['animal']['father_mother_father'] if data['animal']['animal'][
                                                                                       'father_mother_father'] != "" else i18n_unknown
        father_father = data['animal']['animal']['father_father'] if data['animal']['animal'][
                                                                         'father_father'] != "" else i18n_unknown
        father_father_mother = data['animal']['animal']['father_father_mother'] if data['animal']['animal'][
                                                                                       'father_father_mother'] != "" else i18n_unknown
        father_father_father = data['animal']['animal']['father_father_father'] if data['animal']['animal'][
                                                                                       'father_father_father'] != "" else i18n_unknown

        mother = data['animal']['animal']['mother'] if data['animal']['animal'][
                                                           'mother'] != "" else i18n_unknown
        mother_mother = data['animal']['animal']['mother_mother'] if data['animal']['animal'][
                                                                         'mother_mother'] != "" else i18n_unknown
        mother_mother_mother = data['animal']['animal']['mother_mother_mother'] if data['animal']['animal'][
                                                                                       'mother_mother_mother'] != "" else i18n_unknown
        mother_mother_father = data['animal']['animal']['mother_mother_father'] if data['animal']['animal'][
                                                                                       'mother_mother_father'] != "" else i18n_unknown
        mother_father = data['animal']['animal']['mother_father'] if data['animal']['animal'][
                                                                         'mother_father'] != "" else i18n_unknown
        mother_father_mother = data['animal']['animal']['mother_father_mother'] if data['animal']['animal'][
                                                                                       'mother_father_mother'] != "" else i18n_unknown
        mother_father_father = data['animal']['animal']['mother_father_father'] if data['animal']['animal'][
                                                                                       'mother_father_father'] != "" else i18n_unknown

        #  End Family Tree

        #  Start Family Tree 1
        family_tree1_origin = Image.open(app.config['IMG_DIRECTORY'] + "pdf/layout/familytree1.png")
        family_tree1_draw = ImageDraw.Draw(family_tree1_origin)

        family_tree1_draw.text((517, 50), i18n['apa'], fill="black", anchor="mm", font=font_title)
        family_tree1_draw.text((517, 75), father, fill="black", anchor="mm", font=font_body)

        family_tree1_draw.text((245, 178), i18n['apa_anyja'], fill="black", anchor="mm", font=font_title)
        family_tree1_draw.text((245, 202), father_mother, fill="black", anchor="mm", font=font_body)

        family_tree1_draw.text((101, 315), i18n['apa_anyja_anyja'], fill="black", anchor="mm", font=font_title)
        family_tree1_draw.text((101, 340), father_mother_mother, fill="black", anchor="mm", font=font_body)

        family_tree1_draw.text((375, 315), i18n['apa_anyja_apja'], fill="black", anchor="mm", font=font_title)
        family_tree1_draw.text((375, 340), father_mother_father, fill="black", anchor="mm", font=font_body)

        family_tree1_draw.text((790, 178), i18n['apa_apja'], fill="black", anchor="mm", font=font_title)
        family_tree1_draw.text((790, 202), father_father, fill="black", anchor="mm", font=font_body)

        family_tree1_draw.text((661, 315), i18n['apa_apja_anyja'], fill="black", anchor="mm", font=font_title)
        family_tree1_draw.text((661, 340), father_father_mother, fill="black", anchor="mm", font=font_body)

        family_tree1_draw.text((919, 315), i18n['apa_apja_apja'], fill="black", anchor="mm", font=font_title)
        family_tree1_draw.text((919, 340), father_father_father, fill="black", anchor="mm", font=font_body)

        family_tree1_origin.save(pdf_path + family1_filename)
        family_tree1_origin.close()

        family_tree1 = pdf_path + family1_filename
        #  Start Family Tree 1

        #  Start Family Tree 2
        family_tree2_origin = Image.open(app.config['IMG_DIRECTORY'] + "pdf/layout/familytree2.png")
        family_tree2_draw = ImageDraw.Draw(family_tree2_origin)

        family_tree2_draw.text((517, 50), i18n['anya'], fill="black", anchor="mm", font=font_title)
        family_tree2_draw.text((517, 75), mother, fill="black", anchor="mm", font=font_body)

        family_tree2_draw.text((245, 178), i18n['anya_anyja'], fill="black", anchor="mm", font=font_title)
        family_tree2_draw.text((245, 202), mother_mother, fill="black", anchor="mm", font=font_body)

        family_tree2_draw.text((101, 315), i18n['anya_anyja_anyja'], fill="black", anchor="mm", font=font_title)
        family_tree2_draw.text((101, 340), mother_mother_mother, fill="black", anchor="mm", font=font_body)

        family_tree2_draw.text((375, 315), i18n['anya_anyja_apja'], fill="black", anchor="mm", font=font_title)
        family_tree2_draw.text((375, 340), mother_mother_father, fill="black", anchor="mm", font=font_body)

        family_tree2_draw.text((790, 178), i18n['anya_apja'], fill="black", anchor="mm", font=font_title)
        family_tree2_draw.text((790, 202), mother_father, fill="black", anchor="mm", font=font_body)

        family_tree2_draw.text((661, 315), i18n['anya_apja_anyja'], fill="black", anchor="mm", font=font_title)
        family_tree2_draw.text((661, 340), mother_father_mother, fill="black", anchor="mm", font=font_body)

        family_tree2_draw.text((919, 315), i18n['anya_apja_apja'], fill="black", anchor="mm", font=font_title)
        family_tree2_draw.text((919, 340), mother_father_father, fill="black", anchor="mm", font=font_body)

        family_tree2_origin.save(pdf_path + family2_filename)
        family_tree2_origin.close()

        family_tree2 = pdf_path + family2_filename
        #  End Family Tree 2

        #  Start Details
        if lang == "hu":
            category = data['animal']['category']['name_hu']
            subcategory = data['animal']['subcategory']['name_hu']
            gender = data['animal']['animal']['gender_hu']
            color = data['animal']['animal']['color_hu']
            be_used_for = data['animal']['animal']['be_used_for_hu']
        elif lang == "en":
            category = data['animal']['category']['name_en']
            subcategory = data['animal']['subcategory']['name_en']
            gender = data['animal']['animal']['gender_en']
            color = data['animal']['animal']['color_en']
            be_used_for = data['animal']['animal']['be_used_for_en']
        elif lang == "de":
            category = data['animal']['category']['name_de']
            subcategory = data['animal']['subcategory']['name_de']
            gender = data['animal']['animal']['gender_de']
            color = data['animal']['animal']['color_de']
            be_used_for = data['animal']['animal']['be_used_for_de']
        elif lang == "fr":
            category = data['animal']['category']['name_fr']
            subcategory = data['animal']['subcategory']['name_fr']
            gender = data['animal']['animal']['gender_fr']
            color = data['animal']['animal']['color_fr']
            be_used_for = data['animal']['animal']['be_used_for_fr']
        elif lang == "es":
            category = data['animal']['category']['name_es']
            subcategory = data['animal']['subcategory']['name_es']
            gender = data['animal']['animal']['gender_es']
            color = data['animal']['animal']['color_es']
            be_used_for = data['animal']['animal']['be_used_for_es']
        else:
            category = None
            subcategory = None
            gender = None
            color = None
            be_used_for = None

        year_month_day = json_data['yearMonthDay']

        countries_json = io.open(_templates + "/i18n/countries." + lang + ".json", 'r', encoding='utf8')
        countries_read = json.loads(countries_json.read())
        countries = countries_read

        jq = JsonQ(data=countries)
        jq2 = JsonQ(data=countries)
        country_origin = jq.at("data").where("country_code", "=", data['animal']['animal']['country_origin']).get()
        country_residence = jq2.at("data").where("country_code", "=",
                                                 data['animal']['animal']['country_residence']).get()

        #  End Detail

        # description = data['animal']['animal']['description'].replace("<br>", "\n")
        br_cleaner = re.compile(r'<(br).*?>')
        description = br_cleaner.sub('', json_data['description'])

        pdf = PDF(orientation="portrait", format="A4")
        pdf.add_font('DejaVuSans', '', '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', uni=True)
        pdf.add_font('DejaVuSansBold', '', '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', uni=True)
        pdf.set_font("DejaVuSans", size=7)

        pdf.add_page()

        # pdf.set_y(3)
        pdf.cell(0, 0, page_url, align="L", link=page_url)
        pdf.cell(0, 0, json_data['nowDate'], align="R")

        pdf.write_html(f"""
            <section>
                <table width="100%">
                    <thead>
                        <tr>
                            <th width="100%"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td align="center"><img src="{pdf_ab_logo}" width="200"></td>
                        </tr>
                    </tbody>
                </table>
            </section>
        """)

        pdf.ln(25)

        pdf.set_font_size(24)
        pdf.set_text_color(0, 0, 0)
        pdf.cell(txt=f"{name}")

        pdf.ln(10)

        pdf.set_font_size(12)
        pdf.cell(txt=f"{price_eur_data} {price_eur_currency}")
        pdf.set_text_color(80, 80, 80)
        pdf.cell(txt=f"{price_eur_to_data} {price_eur_to_currency}")

        pdf.ln(10)

        pdf.set_text_color(0, 0, 0)
        pdf.write(6, f"{brief_description}")

        pdf.ln(10)

        if data['animal']['photo']['img_01'] != "" and data['animal']['photo']['img_01'] is not None:
            img_01_folder = data['animal']['photo']['img_01'].replace(".jpg", "")
            img_01 = app.config['IMG_DIRECTORY'] + "animal/" + img_01_folder + "/cropped/" + data['animal']['photo'][
                'img_01']
            pdf.image(img_01, w=pdf.epw, h=0)

        pdf.ln(10)

        pdf.write(6, f"{description}")

        pdf.ln(20)

        pdf.image(family_tree2, w=pdf.epw, h=0)

        pdf.ln(10)

        pdf.image(family_tree1, w=pdf.epw, h=0)

        pdf.ln(20)

        pdf.set_x(10)
        pdf.set_font_size(12)
        pdf.cell(0, 0, i18n['anlihouse-A268'])
        pdf.set_y(pdf.get_y() + 5)
        pdf.set_font_size(10)
        pdf.set_x(15)
        pdf.cell(0, 0, category)

        pdf.set_font_size(12)
        pdf.set_y(pdf.get_y() - 5)
        pdf.set_x(80)
        pdf.cell(0, 0, i18n['anlihouse-A270'])
        pdf.set_font_size(10)
        pdf.set_y(pdf.get_y() + 5)
        pdf.set_x(84)
        pdf.cell(0, 0, subcategory)

        pdf.set_font_size(12)
        pdf.set_y(pdf.get_y() - 5)
        pdf.set_x(150)
        pdf.cell(0, 0, i18n['anlihouse-A306'])
        pdf.set_font_size(10)
        pdf.set_y(pdf.get_y() + 5)
        pdf.set_x(154)
        pdf.cell(0, 0, name)

        pdf.ln(20)

        pdf.set_x(10)
        pdf.set_font_size(12)
        pdf.cell(0, 0, i18n['anlihouse-A307'])
        pdf.set_y(pdf.get_y() + 5)
        pdf.set_font_size(10)
        pdf.set_x(15)
        pdf.cell(0, 0, year_month_day)

        pdf.set_font_size(12)
        pdf.set_y(pdf.get_y() - 5)
        pdf.set_x(80)
        pdf.cell(0, 0, i18n['anlihouse-A271'])
        pdf.set_font_size(10)
        pdf.set_y(pdf.get_y() + 5)
        pdf.set_x(84)
        pdf.cell(0, 0, gender)

        pdf.set_font_size(12)
        pdf.set_y(pdf.get_y() - 5)
        pdf.set_x(150)
        pdf.cell(0, 0, i18n['anlihouse-A272'])
        pdf.set_font_size(10)
        pdf.set_y(pdf.get_y() + 5)
        pdf.set_x(154)
        pdf.cell(0, 0, color)

        pdf.ln(20)

        pdf.set_x(10)
        pdf.set_font_size(12)
        pdf.cell(0, 0, i18n['anlihouse-A308'])
        pdf.set_y(pdf.get_y() + 5)
        pdf.set_font_size(10)
        pdf.set_x(15)
        pdf.cell(0, 0, str(data['animal']['animal']['height']) + " cm")

        pdf.set_font_size(12)
        pdf.set_y(pdf.get_y() - 5)
        pdf.set_x(80)
        pdf.cell(0, 0, i18n['anlihouse-A273'])
        pdf.set_font_size(10)
        pdf.set_y(pdf.get_y() + 5)
        pdf.set_x(84)
        pdf.cell(0, 0, be_used_for)

        pdf.set_font_size(12)
        pdf.set_y(pdf.get_y() - 5)
        pdf.set_x(150)
        pdf.cell(0, 0, i18n['anlihouse-A277'])
        pdf.set_font_size(10)
        pdf.set_y(pdf.get_y() + 5)
        pdf.set_x(154)
        pdf.cell(0, 0, country_origin[0]['country'])

        pdf.ln(20)

        pdf.set_x(10)
        pdf.set_font_size(12)
        pdf.cell(0, 0, i18n['anlihouse-A276'])
        pdf.set_y(pdf.get_y() + 5)
        pdf.set_font_size(10)
        pdf.set_x(15)
        pdf.cell(0, 0, country_residence[0]['country'])

        pdf.set_font_size(12)
        pdf.set_y(pdf.get_y() - 5)
        pdf.set_x(80)
        pdf.cell(0, 0, i18n['anlihouse-A309'])
        pdf.set_font_size(10)
        pdf.set_y(pdf.get_y() + 5)
        pdf.set_x(84)

        pdf.set_font_size(12)
        pdf.set_y(pdf.get_y() - 5)
        pdf.set_x(150)
        pdf.cell(0, 0, i18n['anlihouse-A311'])
        pdf.set_font_size(10)
        pdf.set_y(pdf.get_y() + 5)
        pdf.set_x(154)
        pdf.cell(0, 0, txt=f"{price_eur_data} {price_eur_currency} {price_eur_to_data} {price_eur_to_currency}")

        pdf.ln(20)

        """
        elem_y = None
        if data['animal']['photo']['img_01'] != "" and data['animal']['photo']['img_01'] is not None:
            img_01_folder = data['animal']['photo']['img_01'].replace(".jpg", "")
            img_01 = app.config['IMG_DIRECTORY'] + "animal/" + img_01_folder + "/cropped/" + data['animal']['photo'][
                'img_01']
            elem_y = pdf.get_y()
            pdf.image(img_01, w=pdf.epw / 2 - 2, h=0)

        if data['animal']['photo']['img_02'] != "" and data['animal']['photo']['img_02'] is not None:
            img_02_folder = data['animal']['photo']['img_02'].replace(".jpg", "")
            img_02 = app.config['IMG_DIRECTORY'] + "animal/" + img_02_folder + "/cropped/" + data['animal']['photo'][
                'img_02']
            pdf.set_y(elem_y)
            pdf.image(img_02, w=pdf.epw / 2 - 2, h=0, x=pdf.epw / 2 + 12)
        """

        if data['animal']['photo']['img_01'] != "" and data['animal']['photo']['img_01'] is not None:
            img_01_folder = data['animal']['photo']['img_01'].replace(".jpg", "")
            img_01 = app.config['IMG_DIRECTORY'] + "animal/" + img_01_folder + "/cropped/" + data['animal']['photo'][
                'img_01']
            pdf.ln(4)
            pdf.image(img_01, w=pdf.epw, h=0)

        if data['animal']['photo']['img_02'] != "" and data['animal']['photo']['img_02'] is not None:
            img_02_folder = data['animal']['photo']['img_02'].replace(".jpg", "")
            img_02 = app.config['IMG_DIRECTORY'] + "animal/" + img_02_folder + "/cropped/" + data['animal']['photo'][
                'img_02']
            pdf.ln(4)
            pdf.image(img_02, w=pdf.epw, h=0)

        if data['animal']['photo']['img_03'] != "" and data['animal']['photo']['img_03'] is not None:
            img_03_folder = data['animal']['photo']['img_03'].replace(".jpg", "")
            img_03 = app.config['IMG_DIRECTORY'] + "animal/" + img_03_folder + "/cropped/" + data['animal']['photo'][
                'img_03']
            pdf.ln(4)
            pdf.image(img_03, w=pdf.epw, h=0)

        if data['animal']['photo']['img_04'] != "" and data['animal']['photo']['img_04'] is not None:
            img_04_folder = data['animal']['photo']['img_04'].replace(".jpg", "")
            img_04 = app.config['IMG_DIRECTORY'] + "animal/" + img_04_folder + "/cropped/" + data['animal']['photo'][
                'img_04']
            pdf.ln(4)
            pdf.image(img_04, w=pdf.epw, h=0)

        if data['animal']['photo']['img_05'] != "" and data['animal']['photo']['img_05'] is not None:
            img_05_folder = data['animal']['photo']['img_05'].replace(".jpg", "")
            img_05 = app.config['IMG_DIRECTORY'] + "animal/" + img_05_folder + "/cropped/" + data['animal']['photo'][
                'img_05']
            pdf.ln(4)
            pdf.image(img_05, w=pdf.epw, h=0)

        if data['animal']['photo']['img_06'] != "" and data['animal']['photo']['img_06'] is not None:
            img_06_folder = data['animal']['photo']['img_06'].replace(".jpg", "")
            img_06 = app.config['IMG_DIRECTORY'] + "animal/" + img_06_folder + "/cropped/" + data['animal']['photo'][
                'img_06']
            pdf.ln(4)
            pdf.image(img_06, w=pdf.epw, h=0)

        if data['animal']['photo']['img_07'] != "" and data['animal']['photo']['img_07'] is not None:
            img_07_folder = data['animal']['photo']['img_07'].replace(".jpg", "")
            img_07 = app.config['IMG_DIRECTORY'] + "animal/" + img_07_folder + "/cropped/" + data['animal']['photo'][
                'img_07']
            pdf.ln(4)
            pdf.image(img_07, w=pdf.epw, h=0)

        if data['animal']['photo']['img_08'] != "" and data['animal']['photo']['img_08'] is not None:
            img_08_folder = data['animal']['photo']['img_08'].replace(".jpg", "")
            img_08 = app.config['IMG_DIRECTORY'] + "animal/" + img_08_folder + "/cropped/" + data['animal']['photo'][
                'img_08']
            pdf.ln(4)
            pdf.image(img_08, w=pdf.epw, h=0)

        if data['animal']['photo']['img_09'] != "" and data['animal']['photo']['img_09'] is not None:
            img_09_folder = data['animal']['photo']['img_09'].replace(".jpg", "")
            img_09 = app.config['IMG_DIRECTORY'] + "animal/" + img_09_folder + "/cropped/" + data['animal']['photo'][
                'img_09']
            pdf.ln(4)
            pdf.image(img_09, w=pdf.epw, h=0)

        if data['animal']['photo']['img_10'] != "" and data['animal']['photo']['img_10'] is not None:
            img_10_folder = data['animal']['photo']['img_10'].replace(".jpg", "")
            img_10 = app.config['IMG_DIRECTORY'] + "animal/" + img_10_folder + "/cropped/" + data['animal']['photo'][
                'img_10']
            pdf.ln(4)
            pdf.image(img_10, w=pdf.epw, h=0)

        # pdf.set_line_width(0.1)
        # pdf.set_draw_color(r=0, g=0, b=0)
        # pdf.line(x1=10, y1=pdf.get_y() + 10, x2=pdf.epw + 10, y2=pdf.get_y() + 10)

        pdf_ah_logo = app.config['IMG_DIRECTORY'] + "pdf/layout/ah-logo.png"

        pdf.ln(10)

        pdf.write_html(f"""
                    <section>
                        <table width="100%">
                            <thead>
                                <tr>
                                    <th width="100%"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td align="center"><img src="{pdf_ah_logo}" width="100"></td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                """)

        pdf.ln(12)

        pdf.set_font_size(8)
        pdf.cell(0, 0,
                 "www.anlihouse.com | www.anliauction.com | www.anlibreeders.com | www.anlivehicle.com | www.anlirealestate.com",
                 align="C")

        pdf.output(pdf_path + pdf_filename)
        pdf_file_path = os.path.join("/static/pdf/tmp/full/" + pdf_folder + pdf_filename)

        data_pdf_action = json_data['dataPdfAction']

        data = {"status": 'success', 'message': pdf_file_path, "data_pdf_action": data_pdf_action}
        return make_response(jsonify(data), 200)
    else:
        data = {"status": 'error', 'message': r.json()}
        return make_response(jsonify(data), 400)


# AJAX
@mod.route('/_alike', methods=['POST'])
def _alike():
    try:
        try:
            lang = parse.unquote(request.cookies.get("abBrowserLang")).replace("%22", "").replace('"', '')
        except TypeError:
            lang = "en"
    except TypeError:
        supported_languages = app.config['SUPPORTED_LANGUAGES']
        lang = request.accept_languages.best_match(supported_languages)

    if g.logged_in and \
            g.permission['is_user_login']['user_permission']['is_admin'] == "True" or \
            g.permission['is_user_login']['user_permission']['subscribed'] == "True":
        price_show = True
        customer_user_id = g.permission['is_user_login']['user']['id']
    else:
        price_show = False
        customer_user_id = None

    data = json.loads(request.get_data())

    subcategory_id = data['subcategory_id']
    animal_id = data['animal_id']

    url = app.config['API_SERVER_URL'] + "/alike"
    headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
    payload = {
        "subcategory_id": subcategory_id,
        "animal_id": animal_id,
        "price_show": price_show,
        "customer_user_id": customer_user_id,
        "lang": lang
    }
    r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

    if r.status_code == 200:
        data = {"status": 'success', 'message': r.json()}
        return make_response(jsonify(data), 200)
    else:
        data = {"status": 'error', 'message': r.json()}
        return make_response(jsonify(data), 400)


# AJAX
@mod.route('/_user-to-user-message', methods=['POST'])
def _user_to_user_message():
    if g.logged_in:
        form_data = json.loads(request.get_data())

        sender_id = g.permission['is_user_login']['user']['id']
        host_id = form_data['host_id']

        url = app.config['API_SERVER_URL'] + "/user-to-user-message"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "sender_id": sender_id,
            "host_id": host_id
        }
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            data = {"status": 'success', 'message': r.json()}
            return make_response(jsonify(data), 200)
        else:
            data = {"status": 'error', 'message': r.json()}
            return make_response(jsonify(data), 400)
