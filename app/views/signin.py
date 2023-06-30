# -*- coding: utf-8 -*-
from app import app
from flask import Blueprint, render_template, json, request, make_response, jsonify, g
from app.forms.signin_forms import SignInForm
import requests
from datetime import datetime, timedelta

mod = Blueprint('signin_module', __name__)


@mod.route('/sign-in', methods=['GET'])
def sign_in():
    if g.logged_in is False:
        form = SignInForm()
        form.remember.data = False
        return render_template('anonymous/sign-in.jinja2', form=form)
    else:
        return render_template('errorhandler/404.jinja2')


# AJAX
@mod.route('/_sign-in', methods=['POST'])
def _sign_in():
    data = json.loads(request.get_data())
    email = data['email']
    password = data['password']
    remember = data['remember']

    browser_name = data['browser']['name']
    browser_version = data['browser']['version']
    os_name = data['os']['name']
    platform_type = data['platform']['type']

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

        if remember == "True":
            expire_date = datetime.now()
            expire_date = expire_date + timedelta(days=365)
            response.set_cookie('abToken', r.json().get("token"), httponly=False, secure=True, expires=expire_date)
        else:
            response.set_cookie('abToken', r.json().get("token"), httponly=False, secure=True)
        return response
    else:
        data = {"status": 'error', 'message': r.json()}
        return make_response(jsonify(data), 400)


@mod.route('/_sign-out', methods=['POST'])
def _sign_out():
    data = {"status": 'success'}
    response = make_response(jsonify(data), 200)
    response.set_cookie('abToken', '', expires=0)
    return response
