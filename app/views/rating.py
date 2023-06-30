# -*- coding: utf-8 -*-
from app import app
from flask import Blueprint, g, json, make_response, jsonify, request
import requests

mod = Blueprint('rating_module', __name__)


# AJAX
@mod.route('/_post-rating', methods=['POST'])
def _post_rating():
    if g.logged_in:
        data = json.loads(request.get_data())

        user_id = g.permission['is_user_login']['user']['id']
        animal_id = data['animal_id']
        rating = data['rating']

        url = app.config['API_SERVER_URL'] + "/post-rating"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "user_id": user_id,
            "animal_id": animal_id,
            "rating": rating
        }
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            data = {"status": 'success', 'message': r.json()}
            return make_response(jsonify(data), 200)
        else:
            data = {"status": 'error', 'message': r.json()}
            return make_response(jsonify(data), 400)
