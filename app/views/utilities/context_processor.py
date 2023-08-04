# -*- coding: utf-8 -*-
from app import app
from config import _templates
from flask import Blueprint, request, json
import jwt
import requests
from app.forms.filter_forms import FilterForm
from urllib import parse
import io
from pyjsonq import JsonQ
from urllib.parse import urlparse
from app.views.utilities.utility import EncodedJWT, DecodeJWT
import os
from datetime import datetime

mod = Blueprint('context_processor', __name__)


@app.context_processor
def handle_context():
    return dict(os=os)


@app.context_processor
def config_data():
    #: Jinja2 Ex: if config_data OR {{ config_data['BRAND_NAME'] }}
    data = {
        "BRAND_NAME": app.config['BRAND_NAME'],
        "SITE_URL": app.config['SITE_URL'],
        "VERSION": app.config['VERSION'],
        "YEAR": datetime.today().year
    }
    return dict(config_data=data)


@app.context_processor
def inject_is_user_login():
    #: Jinja2 Ex: if is_user_login OR {{ is_user_login['user']['email'] }}
    token = request.cookies.get("abToken")
    result = dict({"is_logged": False})

    if token:
        try:
            decode_token = jwt.decode(token, app.config['API_SECRET_KEY'], algorithms=['HS256'])

            url = app.config['API_SERVER_URL'] + "/get-user-data"
            headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
            payload = {
                "email": decode_token['email']
            }

            r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

            if r.status_code == 200:
                data = r.json().get("payload")
                result = dict(is_user_login=data)
            else:
                pass
        except jwt.ExpiredSignatureError:
            app.logger.error('Signature expired.')
        except jwt.InvalidTokenError:
            app.logger.error('Invalid token.')
    else:
        pass
    return result


@app.context_processor
def inject_filter_form():
    filter_form = FilterForm()

    url = urlparse(request.url)
    url_path = url.path
    url_path_split = url_path.split("/")

    if url_path_split[1] == "query" or url_path_split[1] == "snap":
        try:
            # Start Set Filter Form Inputs
            query_decode = DecodeJWT.decode(url_path_split[3])
            filter_form.where_input.data = query_decode['where_input']
            filter_form.where_all.data = query_decode['where_all']
            filter_form.where_name.data = query_decode['where_name']
            filter_form.where_description.data = query_decode['where_description']

            filter_form.price_min.data = query_decode['price_min']
            filter_form.price_max.data = query_decode['price_max']

            filter_form.category_all.data = query_decode['category_all']

            filter_form.subcategory_all.data = query_decode['subcategory_all']

            filter_form.gender_all.data = query_decode['gender_all']

            filter_form.color_all.data = query_decode['color_all']

            filter_form.be_used_for_all.data = query_decode['be_used_for_all']

            filter_form.age_min.data = query_decode['age_min']
            filter_form.age_max.data = query_decode['age_max']

            filter_form.region_residence.data = query_decode['region_residence']
            filter_form.country_residence.data = query_decode['country_residence']


            filter_form.order_by_price.data = query_decode['order_by_price']
            filter_form.order_by_rating.data = query_decode['order_by_rating']

            filter_form.only_one_category_id.data = query_decode['only_one_category_id']
            filter_form.only_one_subcategory_id.data = query_decode['only_one_subcategory_id']

            filter_form.seller_user_id.data = query_decode['seller_user_id']
            filter_form.seller_user_name.data = query_decode['seller_user_name']

            filter_form.wishlist.data = query_decode['wishlist']

            if url_path_split[1] == "snap":
                filter_form.snap.data = "True"
            else:
                filter_form.snap.data = "None"

            filter_form.encode.data = url_path_split[3]
            # End Set Filter Form Inputs
        except IndexError:
            # Start Set Default Filter Form Inputs
            filter_form.where_input.data = ""
            filter_form.where_all.data = "active"
            filter_form.where_name.data = "inactive"
            filter_form.where_description.data = "inactive"

            filter_form.price_min.data = app.config['FILTER_PRICE_MIN']
            filter_form.price_max.data = app.config['FILTER_PRICE_MAX']

            filter_form.category_all.data = '[0]'

            filter_form.subcategory_all.data = '[0]'

            filter_form.gender_all.data = '[0]'

            filter_form.color_all.data = '[0]'

            filter_form.be_used_for_all.data = '[0]'


            filter_form.region_residence.data = 'ALL'
            filter_form.country_residence.data = 'ALL'


            filter_form.order_by_price.data = "None"
            filter_form.order_by_rating.data = "desc"

            filter_form.encode.data = "None"

            filter_form.only_one_category_id.data = "None"
            filter_form.only_one_subcategory_id.data = "None"

            filter_form.seller_user_id.data = "None"
            filter_form.seller_user_name.data = "None"

            filter_form.wishlist.data = "None"

            if url_path_split[1] == "snap":
                filter_form.snap.data = "True"
            else:
                filter_form.snap.data = "None"
            # End Set Default Filter Form Inputs
    if url_path_split[1] != "query" and url_path_split[1] != "snap":
        # Start Set Default Filter Form Inputs
        filter_form.where_input.data = ""
        filter_form.where_all.data = "active"
        filter_form.where_name.data = "inactive"
        filter_form.where_description.data = "inactive"

        filter_form.price_min.data = app.config['FILTER_PRICE_MIN']
        filter_form.price_max.data = app.config['FILTER_PRICE_MAX']

        filter_form.category_all.data = '[0]'

        filter_form.subcategory_all.data = '[0]'

        filter_form.gender_all.data = '[0]'

        filter_form.color_all.data = '[0]'

        filter_form.be_used_for_all.data = '[0]'



        filter_form.region_residence.data = 'ALL'
        filter_form.country_residence.data = 'ALL'


        filter_form.order_by_price.data = "None"
        filter_form.order_by_rating.data = "desc"

        filter_form.encode.data = "None"

        filter_form.only_one_category_id.data = "None"
        filter_form.only_one_subcategory_id.data = "None"

        filter_form.seller_user_id.data = "None"
        filter_form.seller_user_name.data = "None"

        filter_form.wishlist.data = "None"

        if url_path_split[1] == "snap":
            filter_form.snap.data = "None"
        else:
            filter_form.snap.data = "None"
    # End Set Default Filter Form Inputs

    return dict(filter_form=filter_form)


