# -*- coding: utf-8 -*-
from app import app
from flask import Blueprint, json, request, make_response, jsonify
import requests

mod = Blueprint('translate_module', __name__)


@mod.route('/_translate', methods=['POST'])
def _translate():
    data = json.loads(request.get_data())

    source = data['source']
    target = data['target']
    source_data = data['sourceData']
    translate_type = data['translateType']
    translate_type_id = data['translateTypeID']
    translate_type_data = data['translateTypeData']

    url = app.config['API_SERVER_URL'] + "/translate"
    headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
    payload = {
        "source": source,
        "target": target,
        "source_data": source_data,
        "translate_type": translate_type,
        "translate_type_id": translate_type_id,
        "translate_type_data": translate_type_data
    }
    r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

    if r.status_code == 200:
        data = {"status": 'success', 'message': r.json()}
        return make_response(jsonify(data), 200)
    else:
        data = {"status": 'error', 'message': r.json()}
        return make_response(jsonify(data), 400)
