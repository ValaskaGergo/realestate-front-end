# -*- coding: utf-8 -*-
from app import app
from flask import Blueprint, render_template, request, make_response, json, jsonify, g
from app.forms.signup_forms import SignUpForm, SignUpFormPin, SignUpFormData
from .utilities.email import sign_up_email
import requests
from .utilities.utility import DecodeJWT
from datetime import datetime, timedelta
from urllib import parse

mod = Blueprint('signup_module', __name__)


@mod.route('/sign-up', methods=['GET'])
def sign_up():
    if g.logged_in is False:
        form = SignUpForm()
        return render_template('anonymous/sign-up.jinja2', form=form)
    else:
        return render_template('errorhandler/404.jinja2')


# AJAX
@mod.route('/_sign-up', methods=['POST'])
def _sign_up():
    data = json.loads(request.get_data())
    email = data['email']

    url = app.config['API_SERVER_URL'] + "/sign-up"
    headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
    payload = {
        "email": email
    }
    r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

    if r.status_code == 200:
        try:
            try:
                lang = parse.unquote(request.cookies.get("abBrowserLang")).replace("%22", "").replace('"', '')
            except TypeError:
                lang = "en"
        except TypeError:
            supported_languages = app.config['SUPPORTED_LANGUAGES']
            lang = request.accept_languages.best_match(supported_languages)

        email = r.json().get("email")
        pin = r.json().get("pin")
        code = r.json().get("code")

        app.logger.info(pin)
        sign_up_email(lang, email, pin, code)

        data = {"status": 'success', 'message': r.json()}
        return make_response(jsonify(data), 200)
    else:
        data = {"status": 'error', 'message': r.json()}
        return make_response(jsonify(data), 400)


@mod.route('/sign-up-pin', methods=['GET'])
def sign_up_pin():
    if g.logged_in is False:
        form = SignUpFormPin()
        code = request.args.get('code')

        if code:
            decode_code = DecodeJWT.decode(code)
            form.code.data = code
            form.email.data = decode_code['email']
            return render_template('anonymous/sign-up-pin.jinja2', form=form)
        else:
            return render_template('errorhandler/404.jinja2')
    else:
        return render_template('errorhandler/404.jinja2')


# AJAX
@mod.route('/_sign-up-pin', methods=['POST'])
def _sign_up_pin():
    data = json.loads(request.get_data())
    code = data['code']
    email = data['email']
    pin = data['pin']

    url = app.config['API_SERVER_URL'] + "/sign-up-pin"
    headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
    payload = {
        "code": code,
        "email": email,
        "pin": pin
    }
    r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

    if r.status_code == 200:
        data = {"status": 'success', 'message': r.json()}
        return make_response(jsonify(data), 200)
    else:
        data = {"status": 'error', 'message': r.json()}
        return make_response(jsonify(data), 400)


@mod.route('/sign-up-data', methods=['GET'])
def sign_up_data():
    if g.logged_in is False:
        form = SignUpFormData()
        code = request.args.get('code')

        if code:
            decode_code = DecodeJWT.decode(code)
            form.code.data = code
            form.email.data = decode_code['email']
            form.name.data = "@AB" + decode_code['pin']
            form.privacy.data = False
            return render_template('anonymous/sign-up-data.jinja2', form=form)
        else:
            return render_template('errorhandler/404.jinja2')
    else:
        return render_template('errorhandler/404.jinja2')


# AJAX
@mod.route('/_sign-up-data', methods=['POST'])
def _sign_up_data():
    data = json.loads(request.get_data())
    code = data['code']
    email = data['email']
    username = data['name']
    password = data['password']
    password_confirm = data['password_confirm']
    privacy = data['privacy']

    browser_name = data['browser']['name']
    browser_version = data['browser']['version']
    os_name = data['os']['name']
    platform_type = data['platform']['type']

    url = app.config['API_SERVER_URL'] + "/sign-up-data"
    headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
    payload = {
        "code": code,
        "email": email,
        "username": username,
        "password": password,
        "password_confirm": password_confirm,
        "privacy": privacy
    }
    r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

    if r.status_code == 200:
        email = r.json().get("email")

        url = app.config['API_SERVER_URL'] + "/sign-in"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "email": email,
            "password": password,
            "browser_name": browser_name,
            "browser_version": browser_version,
            "os_name": os_name,
            "platform_type": platform_type
        }

        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            data = {"status": 'success'}
            response = make_response(jsonify(data), 200)
            expire_date = datetime.now()
            expire_date = expire_date + timedelta(days=365)
            response.set_cookie('abToken', r.json().get("token"), httponly=False, secure=True, expires=expire_date)
            return response
        else:
            pass

        data = {"status": 'success', 'message': r.json()}
        return make_response(jsonify(data), 200)
    else:
        data = {"status": 'error', 'message': r.json()}
        return make_response(jsonify(data), 400)
