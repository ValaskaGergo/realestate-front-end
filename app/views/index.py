# -*- coding: utf-8 -*-
from app import app
from config import _templates, _static
from flask import Blueprint, render_template, g, redirect, url_for, make_response, jsonify, json, request
from flask_caching import Cache
import requests
from urllib import parse
from .utilities.utility import EncodedJWT, DecodeJWT
import io

mod = Blueprint('index_module', __name__)
cache = Cache(app)


@mod.route('/', methods=['GET'])
@mod.route('/query/<page_number>', methods=['GET'])
@mod.route('/query/<page_number>/<filter_data>', methods=['GET'])
# @cache.cached(timeout=50)
def index(page_number=None, filter_data=None):
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

    countries_json = io.open(_templates + "/i18n/countries." + lang + ".json", 'r', encoding='utf8')
    countries_read = json.loads(countries_json.read())
    countries = countries_read

    animals = None
    pagination = None
    pagination_list = None
    only_one_category_id = None
    only_one_category_name = None
    only_one_subcategory_id = None
    only_one_subcategory_name = None
    only_one_category_name_slug = None
    seller_user_id = None
    seller_user_name = None
    seller_user_name_slug = None
    wishlist = None
    is_wishlist = None

    if page_number is None:
        page_number = 1

    if filter_data is None:
        encode = {
            "lang": lang,
            "where_input": "",
            "where_all": "active",
            "where_name": "inactive",
            "where_description": "inactive",
            "where_family": "inactive",
            "where_family_mother": "inactive",
            "where_family_mother_mother": "inactive",
            "where_family_mother_father": "inactive",
            "where_family_mother_mother_mother": "inactive",
            "where_family_mother_mother_father": "inactive",
            "where_family_mother_father_mother": "inactive",
            "where_family_mother_father_father": "inactive",
            "where_family_father": "inactive",
            "where_family_father_mother": "inactive",
            "where_family_father_father": "inactive",
            "where_family_father_mother_mother": "inactive",
            "where_family_father_mother_father": "inactive",
            "where_family_father_father_mother": "inactive",
            "where_family_father_father_father": "inactive",
            "price_min": app.config['FILTER_PRICE_MIN'],
            "price_max": app.config['FILTER_PRICE_MAX'],
            "category_all": '[0]',
            "subcategory_all": '[0]',
            "gender_all": '[0]',
            "color_all": '[0]',
            "be_used_for_all": '[0]',
            "age_min": app.config['FILTER_AGE_MIN'],
            "age_max": app.config['FILTER_AGE_MAX'],
            "region_residence": 'ALL',
            "country_residence": 'ALL',
            "region_origin": 'ALL',
            "country_origin": 'ALL',
            "order_by_price": "None",
            "order_by_age": "None",
            "order_by_rating": "desc",
            "only_one_category_id": "None",
            "only_one_subcategory_id": "None",
            "seller_user_id": "None",
            "seller_user_name": "None",
            "wishlist": "None",
            "snap": "None"
        }
        url = app.config['API_SERVER_URL'] + "/get-filter-data"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "encode": EncodedJWT.encoded(encode),
            "page_number": page_number,
            "customer_user_id": customer_user_id
        }
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            data = r.json()
            animals = data['animals_list']
            pagination = data['pagination']
            pagination_list = data['pagination_list']
            only_one_category_id = data['only_one_category_id']
            only_one_category_name = data['only_one_category_name']
            only_one_subcategory_id = data['only_one_subcategory_id']
            only_one_subcategory_name = data['only_one_subcategory_name']
            only_one_category_name_slug = data['only_one_category_name_slug']
            try:
                seller_user_id = data['animals_list'][0]['seller']['seller_user_id']
                seller_user_name = data['animals_list'][0]['seller']['seller_user_name']
                seller_user_name_slug = data['animals_list'][0]['seller']['seller_user_name_slug']
            except IndexError:
                pass
            payload['encode'] = None
        else:
            data = {"status": 'error', 'message': r.json()}
    else:
        url = app.config['API_SERVER_URL'] + "/get-filter-data"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "encode": filter_data,
            "page_number": page_number,
            "snap": "None",
            "customer_user_id": customer_user_id
        }
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            data = r.json()
            animals = data['animals_list']
            pagination = data['pagination']
            pagination_list = data['pagination_list']
            only_one_category_id = data['only_one_category_id']
            only_one_category_name = data['only_one_category_name']
            only_one_subcategory_id = data['only_one_subcategory_id']
            only_one_subcategory_name = data['only_one_subcategory_name']
            only_one_category_name_slug = data['only_one_category_name_slug']
            try:
                seller_user_id = data['animals_list'][0]['seller']['seller_user_id']
                seller_user_name = data['animals_list'][0]['seller']['seller_user_name']
                seller_user_name_slug = data['animals_list'][0]['seller']['seller_user_name_slug']
            except IndexError:
                pass

            wishlist = data['wishlist']
            try:
                is_wishlist = data['animals_list'][0]['wishlist']['is_wishlist']
            except IndexError:
                pass
        else:
            data = {"status": 'error', 'message': r.json()}

    if g.logged_in:
        return render_template('authentication/index.jinja2',
                               lang=lang,
                               animals=animals,
                               pagination_list=pagination_list,
                               page_number=pagination['page_number'],
                               animals_limit=pagination['animals_limit'],
                               animals_count=pagination['animals_count'],
                               pagination_count=pagination['pagination_count'],
                               pagination_first=pagination['pagination_first'],
                               pagination_last=pagination['pagination_last'],
                               pagination_next=pagination['pagination_next'],
                               pagination_previous=pagination['pagination_previous'],
                               countries=countries,
                               filter_data=payload['encode'],
                               only_one_category_id=only_one_category_id,
                               only_one_category_name=only_one_category_name,
                               only_one_subcategory_id=only_one_subcategory_id,
                               only_one_subcategory_name=only_one_subcategory_name,
                               only_one_category_name_slug=only_one_category_name_slug,
                               price_show=price_show,
                               seller_user_id=seller_user_id,
                               seller_user_name=seller_user_name,
                               seller_user_name_slug=seller_user_name_slug,
                               wishlist=wishlist,
                               is_wishlist=is_wishlist)
    else:
        return render_template('anonymous/index.jinja2',
                               lang=lang,
                               animals=animals,
                               pagination_list=pagination_list,
                               page_number=pagination['page_number'],
                               animals_limit=pagination['animals_limit'],
                               animals_count=pagination['animals_count'],
                               pagination_count=pagination['pagination_count'],
                               pagination_first=pagination['pagination_first'],
                               pagination_last=pagination['pagination_last'],
                               pagination_next=pagination['pagination_next'],
                               pagination_previous=pagination['pagination_previous'],
                               countries=countries,
                               filter_data=payload['encode'],
                               only_one_category_id=only_one_category_id,
                               only_one_category_name=only_one_category_name,
                               only_one_subcategory_id=only_one_subcategory_id,
                               only_one_subcategory_name=only_one_subcategory_name,
                               only_one_category_name_slug=only_one_category_name_slug,
                               price_show=price_show,
                               seller_user_id=seller_user_id,
                               seller_user_name=seller_user_name,
                               seller_user_name_slug=seller_user_name_slug,
                               wishlist=wishlist,
                               is_wishlist=is_wishlist)


