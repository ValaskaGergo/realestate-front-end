# -*- coding: utf-8 -*-
from app import app
from flask import Blueprint, g, json, request, make_response, jsonify
import requests
from urllib import parse

mod = Blueprint('talking_module', __name__)


# AJAX
@mod.route('/_post-talking', methods=['POST'])
def _post_talking():
    if g.logged_in:
        data = json.loads(request.get_data())

        category_id = data['category_id']
        subcategory_id = data['subcategory_id']
        user_id = g.permission['is_user_login']['user']['id']
        experience = data['experience']

        url = app.config['API_SERVER_URL'] + "/post-talking"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "category_id": category_id,
            "subcategory_id": subcategory_id,
            "user_id": user_id,
            "experience": experience
        }
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            data = {"status": 'success', 'message': r.json()}
            return make_response(jsonify(data), 200)
        else:
            data = {"status": 'error', 'message': r.json()}
            return make_response(jsonify(data), 400)


# AJAX
@mod.route('/_get-talking', methods=['POST'])
def _get_talking():
    if g.logged_in:
        data = json.loads(request.get_data())

        try:
            try:
                lang = parse.unquote(request.cookies.get("abBrowserLang")).replace("%22", "").replace('"', '')
            except TypeError:
                lang = "en"
        except TypeError:
            supported_languages = app.config['SUPPORTED_LANGUAGES']
            lang = request.accept_languages.best_match(supported_languages)

        subcategory_id = data['subcategory_id']
        user_id = g.permission['is_user_login']['user']['id']

        url = app.config['API_SERVER_URL'] + "/get-talking"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "subcategory_id": subcategory_id,
            "user_id": user_id,
            "lang": lang
        }
        r = requests.get(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            data = {"status": 'success', 'message': r.json()}
            return make_response(jsonify(data), 200)
        else:
            data = {"status": 'error', 'message': r.json()}
            return make_response(jsonify(data), 400)


# AJAX
@mod.route('/_talking-delete', methods=['POST'])
def _talking_delete():
    if g.logged_in:
        form_data = json.loads(request.get_data())

        user_id = g.permission['is_user_login']['user']['id']
        talking_edit_id = form_data['talking_edit_id']
        talking_edit_input = form_data['talking_edit_input']

        url = app.config['API_SERVER_URL'] + "/talking-delete"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "user_id": user_id,
            "talking_id": talking_edit_id,
            "experience": talking_edit_input
        }
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            data = {"status": 'success', 'message': r.json()}
            return make_response(jsonify(data), 200)
        else:
            data = {"status": 'error', 'message': r.json()}
            return make_response(jsonify(data), 400)


# AJAX
@mod.route('/_talking-edit', methods=['POST'])
def _talking_edit():
    if g.logged_in:
        form_data = json.loads(request.get_data())

        user_id = g.permission['is_user_login']['user']['id']
        talking_edit_id = form_data['talking_edit_id']
        talking_edit_input = form_data['talking_edit_input']

        url = app.config['API_SERVER_URL'] + "/talking-edit"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "user_id": user_id,
            "talking_id": talking_edit_id,
            "experience": talking_edit_input
        }
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            data = {"status": 'success', 'message': r.json()}
            return make_response(jsonify(data), 200)
        else:
            data = {"status": 'error', 'message': r.json()}
            return make_response(jsonify(data), 400)


# AJAX
@mod.route('/_get-talking-history', methods=['POST'])
def _get_talking_history():
    if g.logged_in:
        form_data = json.loads(request.get_data())

        user_id = g.permission['is_user_login']['user']['id']
        talking_id = form_data['talking_id']

        url = app.config['API_SERVER_URL'] + "/get-talking-history"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "user_id": user_id,
            "talking_id": talking_id,
        }
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            data = {"status": 'success', 'message': r.json()}
            return make_response(jsonify(data), 200)
        else:
            data = {"status": 'error', 'message': r.json()}
            return make_response(jsonify(data), 400)


# AJAX
@mod.route('/_post-talking-answer', methods=['POST'])
def _post_talking_answer():
    if g.logged_in:
        data = json.loads(request.get_data())

        talking_id = data['talking_id']
        talking_answer_id = data['talking_answer_id']
        answer = data['answer']
        answer_type = data['answer_type']
        user_id = g.permission['is_user_login']['user']['id']

        url = app.config['API_SERVER_URL'] + "/post-talking-answer"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "talking_id": talking_id,
            "talking_answer_id": talking_answer_id,
            "answer": answer,
            "answer_type": answer_type,
            "user_id": user_id
        }
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            data = {"status": 'success', 'message': r.json()}
            return make_response(jsonify(data), 200)
        else:
            data = {"status": 'error', 'message': r.json()}
            return make_response(jsonify(data), 400)


# AJAX
@mod.route('/_talking-answer-delete', methods=['POST'])
def _talking_answer_delete():
    if g.logged_in:
        form_data = json.loads(request.get_data())

        user_id = g.permission['is_user_login']['user']['id']
        talking_answer_edit_id = form_data['talking_answer_edit_id']
        talking_answer_edit_input = form_data['talking_answer_edit_input']

        url = app.config['API_SERVER_URL'] + "/talking-answer-delete"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "user_id": user_id,
            "talking_answer_id": talking_answer_edit_id,
            "answer": talking_answer_edit_input
        }
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            data = {"status": 'success', 'message': r.json()}
            return make_response(jsonify(data), 200)
        else:
            data = {"status": 'error', 'message': r.json()}
            return make_response(jsonify(data), 400)


# AJAX
@mod.route('/_talking-answer-edit', methods=['POST'])
def _talking_answer_edit():
    if g.logged_in:
        form_data = json.loads(request.get_data())

        user_id = g.permission['is_user_login']['user']['id']
        talking_answer_edit_id = form_data['talking_answer_edit_id']
        talking_answer_edit_input = form_data['talking_answer_edit_input']

        url = app.config['API_SERVER_URL'] + "/talking-answer-edit"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "user_id": user_id,
            "talking_answer_id": talking_answer_edit_id,
            "answer": talking_answer_edit_input
        }
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            data = {"status": 'success', 'message': r.json()}
            return make_response(jsonify(data), 200)
        else:
            data = {"status": 'error', 'message': r.json()}
            return make_response(jsonify(data), 400)


# AJAX
@mod.route('/_get-talking-answer-history', methods=['POST'])
def _get_talking_answer_history():
    if g.logged_in:
        form_data = json.loads(request.get_data())

        user_id = g.permission['is_user_login']['user']['id']
        talking_answer_id = form_data['talking_answer_id']

        url = app.config['API_SERVER_URL'] + "/get-talking-answer-history"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "user_id": user_id,
            "talking_answer_id": talking_answer_id,
        }
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            data = {"status": 'success', 'message': r.json()}
            return make_response(jsonify(data), 200)
        else:
            data = {"status": 'error', 'message': r.json()}
            return make_response(jsonify(data), 400)


# AJAX
@mod.route('/_post-talk-vote', methods=['POST'])
def _post_talk_vote():
    if g.logged_in:
        form_data = json.loads(request.get_data())

        user_id = g.permission['is_user_login']['user']['id']
        talking_id = form_data['talking_id']
        vote = form_data['vote']

        url = app.config['API_SERVER_URL'] + "/post-talk-vote"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "user_id": user_id,
            "talking_id": talking_id,
            "vote": vote
        }
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            data = {"status": 'success', 'message': r.json()}
            return make_response(jsonify(data), 200)
        else:
            data = {"status": 'error', 'message': r.json()}
            return make_response(jsonify(data), 400)
