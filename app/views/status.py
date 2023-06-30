# -*- coding: utf-8 -*-
from app import app
from flask import Blueprint, render_template, json, make_response, jsonify
import requests

mod = Blueprint('status_module', __name__)


@mod.route('/status', methods=['GET'])
def status():
    url = app.config['API_SERVER_URL'] + "/get-status"
    headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
    r = requests.post(url, headers=headers, verify=app.config['TLS_VERIFY'])
    data = r.json()
    datetime = data['uptime']
    return render_template("errorhandler/status.jinja2", datetime=datetime)


# AJAX
@mod.route('/_status', methods=['POST'])
def _status():
    url = app.config['API_SERVER_URL'] + "/get-status"
    headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
    payload = {}

    r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

    if r.status_code == 200:
        data = {"status": 'success', 'message': r.json()}
        return make_response(jsonify(data), 200)
    else:
        data = {"status": 'error', 'message': r.json()}
        return make_response(jsonify(data), 400)