# AJAX
@mod.route('/_get-user-data', methods=['POST'])
def _chat_list():
    if g.logged_in:
        email = g.permission['is_user_login']['user']['email']

        url = app.config['API_SERVER_URL'] + "/get-user-data"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "email": email
        }
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            data = {"status": 'success', 'message': r.json()}
            return make_response(jsonify(data), 200)
        else:
            data = {"status": 'error', 'message': r.json()}
            return make_response(jsonify(data), 400)


# AJAX
@mod.route('/_list-ajax-pagination', methods=['POST'])
def _list_ajax_pagination():
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

    data = json.loads(request.get_data())

    encode = data['encode']
    page_number = int(data['dataPageNumber']) + 1
    pagination_last = data['dataPaginationLast']
    snap = data['snap']

    if g.logged_in and \
            g.permission['is_user_login']['user_permission']['is_admin'] == "True" or \
            g.permission['is_user_login']['user_permission']['subscribed'] == "True":
        price_show = True
        customer_user_id = g.permission['is_user_login']['user']['id']
    else:
        price_show = False
        customer_user_id = None

    if encode == "None":
        encode = {
            "lang": lang,
            "where_input": "",
            "where_all": "active",
            "where_name": "inactive",
            "where_description": "inactive",
            "where_family": "inactive",
            "where_family_mother": "inactive",
            "where_family_mother_mother": "inactive",
            "where_family_mother_father": "inactive",
            "where_family_mother_mother_mother": "inactive",
            "where_family_mother_mother_father": "inactive",
            "where_family_mother_father_mother": "inactive",
            "where_family_mother_father_father": "inactive",
            "where_family_father": "inactive",
            "where_family_father_mother": "inactive",
            "where_family_father_father": "inactive",
            "where_family_father_mother_mother": "inactive",
            "where_family_father_mother_father": "inactive",
            "where_family_father_father_mother": "inactive",
            "where_family_father_father_father": "inactive",
            "price_min": app.config['FILTER_PRICE_MIN'],
            "price_max": app.config['FILTER_PRICE_MAX'],
            "category_all": '[0]',
            "subcategory_all": '[0]',
            "gender_all": '[0]',
            "color_all": '[0]',
            "be_used_for_all": '[0]',
            "age_min": app.config['FILTER_AGE_MIN'],
            "age_max": app.config['FILTER_AGE_MAX'],
            "region_residence": 'ALL',
            "country_residence": 'ALL',
            "region_origin": 'ALL',
            "country_origin": 'ALL',
            "order_by_price": "None",
            "order_by_age": "None",
            "order_by_rating": "desc",
            "only_one_category_id": "None",
            "only_one_subcategory_id": "None",
            "seller_user_id": "None",
            "seller_user_name": "None",
            "wishlist": "None",
            "snap": snap
        }
        url = app.config['API_SERVER_URL'] + "/get-filter-data"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "encode": EncodedJWT.encoded(encode),
            "page_number": page_number,
            "customer_user_id": customer_user_id
        }
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])
        if r.status_code == 200:
            data = {"status": 'success', 'message': r.json(), "countries": countries, "price_show": price_show}
            return make_response(jsonify(data), 200)
        else:
            data = {"status": 'error', 'message': r.json()}
            return make_response(jsonify(data), 400)
    else:
        url = app.config['API_SERVER_URL'] + "/get-filter-data"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "encode": encode,
            "page_number": page_number,
            "customer_user_id": customer_user_id
        }
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])
        if r.status_code == 200:
            data = {"status": 'success', 'message': r.json(), "countries": countries, "price_show": price_show}
            return make_response(jsonify(data), 200)
        else:
            data = {"status": 'error', 'message': r.json()}
            return make_response(jsonify(data), 400)