@app.context_processor
def inject_filter_category_all():
    try:
        try:
            lang = parse.unquote(request.cookies.get("abBrowserLang")).replace("%22", "").replace('"', '')
        except TypeError:
            lang = "en"
    except TypeError:
        supported_languages = app.config['SUPPORTED_LANGUAGES']
        lang = request.accept_languages.best_match(supported_languages)

    url = app.config['API_SERVER_URL'] + "/get-filter-category-all"
    headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
    payload = {
        "lang": lang
    }
    r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

    if r.status_code == 200:
        data = r.json().get("category_list_all")
        return dict(filter_category_all=data)
    else:
        pass


@app.context_processor
def inject_category_subcategory_all():
    try:
        try:
            lang = parse.unquote(request.cookies.get("abBrowserLang")).replace("%22", "").replace('"', '')
        except TypeError:
            lang = "en"
    except TypeError:
        supported_languages = app.config['SUPPORTED_LANGUAGES']
        lang = request.accept_languages.best_match(supported_languages)

    url = app.config['API_SERVER_URL'] + "/get-category-subcategory-all"
    headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
    payload = {
        "lang": lang
    }
    r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

    if r.status_code == 200:
        data = r.json()
        return dict(category_subcategory_all=data)
    else:
        pass


@app.context_processor
def inject_filter_countries():
    try:
        try:
            lang = parse.unquote(request.cookies.get("abBrowserLang")).replace("%22", "").replace('"', '')
        except TypeError:
            lang = "en"
    except TypeError:
        supported_languages = app.config['SUPPORTED_LANGUAGES']
        lang = request.accept_languages.best_match(supported_languages)

    countries_json = io.open(_templates + "/i18n/countries." + lang + ".json", 'r', encoding='utf8')
    countries_read = json.loads(countries_json.read())
    countries = countries_read

    jq = JsonQ(data=countries)
    countries = jq.at("data").sort_by("country", "asc").group_by('region').get()

    return dict(filter_countries=countries)


@app.context_processor
def inject_color_mode():
    try:
        try:
            color = parse.unquote(request.cookies.get("abMatchMedia")).replace("%22", "").replace('"', '')
        except TypeError:
            color = "dark"
    except TypeError:
        color = "dark"

    data = {
        "color": color
    }
    return dict(color_mode=data)
