# -*- coding: utf-8 -*-
from app import app
from flask import Blueprint, json, request, g, make_response, jsonify
import requests

mod = Blueprint('questions_and_answers_module', __name__)


# AJAX
@mod.route('/_post-question', methods=['POST'])
def _post_question():
    if g.logged_in:
        data = json.loads(request.get_data())

        animal_id = data['animal_id']
        user_id = g.permission['is_user_login']['user']['id']
        question = data['question']

        url = app.config['API_SERVER_URL'] + "/post-question"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "animal_id": animal_id,
            "user_id": user_id,
            "question": question
        }
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            data = {"status": 'success', 'message': r.json()}
            return make_response(jsonify(data), 200)
        else:
            data = {"status": 'error', 'message': r.json()}
            return make_response(jsonify(data), 400)


# AJAX
@mod.route('/_post-answer', methods=['POST'])
def _post_answer():
    if g.logged_in:
        data = json.loads(request.get_data())

        question_id = data['question_id']
        user_id = g.permission['is_user_login']['user']['id']
        answer = data['answer']

        url = app.config['API_SERVER_URL'] + "/post-answer"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "question_id": question_id,
            "user_id": user_id,
            "answer": answer
        }
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            data = {"status": 'success', 'message': r.json()}
            return make_response(jsonify(data), 200)
        else:
            data = {"status": 'error', 'message': r.json()}
            return make_response(jsonify(data), 400)


# AJAX
@mod.route('/_question-delete', methods=['POST'])
def _question_delete():
    if g.logged_in:
        form_data = json.loads(request.get_data())

        user_id = g.permission['is_user_login']['user']['id']
        question_edit_id = form_data['question_edit_id']
        question_edit_input = form_data['question_edit_input']

        url = app.config['API_SERVER_URL'] + "/question-delete"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "user_id": user_id,
            "question_id": question_edit_id,
            "question": question_edit_input
        }
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            data = {"status": 'success', 'message': r.json()}
            return make_response(jsonify(data), 200)
        else:
            data = {"status": 'error', 'message': r.json()}
            return make_response(jsonify(data), 400)


# AJAX
@mod.route('/_question-edit', methods=['POST'])
def _question_edit():
    if g.logged_in:
        form_data = json.loads(request.get_data())

        user_id = g.permission['is_user_login']['user']['id']
        question_edit_id = form_data['question_edit_id']
        question_edit_input = form_data['question_edit_input']

        url = app.config['API_SERVER_URL'] + "/question-edit"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "user_id": user_id,
            "question_id": question_edit_id,
            "question": question_edit_input,
        }
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            data = {"status": 'success', 'message': r.json()}
            return make_response(jsonify(data), 200)
        elif r.status_code == 201:
            data = {"status": 'success', 'message': r.json()}
            return make_response(jsonify(data), 201)
        else:
            data = {"status": 'error', 'message': r.json()}
            return make_response(jsonify(data), 400)


# AJAX
@mod.route('/_answer-delete', methods=['POST'])
def _answer_delete():
    if g.logged_in:
        form_data = json.loads(request.get_data())

        user_id = g.permission['is_user_login']['user']['id']
        answer_edit_id = form_data['answer_edit_id']
        answer_edit_input = form_data['answer_edit_input']

        url = app.config['API_SERVER_URL'] + "/answer-delete"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "user_id": user_id,
            "answer_id": answer_edit_id,
            "answer": answer_edit_input
        }
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            data = {"status": 'success', 'message': r.json()}
            return make_response(jsonify(data), 200)
        else:
            data = {"status": 'error', 'message': r.json()}
            return make_response(jsonify(data), 400)


# AJAX
@mod.route('/_answer-edit', methods=['POST'])
def _answer_edit():
    if g.logged_in:
        form_data = json.loads(request.get_data())

        user_id = g.permission['is_user_login']['user']['id']
        answer_edit_id = form_data['answer_edit_id']
        answer_edit_input = form_data['answer_edit_input']

        url = app.config['API_SERVER_URL'] + "/answer-edit"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "user_id": user_id,
            "answer_id": answer_edit_id,
            "answer": answer_edit_input,
        }
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            data = {"status": 'success', 'message': r.json()}
            return make_response(jsonify(data), 200)
        elif r.status_code == 201:
            data = {"status": 'success', 'message': r.json()}
            return make_response(jsonify(data), 201)
        else:
            data = {"status": 'error', 'message': r.json()}
            return make_response(jsonify(data), 400)