@mod.route('/category/<category_name>/<category_id>', methods=['GET'])
def category_list(category_name, category_id):
    try:
        try:
            lang = parse.unquote(request.cookies.get("abBrowserLang")).replace("%22", "").replace('"', '')
        except TypeError:
            lang = "en"
    except TypeError:
        supported_languages = app.config['SUPPORTED_LANGUAGES']
        lang = request.accept_languages.best_match(supported_languages)

    encode = {
        "lang": lang,
        "where_input": "",
        "where_all": "active",
        "where_name": "inactive",
        "where_description": "inactive",
        "where_family": "inactive",
        "where_family_mother": "inactive",
        "where_family_mother_mother": "inactive",
        "where_family_mother_father": "inactive",
        "where_family_mother_mother_mother": "inactive",
        "where_family_mother_mother_father": "inactive",
        "where_family_mother_father_mother": "inactive",
        "where_family_mother_father_father": "inactive",
        "where_family_father": "inactive",
        "where_family_father_mother": "inactive",
        "where_family_father_father": "inactive",
        "where_family_father_mother_mother": "inactive",
        "where_family_father_mother_father": "inactive",
        "where_family_father_father_mother": "inactive",
        "where_family_father_father_father": "inactive",
        "price_min": app.config['FILTER_PRICE_MIN'],
        "price_max": app.config['FILTER_PRICE_MAX'],
        "category_all": str([int(category_id)]),
        "subcategory_all": '[0]',
        "gender_all": '[0]',
        "color_all": '[0]',
        "be_used_for_all": '[0]',
        "age_min": app.config['FILTER_AGE_MIN'],
        "age_max": app.config['FILTER_AGE_MAX'],
        "region_residence": 'ALL',
        "country_residence": 'ALL',
        "region_origin": 'ALL',
        "country_origin": 'ALL',
        "order_by_price": "None",
        "order_by_age": "None",
        "order_by_rating": "desc",
        "only_one_category_id": category_id,
        "only_one_subcategory_id": "None",
        "seller_user_id": "None",
        "seller_user_name": "None",
        "wishlist": "None",
        "snap": "None"
    }
    return redirect('/query/1/' + EncodedJWT.encoded(encode))


