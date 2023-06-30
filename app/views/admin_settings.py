# -*- coding: utf-8 -*-
from app import app
from flask import Blueprint, g, render_template, json, request, make_response, jsonify
from app.forms.admin_settings_form import AdminSettingsAddSettingsForm, AdminSettingsEditSettingsForm
import requests

mod = Blueprint('admin_settings_module', __name__)


@mod.route('/admin-settings', methods=['GET'])
def admin_settings():
    if g.logged_in and g.permission['is_user_login']['user_permission']['is_admin_settings_management'] == "True":

        add_settings_form = AdminSettingsAddSettingsForm()
        edit_settings_form = AdminSettingsEditSettingsForm()
        add_settings_form.settings_type.data = "string"

        url = app.config['API_SERVER_URL'] + "/get-admin-settings-all"
        headers = {'X-Api-Key': app.config['API_KEY']}

        r = requests.get(url, headers=headers, verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            settings_data = r.json().get("data")
            return render_template('authentication/admin/admin-settings.jinja2',
                                   add_settings_form=add_settings_form,
                                   edit_settings_form=edit_settings_form,
                                   settings_data=settings_data)
    else:
        return render_template('errorhandler/404.jinja2')


# AJAX
@mod.route('/_add-settings', methods=['POST'])
def _add_settings():
    data = json.loads(request.get_data())
    settings_name = data['settings_name']
    settings_type = data['settings_type']
    settings_value = data['settings_value']

    url = app.config['API_SERVER_URL'] + "/add-settings"
    headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
    payload = {
        "email": g.permission['is_user_login']['user']['email'],
        "settings_name": settings_name,
        "settings_type": settings_type,
        "settings_value": settings_value
    }
    r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

    if r.status_code == 200:
        data = {"status": 'success', 'message': r.json()}
        return make_response(jsonify(data), 200)
    else:
        data = {"status": 'error', 'message': r.json()}
        return make_response(jsonify(data), 400)


# AJAX
@mod.route('/_get-admin-settings', methods=['POST'])
def _get_admin_settings():
    data = json.loads(request.get_data())
    settings_id = data['settings_id']

    url = app.config['API_SERVER_URL'] + "/get-admin-settings"
    headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
    payload = {
        "settings_id": settings_id
    }
    r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

    if r.status_code == 200:
        data = {"status": 'success', 'message': r.json()}
        return make_response(jsonify(data), 200)
    else:
        data = {"status": 'error', 'message': r.json()}
        return make_response(jsonify(data), 400)


# AJAX
@mod.route('/_edit-settings', methods=['POST'])
def _edit_settings():
    data = json.loads(request.get_data())
    settings_id = data['settings_id']
    settings_name = data['settings_name']
    settings_type = data['settings_type']
    settings_value = data['settings_value']

    url = app.config['API_SERVER_URL'] + "/edit-settings"
    headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
    payload = {
        "email": g.permission['is_user_login']['user']['email'],
        "settings_id": settings_id,
        "settings_name": settings_name,
        "settings_type": settings_type,
        "settings_value": settings_value
    }
    r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

    if r.status_code == 200:
        data = {"status": 'success', 'message': r.json()}
        return make_response(jsonify(data), 200)
    else:
        data = {"status": 'error', 'message': r.json()}
        return make_response(jsonify(data), 400)
