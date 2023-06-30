# -*- coding: utf-8 -*-
from app import app
from flask import Blueprint, request, g, make_response, jsonify, render_template, redirect, json
import jwt
import requests
from urllib import parse

mod = Blueprint('before_request', __name__)


@app.before_request
def is_logged_in():
    #: Py Ex: if g.logged_in and g.permission['is_user_login']['user_permission']['is_admin'] == "True"
    token = request.cookies.get("abToken")
    g.logged_in = False
    g.permission = {"is_user_login": {"is_logged": False, "user_permission": {
        "inactive_account": "True",
        "is_admin": "False",
        "is_admin_settings_management": "False",
        "is_category_management": "False",
        "is_user_management": "False",
        "is_worker": "False",
        "subscribed": "False"
    }}}

    if token:
        try:
            decode_token = jwt.decode(token, app.config['API_SECRET_KEY'], algorithms=['HS256'])

            try:
                try:
                    lang = parse.unquote(request.cookies.get("abBrowserLang")).replace("%22", "").replace('"', '')
                except TypeError:
                    lang = "en"
            except TypeError:
                supported_languages = app.config['SUPPORTED_LANGUAGES']
                lang = request.accept_languages.best_match(supported_languages)

            url = app.config['API_SERVER_URL'] + "/get-user-data"
            headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
            payload = {
                "email": decode_token['email'],
                "lang": lang
            }

            r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

            if r.status_code == 200:
                data = r.json().get("payload")

                if data['user_permission']['inactive_account'] == "True" or data['user']['deleted'] == "True":
                    g.logged_in = False
                    response = make_response(jsonify({"status": "Inactive Account"}), 200)
                    if data['user']['deleted'] == "True":
                        response = make_response(jsonify({"status": "Delete Account"}), 200)
                    # response = make_response(render_template('anonymous/index.jinja2'), 200)
                    response.set_cookie('abToken', '', expires=0)
                    return response
                else:
                    g.logged_in = True
                    g.permission = dict(is_user_login=data)
            else:
                g.logged_in = False
        except jwt.ExpiredSignatureError:
            app.logger.error('Signature expired.')
        except jwt.InvalidTokenError:
            app.logger.error('Invalid token.')
    else:
        pass