@mod.route('/category/<category_name>/<category_id>/<subcategory_name>/<subcategory_id>', methods=['GET'])
def subcategory_list(category_name, category_id, subcategory_name, subcategory_id):
    try:
        try:
            lang = parse.unquote(request.cookies.get("abBrowserLang")).replace("%22", "").replace('"', '')
        except TypeError:
            lang = "en"
    except TypeError:
        supported_languages = app.config['SUPPORTED_LANGUAGES']
        lang = request.accept_languages.best_match(supported_languages)

    encode = {
        "lang": lang,
        "where_input": "",
        "where_all": "active",
        "where_name": "inactive",
        "where_description": "inactive",
        "where_family": "inactive",
        "where_family_mother": "inactive",
        "where_family_mother_mother": "inactive",
        "where_family_mother_father": "inactive",
        "where_family_mother_mother_mother": "inactive",
        "where_family_mother_mother_father": "inactive",
        "where_family_mother_father_mother": "inactive",
        "where_family_mother_father_father": "inactive",
        "where_family_father": "inactive",
        "where_family_father_mother": "inactive",
        "where_family_father_father": "inactive",
        "where_family_father_mother_mother": "inactive",
        "where_family_father_mother_father": "inactive",
        "where_family_father_father_mother": "inactive",
        "where_family_father_father_father": "inactive",
        "price_min": app.config['FILTER_PRICE_MIN'],
        "price_max": app.config['FILTER_PRICE_MAX'],
        "category_all": str([int(category_id)]),
        "subcategory_all": str([int(subcategory_id)]),
        "gender_all": '[0]',
        "color_all": '[0]',
        "be_used_for_all": '[0]',
        "age_min": app.config['FILTER_AGE_MIN'],
        "age_max": app.config['FILTER_AGE_MAX'],
        "region_residence": 'ALL',
        "country_residence": 'ALL',
        "region_origin": 'ALL',
        "country_origin": 'ALL',
        "order_by_price": "None",
        "order_by_age": "None",
        "order_by_rating": "desc",
        "only_one_category_id": category_id,
        "only_one_subcategory_id": subcategory_id,
        "seller_user_id": "None",
        "seller_user_name": "None",
        "wishlist": "None",
        "snap": "None"
    }
    return redirect('/query/1/' + EncodedJWT.encoded(encode))


