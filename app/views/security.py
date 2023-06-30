# -*- coding: utf-8 -*-
from app import app
from flask import Blueprint, render_template, g, json, request, make_response, jsonify
from app.forms.security_forms import SecurityPasswordForm, SecurityEmailForm, SecurityDeleteUserForm
import requests
from urllib import parse
from .utilities.email import security_email

mod = Blueprint('security_module', __name__)


@mod.route('/security', methods=['GET'])
def security():
    if g.logged_in:
        password_form = SecurityPasswordForm()
        email_form = SecurityEmailForm()
        delete_user_form = SecurityDeleteUserForm()

        email_form.email.data = g.permission['is_user_login']['user_secondary_email']['email']
        email_form.current_email.data = g.permission['is_user_login']['user']['email']

        url = app.config['API_SERVER_URL'] + "/get-security-login-history"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "email": g.permission['is_user_login']['user']['email'],
        }
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            user_history = r.json().get('data')

            return render_template('authentication/settings/security.jinja2',
                                   password_form=password_form,
                                   email_form=email_form,
                                   user_history=user_history,
                                   delete_user_form=delete_user_form)
    else:
        return render_template('errorhandler/404.jinja2')


# AJAX
@mod.route('/_security-password', methods=['POST'])
def _security_password():
    if g.logged_in:
        data = json.loads(request.get_data())
        email = g.permission['is_user_login']['user']['email']
        current_password = data['current_password']
        password = data['password']
        password_confirm = data['password_confirm']

        url = app.config['API_SERVER_URL'] + "/security-password"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "email": email,
            "current_password": current_password,
            "password": password,
            "password_confirm": password_confirm
        }
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            data = {"status": 'success', 'message': r.json()}
            return make_response(jsonify(data), 200)
        else:
            data = {"status": 'error', 'message': r.json()}
            return make_response(jsonify(data), 400)
    else:
        return render_template('errorhandler/404.jinja2')


# AJAX
@mod.route('/_security-email', methods=['POST'])
def _security_email():
    if g.logged_in:
        data = json.loads(request.get_data())
        current_email = g.permission['is_user_login']['user']['email']
        email = data['email']
        secret_key = data['secret_key']

        url = app.config['API_SERVER_URL'] + "/security-email"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "current_email": current_email,
            "email": email,
            "secret_key": secret_key,
        }
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            data = {"status": 'success', 'message': r.json()}

            try:
                try:
                    lang = parse.unquote(request.cookies.get("abBrowserLang")).replace("%22", "").replace('"', '')
                except TypeError:
                    lang = "en"
            except TypeError:
                supported_languages = app.config['SUPPORTED_LANGUAGES']
                lang = request.accept_languages.best_match(supported_languages)

            try:  # send email
                secondary_email = data['message']['payload']['secondary_email']
                secret_key = data['message']['payload']['secret_key']
                app.logger.info(secret_key)
                security_email(lang, secondary_email, secret_key)
            except:
                pass

            return make_response(jsonify(data), 200)
        elif r.status_code == 401:
            data = {"status": 'error', 'message': r.json()}
            return make_response(jsonify(data), 401)
        else:
            data = {"status": 'error', 'message': r.json()}
            return make_response(jsonify(data), 400)
    else:
        return render_template('errorhandler/404.jinja2')


# AJAX
@mod.route('/_security-delete-user', methods=['POST'])
def _security_delete_user():
    if g.logged_in:
        data = json.loads(request.get_data())
        email = g.permission['is_user_login']['user']['email']
        password = data['password']

        url = app.config['API_SERVER_URL'] + "/security-delete-user"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "email": email,
            "password": password
        }
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            data = {"status": 'success', 'message': r.json()}
            return make_response(jsonify(data), 200)
        else:
            data = {"status": 'error', 'message': r.json()}
            return make_response(jsonify(data), 400)
