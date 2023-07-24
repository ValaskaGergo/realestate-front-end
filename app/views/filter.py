# -*- coding: utf-8 -*-
from app import app
from flask import Blueprint, json, request, make_response, jsonify
import requests
from urllib import parse
from .utilities.utility import EncodedJWT, DecodeJWT

mod = Blueprint('filter_module', __name__)


# AJAX
@mod.route('/_get-filter-category', methods=['POST'])
def _get_filter_category():
    data = json.loads(request.get_data())

    try:
        try:
            lang = parse.unquote(request.cookies.get("abBrowserLang")).replace("%22", "").replace('"', '')
        except TypeError:
            lang = "en"
    except TypeError:
        supported_languages = app.config['SUPPORTED_LANGUAGES']
        lang = request.accept_languages.best_match(supported_languages)

    category_id = data['category_all']

    url = app.config['API_SERVER_URL'] + "/get-filter-category"
    headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
    payload = {
        "category_id": category_id,
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
@mod.route('/_get-filter-count', methods=['POST'])
def _get_filter_count():
    data = json.loads(request.get_data())

    try:
        try:
            lang = parse.unquote(request.cookies.get("abBrowserLang")).replace("%22", "").replace('"', '')
        except TypeError:
            lang = "en"
    except TypeError:
        supported_languages = app.config['SUPPORTED_LANGUAGES']
        lang = request.accept_languages.best_match(supported_languages)

    where_input = data['where_input']
    where_all = data['where_all']
    where_name = data['where_name']
    where_description = data['where_description']
    where_family = data['where_family']

    where_family_mother = data['where_family_mother']
    where_family_mother_mother = data['where_family_mother_mother']
    where_family_mother_father = data['where_family_mother_father']
    where_family_mother_mother_mother = data['where_family_mother_mother_mother']
    where_family_mother_mother_father = data['where_family_mother_mother_father']
    where_family_mother_father_mother = data['where_family_mother_father_mother']
    where_family_mother_father_father = data['where_family_mother_father_father']
    where_family_father = data['where_family_father']
    where_family_father_mother = data['where_family_father_mother']
    where_family_father_father = data['where_family_father_father']
    where_family_father_mother_mother = data['where_family_father_mother_mother']
    where_family_father_mother_father = data['where_family_father_mother_father']
    where_family_father_father_mother = data['where_family_father_father_mother']
    where_family_father_father_father = data['where_family_father_father_father']

    price_min = data['price_min']
    price_max = data['price_max']

    category_all = data['category_all']

    subcategory_all = data['subcategory_all']

    gender_all = data['gender_all']

    color_all = data['color_all']

    be_used_for_all = data['be_used_for_all']

    age_min = data['age_min']
    age_max = data['age_max']


    region_residence = data['region_residence']
    country_residence = data['country_residence']

    region_origin = data['region_origin']
    country_origin = data['country_origin']

    order_by_price = data['order_by_price']
    order_by_age = data['order_by_age']
    order_by_rating = data['order_by_rating']

    category_all_list = json.loads(category_all)

    only_one_category_id_list = data['only_one_category_id'].strip('][')
    only_one_subcategory_id_list = data['only_one_subcategory_id'].strip('][')
    try:
        if len(only_one_category_id_list) == 1:
            only_one_category_id = only_one_category_id_list[0]
        else:
            only_one_category_id = None
    except TypeError:
        only_one_category_id = None

    try:
        if len(only_one_subcategory_id_list) == 1:
            only_one_subcategory_id = only_one_subcategory_id_list[0]
        else:
            only_one_subcategory_id = None
    except TypeError:
        only_one_subcategory_id = None

    if only_one_category_id == "0":
        only_one_category_id = None
    if only_one_subcategory_id == "0":
        only_one_subcategory_id = None

    seller_user_id = data['seller_user_id']
    seller_user_name = data['seller_user_name']

    wishlist = data['wishlist']

    snap = data['snap']

    url = app.config['API_SERVER_URL'] + "/get-filter-count"
    headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
    payload = {
        "lang": lang,
        "where_input": where_input,
        "where_all": where_all,
        "where_name": where_name,
        "where_description": where_description,
        "where_family": where_family,

        "where_family_mother": where_family_mother,
        "where_family_mother_mother": where_family_mother_mother,
        "where_family_mother_father": where_family_mother_father,
        "where_family_mother_mother_mother": where_family_mother_mother_mother,
        "where_family_mother_mother_father": where_family_mother_mother_father,
        "where_family_mother_father_mother": where_family_mother_father_mother,
        "where_family_mother_father_father": where_family_mother_father_father,
        "where_family_father": where_family_father,
        "where_family_father_mother": where_family_father_mother,
        "where_family_father_father": where_family_father_father,
        "where_family_father_mother_mother": where_family_father_mother_mother,
        "where_family_father_mother_father": where_family_father_mother_father,
        "where_family_father_father_mother": where_family_father_father_mother,
        "where_family_father_father_father": where_family_father_father_father,

        "price_min": price_min,
        "price_max": price_max,

        "category_all": category_all,

        "subcategory_all": subcategory_all,

        "gender_all": gender_all,

        "color_all": color_all,

        "be_used_for_all": be_used_for_all,

        "age_min": age_min,
        "age_max": age_max,


        "region_residence": region_residence,
        "country_residence": country_residence,

        "region_origin": region_origin,
        "country_origin": country_origin,

        "order_by_price": order_by_price,
        "order_by_age": order_by_age,
        "order_by_rating": order_by_rating,

        "only_one_category_id": only_one_category_id,
        "only_one_subcategory_id": only_one_subcategory_id,
        "seller_user_id": seller_user_id,
        "seller_user_name": seller_user_name,
        "wishlist": wishlist,
        "snap": snap
    }
    r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

    if r.status_code == 200:
        data = {"status": 'success', 'message': r.json(), "encode": EncodedJWT.encoded(payload)}
        return make_response(jsonify(data), 200)
    else:
        data = {"status": 'error', 'message': r.json()}
        return make_response(jsonify(data), 400)