@mod.route('/list/<user_name>/<int:user_id>', methods=['GET'])
def user_animal_list(user_id, user_name):
    try:
        try:
            lang = parse.unquote(request.cookies.get("abBrowserLang")).replace("%22", "").replace('"', '')
        except TypeError:
            lang = "en"
    except TypeError:
        supported_languages = app.config['SUPPORTED_LANGUAGES']
        lang = request.accept_languages.best_match(supported_languages)

    encode = {
        "lang": lang,
        "where_input": "",
        "where_all": "active",
        "where_name": "inactive",
        "where_description": "inactive",
        "where_family": "inactive",
        "where_family_mother": "inactive",
        "where_family_mother_mother": "inactive",
        "where_family_mother_father": "inactive",
        "where_family_mother_mother_mother": "inactive",
        "where_family_mother_mother_father": "inactive",
        "where_family_mother_father_mother": "inactive",
        "where_family_mother_father_father": "inactive",
        "where_family_father": "inactive",
        "where_family_father_mother": "inactive",
        "where_family_father_father": "inactive",
        "where_family_father_mother_mother": "inactive",
        "where_family_father_mother_father": "inactive",
        "where_family_father_father_mother": "inactive",
        "where_family_father_father_father": "inactive",
        "price_min": app.config['FILTER_PRICE_MIN'],
        "price_max": app.config['FILTER_PRICE_MAX'],
        "category_all": '[0]',
        "subcategory_all": '[0]',
        "gender_all": '[0]',
        "color_all": '[0]',
        "be_used_for_all": '[0]',
        "age_min": app.config['FILTER_AGE_MIN'],
        "age_max": app.config['FILTER_AGE_MAX'],
        "region_residence": 'ALL',
        "country_residence": 'ALL',
        "region_origin": 'ALL',
        "country_origin": 'ALL',
        "order_by_price": "None",
        "order_by_age": "None",
        "order_by_rating": "desc",
        "only_one_category_id": "None",
        "only_one_subcategory_id": "None",
        "seller_user_id": user_id,
        "seller_user_name": user_name,
        "wishlist": "None",
        "snap": "None"
    }
    return redirect('/query/1/' + EncodedJWT.encoded(encode))


@mod.route('/wishlist', methods=['GET'])
def user_animal_wishlist():
    if g.logged_in:
        try:
            try:
                lang = parse.unquote(request.cookies.get("abBrowserLang")).replace("%22", "").replace('"', '')
            except TypeError:
                lang = "en"
        except TypeError:
            supported_languages = app.config['SUPPORTED_LANGUAGES']
            lang = request.accept_languages.best_match(supported_languages)

        encode = {
            "lang": lang,
            "where_input": "",
            "where_all": "active",
            "where_name": "inactive",
            "where_description": "inactive",
            "where_family": "inactive",
            "where_family_mother": "inactive",
            "where_family_mother_mother": "inactive",
            "where_family_mother_father": "inactive",
            "where_family_mother_mother_mother": "inactive",
            "where_family_mother_mother_father": "inactive",
            "where_family_mother_father_mother": "inactive",
            "where_family_mother_father_father": "inactive",
            "where_family_father": "inactive",
            "where_family_father_mother": "inactive",
            "where_family_father_father": "inactive",
            "where_family_father_mother_mother": "inactive",
            "where_family_father_mother_father": "inactive",
            "where_family_father_father_mother": "inactive",
            "where_family_father_father_father": "inactive",
            "price_min": app.config['FILTER_PRICE_MIN'],
            "price_max": app.config['FILTER_PRICE_MAX'],
            "category_all": '[0]',
            "subcategory_all": '[0]',
            "gender_all": '[0]',
            "color_all": '[0]',
            "be_used_for_all": '[0]',
            "age_min": app.config['FILTER_AGE_MIN'],
            "age_max": app.config['FILTER_AGE_MAX'],
            "region_residence": 'ALL',
            "country_residence": 'ALL',
            "region_origin": 'ALL',
            "country_origin": 'ALL',
            "order_by_price": "None",
            "order_by_age": "None",
            "order_by_rating": "desc",
            "only_one_category_id": "None",
            "only_one_subcategory_id": "None",
            "seller_user_id": "None",
            "seller_user_name": "None",
            "wishlist": g.permission['is_user_login']['user']['id'],
            "snap": "None"
        }
        return redirect('/query/1/' + EncodedJWT.encoded(encode))
    else:
        return render_template('errorhandler/404.jinja2')


