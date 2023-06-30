# -*- coding: utf-8 -*-
from app import app
import os
from config import _static
from config import _basedir
from flask import Blueprint, g, json, request, make_response, jsonify, session, render_template
import requests
from .utilities.utility import File
from datetime import datetime, timedelta
import uuid
from PIL import Image, ImageDraw, ImageFilter
import shutil
import bleach

mod = Blueprint('notification_module', __name__)


# AJAX
@mod.route('/_chat-modal', methods=['POST'])
def _chat_modal():
    if g.logged_in:
        data = json.loads(request.get_data())

        email = g.permission['is_user_login']['user']['email']
        message_id = data['message_id']
        sender_id = data['sender_id']
        host_id = data['host_id']

        url = app.config['API_SERVER_URL'] + "/chat-modal"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "email": email,
            "message_id": message_id,
            "sender_id": sender_id,
            "host_id": host_id
        }
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            data = {"status": 'success', 'message': r.json()}
            return make_response(jsonify(data), 200)
        else:
            data = {"status": 'error', 'message': r.json()}
            return make_response(jsonify(data), 400)


# AJAX
@mod.route('/_chat-list', methods=['POST'])
def _chat_list():
    if g.logged_in:
        data = json.loads(request.get_data())
        email = g.permission['is_user_login']['user']['email']

        url = app.config['API_SERVER_URL'] + "/chat-list"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "email": email,
            "page_number_start": data['page_number_start'],
            "page_number_stop": data['page_number_stop'],
            "archived": False
        }
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            data = {"status": 'success', 'message': r.json()}
            return make_response(jsonify(data), 200)
        else:
            data = {"status": 'error', 'message': r.json()}
            return make_response(jsonify(data), 400)


# AJAX
@mod.route('/_archive-chat-list', methods=['POST'])
def _archive_chat_list():
    if g.logged_in:
        data = json.loads(request.get_data())
        email = g.permission['is_user_login']['user']['email']

        url = app.config['API_SERVER_URL'] + "/chat-list"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "email": email,
            "page_number_start": data['page_number_start'],
            "page_number_stop": data['page_number_stop'],
            "archived": True
        }
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            data = {"status": 'success', 'message': r.json()}
            return make_response(jsonify(data), 200)
        else:
            data = {"status": 'error', 'message': r.json()}
            return make_response(jsonify(data), 400)


# AJAX
@mod.route('/_send-message', methods=['POST'])
def _send_message():
    if g.logged_in:
        data = json.loads(request.get_data())

        room = data['room']
        from_username = data['from_username']
        to_username = data['to_username']
        msg = data['msg']

        url = app.config['API_SERVER_URL'] + "/send-message"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "room": room,
            "from_username": from_username,
            "to_username": to_username,
            "msg": bleach.clean(msg, attributes={'img': ['src']}, tags=['img'])
        }
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            data = {"status": 'success', 'message': r.json()}
            return make_response(jsonify(data), 200)
        else:
            data = {"status": 'error', 'message': r.json()}
            return make_response(jsonify(data), 400)


# AJAX
@mod.route('/_received', methods=['POST'])
def _received():
    if g.logged_in:
        data = json.loads(request.get_data())

        message_id = data['message_id']

        url = app.config['API_SERVER_URL'] + "/received"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "message_id": message_id,
        }
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            data = {"status": 'success', 'message': r.json()}
            return make_response(jsonify(data), 200)
        else:
            data = {"status": 'error', 'message': r.json()}
            return make_response(jsonify(data), 400)


@app.route('/chat-img-upload', methods=['POST'])
def chat_img_upload():
    if g.logged_in:
        if 'file' not in request.files:
            return make_response(jsonify('{"status": "errors", "data": "Not Found"}'), 404)

        file_data = request.files['file']

        if file_data.filename == '':
            return make_response(jsonify('{"status": "errors", "data": "Not Found"}'), 404)

        if not File.allowed_file(file_data.filename):
            return make_response(jsonify('{"status": "errors", "data": "Unsupported Media Type"}'), 415)

        file_length = request.content_length

        if file_length is not None and file_length > app.config['MAX_CONTENT_LENGTH_IMG']:
            return make_response(jsonify('{"status": "errors", "data": "Request Entity Too Large"}'), 413)

        if chat_img_upload and File.allowed_file(file_data.filename):
            now = datetime.now()
            timestamp = datetime.timestamp(now)

            tmp = app.config['IMG_DIRECTORY'] + "chat/"
            folder = str(uuid.uuid4()) + "-" + str(timestamp)
            path = tmp + folder
            os.makedirs(path)

            session['chat_img'] = os.path.join("/static/images/chat/" + folder, folder + ".png")
            file_data.save(os.path.join(path, folder + ".png"))

            media_origin = Image.open(os.path.join(path, folder + ".png"))
            media_width, media_height = media_origin.size

            resp = {"status": "success", "data": session.get('chat_img'), "folder": folder,
                    "filename": folder + ".png", "width": media_width, "height": media_height}
            return make_response(jsonify(resp), 200)


# AJAX
@mod.route('/_rm-message', methods=['POST'])
def _rm_message():
    if g.logged_in:
        data = json.loads(request.get_data())

        message_id = data['message_id']
        sender_id = data['sender_id']
        rm_img = data['rm_img']

        url = app.config['API_SERVER_URL'] + "/rm-message"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "message_id": message_id,
            "sender_id": sender_id,
        }
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            if rm_img != "False":
                rm_img_list = rm_img.split("/")
                img_dir = app.config['IMG_DIRECTORY'] + "chat/" + rm_img_list[4]
                if os.path.exists(img_dir):
                    try:
                        shutil.rmtree(img_dir)
                    except NotADirectoryError as error:
                        pass

            data = {"status": 'success', 'message': r.json()}
            return make_response(jsonify(data), 200)
        else:
            data = {"status": 'error', 'message': r.json()}
            return make_response(jsonify(data), 400)


@mod.route('/notifications', methods=['GET'])
def notifications():
    if g.logged_in:
        return render_template("authentication/settings/notifications.jinja2")
    else:
        return render_template('errorhandler/404.jinja2')


# AJAX
@mod.route('/_notifications', methods=['POST'])
def _notifications():
    if g.logged_in:
        data = json.loads(request.get_data())

        user_id = g.permission['is_user_login']['user']['id']
        notification_type = data['notification_type']
        notification_data = data['notification_data']

        url = app.config['API_SERVER_URL'] + "/notifications"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "user_id": user_id,
            "notification_type": notification_type,
            "notification_data": notification_data
        }
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            data = {"status": 'success', 'message': r.json()}
            return make_response(jsonify(data), 200)
        else:
            data = {"status": 'error', 'message': r.json()}
            return make_response(jsonify(data), 400)


# AJAX
@mod.route('/_chat-archive', methods=['POST'])
def _chat_archive():
    if g.logged_in:
        data = json.loads(request.get_data())

        sender_id = data['sender_id']
        host_id = data['host_id']
        action_type = data['action_type']

        url = app.config['API_SERVER_URL'] + "/chat-archive"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "sender_id": sender_id,
            "host_id": host_id,
            "action_type": action_type
        }
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            data = {"status": 'success', 'message': r.json()}
            return make_response(jsonify(data), 200)
        else:
            data = {"status": 'error', 'message': r.json()}
            return make_response(jsonify(data), 400)
