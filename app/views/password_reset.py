# -*- coding: utf-8 -*-
from app import app
from flask import Blueprint, render_template, g, json, request, make_response, jsonify
from app.forms.password_reset_forms import PasswordResetForm, PasswordResetFormPin, PasswordResetDataForm
import requests
from urllib import parse
from .utilities.email import password_reset_email
from .utilities.utility import DecodeJWT
from datetime import datetime, timedelta

mod = Blueprint('password_reset_module', __name__)


@mod.route('/password-reset', methods=['GET'])
def password_reset():
    if g.logged_in is False:
        form = PasswordResetForm()
        return render_template('anonymous/password-reset.jinja2', form=form)
    else:
        return render_template('errorhandler/404.jinja2')


# AJAX
@mod.route('/_password-reset', methods=['POST'])
def _password_reset():
    data = json.loads(request.get_data())
    email = data['email']

    url = app.config['API_SERVER_URL'] + "/password-reset"
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
        app.logger.info(code)
        password_reset_email(lang, email, pin, code)

        data = {"status": 'success', 'message': r.json()}
        return make_response(jsonify(data), 200)
    else:
        data = {"status": 'error', 'message': r.json()}
        return make_response(jsonify(data), 400)


@mod.route('/password-reset-pin', methods=['GET'])
def password_reset_pin():
    if g.logged_in is False:
        form = PasswordResetFormPin()
        code = request.args.get('code')

        if code:
            decode_code = DecodeJWT.decode(code)
            form.code.data = code
            form.email.data = decode_code['email']
            return render_template('anonymous/password-reset-pin.jinja2', form=form)
        else:
            return render_template('errorhandler/404.jinja2')
    else:
        return render_template('errorhandler/404.jinja2')


# AJAX
@mod.route('/_password-reset-pin', methods=['POST'])
def _password_reset_pin():
    data = json.loads(request.get_data())
    code = data['code']
    email = data['email']
    pin = data['pin']

    url = app.config['API_SERVER_URL'] + "/password-reset-pin"
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


@mod.route('/password-reset-data', methods=['GET'])
def password_reset_data():
    if g.logged_in is False:
        form = PasswordResetDataForm()
        code = request.args.get('code')

        if code:
            decode_code = DecodeJWT.decode(code)
            form.code.data = code
            form.email.data = decode_code['email']
            return render_template('anonymous/password-reset-data.jinja2', form=form)
        else:
            return render_template('errorhandler/404.jinja2')
    else:
        return render_template('errorhandler/404.jinja2')


# AJAX
@mod.route('/_password-reset-data', methods=['POST'])
def _password_reset_data():
    data = json.loads(request.get_data())
    code = data['code']
    email = data['email']
    password = data['password']
    password_confirm = data['password_confirm']

    url = app.config['API_SERVER_URL'] + "/password-reset-data"
    headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
    payload = {
        "code": code,
        "email": email,
        "password": password,
        "password_confirm": password_confirm
    }

    r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

    if r.status_code == 200:
        email = r.json().get("email")

        url = app.config['API_SERVER_URL'] + "/sign-in"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "email": email,
            "password": password,
        }

        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            data = {"status": 'success'}
            response = make_response(jsonify(data), 200)
            expire_date = datetime.now()
            expire_date = expire_date + timedelta(days=365)
            response.set_cookie('abToken', r.json().get("token"), httponly=True, secure=True, expires=expire_date)
            return response
        else:
            pass

        data = {"status": 'success', 'message': r.json()}
        return make_response(jsonify(data), 200)
    else:
        data = {"status": 'error', 'message': r.json()}
        return make_response(jsonify(data), 400)