@mod.route('/snap', methods=['GET'])
@mod.route('/snap/<page_number>', methods=['GET'])
@mod.route('/snap/<page_number>/<filter_data>', methods=['GET'])
#  @cache.cached(timeout=50)
def snap(page_number=None, filter_data=None):
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

    countries_json = io.open(_templates + "/i18n/countries." + lang + ".json", 'r', encoding='utf8')
    countries_read = json.loads(countries_json.read())
    countries = countries_read

    animals = None
    pagination = None
    pagination_list = None
    only_one_category_id = None
    only_one_category_name = None
    only_one_subcategory_id = None
    only_one_subcategory_name = None
    only_one_category_name_slug = None
    seller_user_id = None
    seller_user_name = None
    seller_user_name_slug = None
    wishlist = None
    is_wishlist = None

    if page_number is None:
        page_number = 1

    if filter_data is None:
        encode = {
            "lang": lang,
            "where_input": "",
            "where_all": "active",
            "where_name": "inactive",
            "where_description": "inactive",
            "where_family": "inactive",
            "where_family_mother": "inactive",
            "where_family_mother_mother": "inactive",
            "where_family_mother_father": "inactive",
            "where_family_mother_mother_mother": "inactive",
            "where_family_mother_mother_father": "inactive",
            "where_family_mother_father_mother": "inactive",
            "where_family_mother_father_father": "inactive",
            "where_family_father": "inactive",
            "where_family_father_mother": "inactive",
            "where_family_father_father": "inactive",
            "where_family_father_mother_mother": "inactive",
            "where_family_father_mother_father": "inactive",
            "where_family_father_father_mother": "inactive",
            "where_family_father_father_father": "inactive",
            "price_min": app.config['FILTER_PRICE_MIN'],
            "price_max": app.config['FILTER_PRICE_MAX'],
            "category_all": '[0]',
            "subcategory_all": '[0]',
            "gender_all": '[0]',
            "color_all": '[0]',
            "be_used_for_all": '[0]',
            "age_min": app.config['FILTER_AGE_MIN'],
            "age_max": app.config['FILTER_AGE_MAX'],
            "region_residence": 'ALL',
            "country_residence": 'ALL',
            "region_origin": 'ALL',
            "country_origin": 'ALL',
            "order_by_price": "None",
            "order_by_age": "None",
            "order_by_rating": "desc",
            "only_one_category_id": "None",
            "only_one_subcategory_id": "None",
            "seller_user_id": "None",
            "seller_user_name": "None",
            "wishlist": "None",
            "snap": "True"
        }
        url = app.config['API_SERVER_URL'] + "/get-filter-data"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "encode": EncodedJWT.encoded(encode),
            "page_number": page_number,
            "snap": "True",
            "customer_user_id": customer_user_id
        }
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            data = r.json()
            animals = data['animals_list']
            pagination = data['pagination']
            pagination_list = data['pagination_list']
            only_one_category_id = data['only_one_category_id']
            only_one_category_name = data['only_one_category_name']
            only_one_subcategory_id = data['only_one_subcategory_id']
            only_one_subcategory_name = data['only_one_subcategory_name']
            only_one_category_name_slug = data['only_one_category_name_slug']
            try:
                seller_user_id = data['animals_list'][0]['seller']['seller_user_id']
                seller_user_name = data['animals_list'][0]['seller']['seller_user_name']
                seller_user_name_slug = data['animals_list'][0]['seller']['seller_user_name_slug']
            except IndexError:
                pass
            payload['encode'] = None
        else:
            data = {"status": 'error', 'message': r.json()}
    else:
        url = app.config['API_SERVER_URL'] + "/get-filter-data"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "encode": filter_data,
            "page_number": page_number,
            "snap": "True",
            "customer_user_id": customer_user_id
        }
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            data = r.json()
            animals = data['animals_list']
            pagination = data['pagination']
            pagination_list = data['pagination_list']
            only_one_category_id = data['only_one_category_id']
            only_one_category_name = data['only_one_category_name']
            only_one_subcategory_id = data['only_one_subcategory_id']
            only_one_subcategory_name = data['only_one_subcategory_name']
            only_one_category_name_slug = data['only_one_category_name_slug']
            try:
                seller_user_id = data['animals_list'][0]['seller']['seller_user_id']
                seller_user_name = data['animals_list'][0]['seller']['seller_user_name']
                seller_user_name_slug = data['animals_list'][0]['seller']['seller_user_name_slug']
            except IndexError:
                pass

            wishlist = data['wishlist']
            try:
                is_wishlist = data['animals_list'][0]['wishlist']['is_wishlist']
            except IndexError:
                pass
        else:
            data = {"status": 'error', 'message': r.json()}

    if g.logged_in:
        return render_template('authentication/snap.jinja2',
                               lang=lang,
                               animals=animals,
                               pagination_list=pagination_list,
                               page_number=pagination['page_number'],
                               animals_limit=pagination['animals_limit'],
                               animals_count=pagination['animals_count'],
                               pagination_count=pagination['pagination_count'],
                               pagination_first=pagination['pagination_first'],
                               pagination_last=pagination['pagination_last'],
                               pagination_next=pagination['pagination_next'],
                               pagination_previous=pagination['pagination_previous'],
                               countries=countries,
                               filter_data=payload['encode'],
                               only_one_category_id=only_one_category_id,
                               only_one_category_name=only_one_category_name,
                               only_one_subcategory_id=only_one_subcategory_id,
                               only_one_subcategory_name=only_one_subcategory_name,
                               only_one_category_name_slug=only_one_category_name_slug,
                               price_show=price_show,
                               seller_user_id=seller_user_id,
                               seller_user_name=seller_user_name,
                               seller_user_name_slug=seller_user_name_slug,
                               wishlist=wishlist,
                               is_wishlist=is_wishlist)
    else:
        return render_template('anonymous/snap.jinja2',
                               lang=lang,
                               animals=animals,
                               pagination_list=pagination_list,
                               page_number=pagination['page_number'],
                               animals_limit=pagination['animals_limit'],
                               animals_count=pagination['animals_count'],
                               pagination_count=pagination['pagination_count'],
                               pagination_first=pagination['pagination_first'],
                               pagination_last=pagination['pagination_last'],
                               pagination_next=pagination['pagination_next'],
                               pagination_previous=pagination['pagination_previous'],
                               countries=countries,
                               filter_data=payload['encode'],
                               only_one_category_id=only_one_category_id,
                               only_one_category_name=only_one_category_name,
                               only_one_subcategory_id=only_one_subcategory_id,
                               only_one_subcategory_name=only_one_subcategory_name,
                               only_one_category_name_slug=only_one_category_name_slug,
                               price_show=price_show,
                               seller_user_id=seller_user_id,
                               seller_user_name=seller_user_name,
                               seller_user_name_slug=seller_user_name_slug,
                               wishlist=wishlist,
                               is_wishlist=is_wishlist)
