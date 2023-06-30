# -*- coding: utf-8 -*-
from app import app
from flask import Blueprint, g, render_template, json
import requests

mod = Blueprint('invoices_module', __name__)


@mod.route('/invoices', methods=['GET'])
@mod.route('/invoices/page/<page_number>', methods=['GET'])
def invoices(page_number=None):
    if page_number is None:
        page_number = 1

    if g.logged_in:
        url = app.config['API_SERVER_URL'] + "/get-invoices"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "page_number": page_number,
            "email": g.permission['is_user_login']['user']['email'],
        }
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])
        if r.status_code == 200:
            data = r.json()
            payment_invoices = data['data']
            pagination_list = r.json().get("pagination_list")
            pagination = r.json().get("pagination")
            return render_template('authentication/personal/invoices.jinja2',
                                   pagination_list=pagination_list,
                                   page_number=pagination['page_number'],
                                   users_limit=pagination['invoices_limit'],
                                   users_count=pagination['invoices_count'],
                                   pagination_count=pagination['pagination_count'],
                                   pagination_first=pagination['pagination_first'],
                                   pagination_last=pagination['pagination_last'],
                                   pagination_next=pagination['pagination_next'],
                                   pagination_previous=pagination['pagination_previous'],
                                   payment_invoices=payment_invoices)
    else:
        return render_template('errorhandler/404.jinja2')
