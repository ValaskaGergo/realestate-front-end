# -*- coding: utf-8 -*-
from app import app
from config import _templates
from flask import Blueprint, g, render_template, request, json, make_response, jsonify
from app.forms.billing_and_shipping_address_forms import BillingAddressForm, ShippingAddressForm
from app.forms.user_management_forms import AddUserForm
import requests
from urllib import parse
import io
from pyjsonq import JsonQ

mod = Blueprint('user_management_module', __name__)


@mod.route('/user-management', methods=['GET'])
@mod.route('/user-management/page/<page_number>', methods=['GET'])
def user_management(page_number=None):
    if page_number is None:
        page_number = 1

    if g.logged_in and g.permission['is_user_login']['user_permission']['is_user_management'] == "True":

        add_user_form = AddUserForm()

        url = app.config['API_SERVER_URL'] + "/get-user-all"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "page_number": page_number,
            "type": "active"
        }
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            users_data = r.json().get("data")
            pagination_list = r.json().get("pagination_list")
            pagination = r.json().get("pagination")

            return render_template('authentication/admin/user-management.jinja2',
                                   pagination_list=pagination_list,
                                   page_number=pagination['page_number'],
                                   users_limit=pagination['users_limit'],
                                   users_count=pagination['users_count'],
                                   pagination_count=pagination['pagination_count'],
                                   pagination_first=pagination['pagination_first'],
                                   pagination_last=pagination['pagination_last'],
                                   pagination_next=pagination['pagination_next'],
                                   pagination_previous=pagination['pagination_previous'],
                                   users_data=users_data,
                                   add_user_form=add_user_form)
    else:
        return render_template('errorhandler/404.jinja2')


@mod.route('/user-management/inactive', methods=['GET'])
@mod.route('/user-management/inactive/page/<page_number>', methods=['GET'])
def user_management_inactive(page_number=None):
    if page_number is None:
        page_number = 1

    if g.logged_in and g.permission['is_user_login']['user_permission']['is_user_management'] == "True":

        add_user_form = AddUserForm()

        url = app.config['API_SERVER_URL'] + "/get-user-all"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "page_number": page_number,
            "type": "inactive"
        }
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            users_data = r.json().get("data")
            pagination_list = r.json().get("pagination_list")
            pagination = r.json().get("pagination")

            return render_template('authentication/admin/user-management-inactive.jinja2',
                                   pagination_list=pagination_list,
                                   page_number=pagination['page_number'],
                                   users_limit=pagination['users_limit'],
                                   users_count=pagination['users_count'],
                                   pagination_count=pagination['pagination_count'],
                                   pagination_first=pagination['pagination_first'],
                                   pagination_last=pagination['pagination_last'],
                                   pagination_next=pagination['pagination_next'],
                                   pagination_previous=pagination['pagination_previous'],
                                   users_data=users_data,
                                   add_user_form=add_user_form)
    else:
        return render_template('errorhandler/404.jinja2')


@mod.route('/user-management/deleted', methods=['GET'])
@mod.route('/user-management/deleted/page/<page_number>', methods=['GET'])
def user_management_deleted(page_number=None):
    if page_number is None:
        page_number = 1

    if g.logged_in and g.permission['is_user_login']['user_permission']['is_user_management'] == "True":

        add_user_form = AddUserForm()

        url = app.config['API_SERVER_URL'] + "/get-user-all"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "page_number": page_number,
            "type": "deleted"
        }
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            users_data = r.json().get("data")
            pagination_list = r.json().get("pagination_list")
            pagination = r.json().get("pagination")

            return render_template('authentication/admin/user-management-deleted.jinja2',
                                   pagination_list=pagination_list,
                                   page_number=pagination['page_number'],
                                   users_limit=pagination['users_limit'],
                                   users_count=pagination['users_count'],
                                   pagination_count=pagination['pagination_count'],
                                   pagination_first=pagination['pagination_first'],
                                   pagination_last=pagination['pagination_last'],
                                   pagination_next=pagination['pagination_next'],
                                   pagination_previous=pagination['pagination_previous'],
                                   users_data=users_data,
                                   add_user_form=add_user_form)
    else:
        return render_template('errorhandler/404.jinja2')


@mod.route('/user-management/user/<int:user_id>', methods=['GET'])
def user_management_user_id(user_id):
    if g.logged_in and g.permission['is_user_login']['user_permission']['is_user_management'] == "True":
        try:
            try:
                lang = parse.unquote(request.cookies.get("abBrowserLang")).replace("%22", "").replace('"', '')
            except TypeError:
                lang = "en"
        except TypeError:
            supported_languages = app.config['SUPPORTED_LANGUAGES']
            lang = request.accept_languages.best_match(supported_languages)

        countries_json = io.open(_templates + "/i18n/countries." + lang + ".json", 'r', encoding='utf8')
        countries_read = json.loads(countries_json.read())
        countries = countries_read

        jq = JsonQ(data=countries)
        countries = jq.at("data").sort_by("country", "asc").group_by('region').get()

        billing_form = BillingAddressForm()
        shipping_form = ShippingAddressForm()

        url = app.config['API_SERVER_URL'] + "/get-user-data"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "email": None,
            "user_id": user_id
        }
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            data = r.json().get("payload")

            billing_form.user_email.data = data['user']['email']
            billing_form.billing_is_company.data = data['user_billing_information']['is_company']
            billing_form.billing_first_name.data = data['user_billing_information']['first_name']
            billing_form.billing_last_name.data = data['user_billing_information']['last_name']
            billing_form.billing_company_name.data = data['user_billing_information']['company_name']
            billing_form.billing_company_tax.data = data['user_billing_information']['company_tax']
            billing_form.billing_phone.data = data['user_billing_information']['phone']
            billing_form.billing_email.data = data['user_billing_information']['email']
            billing_form.billing_country.data = data['user_billing_information']['country']
            billing_form.billing_zip_number.data = data['user_billing_information']['zip_number']
            billing_form.billing_place.data = data['user_billing_information']['place']
            billing_form.billing_street.data = data['user_billing_information']['street']
            billing_form.billing_is_shipping_address.data = data['user_billing_information']['is_shipping_address']
            billing_form.billing_currency.data = data['user_billing_information']['currency']
            ubi_last_modification_user_id = data['user_billing_information']['last_modification_user_id']
            ubi_last_modification_user_name = data['user_billing_information']['last_modification_user_name']
            ubi_created_at = data['user_billing_information']['created_at']
            ubi_updated_at = data['user_billing_information']['updated_at']

            app.logger.info(ubi_last_modification_user_id)
            app.logger.info(ubi_last_modification_user_name)

            shipping_form.shipping_first_name.data = data['user_shipping_information']['first_name']
            shipping_form.shipping_last_name.data = data['user_shipping_information']['last_name']
            shipping_form.shipping_company_name.data = data['user_shipping_information']['company_name']
            shipping_form.shipping_phone.data = data['user_shipping_information']['phone']
            shipping_form.shipping_email.data = data['user_shipping_information']['email']
            shipping_form.shipping_country.data = data['user_billing_information']['country']
            shipping_form.shipping_zip_number.data = data['user_shipping_information']['zip_number']
            shipping_form.shipping_place.data = data['user_shipping_information']['place']
            shipping_form.shipping_street.data = data['user_shipping_information']['street']
            shipping_form.shipping_currency.data = data['user_shipping_information']['currency']

            billing_user_email = data['user']['email']
            worker_user_email = g.permission['is_user_login']['user']['email']

            url = app.config['API_SERVER_URL'] + "/user-management-list-of-uploaded-animals"
            headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
            payload = {
                "email": data['user']['email']
            }
            r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])
            if r.status_code == 200:
                animals = r.json().get("data")
            else:
                animals = []

            url = app.config['API_SERVER_URL'] + "/user-management-get-invoices"
            headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
            payload = {
                "email": data['user']['email']
            }
            r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])
            if r.status_code == 200:
                invoices = r.json()
                payment_invoices = invoices['data']
            else:
                payment_invoices = []

            return render_template('authentication/admin/user-management-user-id.jinja2',
                                   billing_form=billing_form,
                                   shipping_form=shipping_form,
                                   countries=countries,
                                   is_company=data['user_billing_information']['is_company'],
                                   is_shipping_address=data['user_billing_information']['is_shipping_address'],
                                   first_name=data['user_billing_information'][
                                       'first_name'],
                                   last_name=data['user_billing_information'][
                                       'last_name'],
                                   billing_user_email=billing_user_email,
                                   worker_user_email=worker_user_email,
                                   user_id=data['user']['id'],
                                   user_email=data['user']['email'],
                                   is_worker=data['user_permission']['is_worker'],
                                   user_ads_count=data['user_permission']['subscribed_ads'],
                                   is_admin=data['user_permission']['is_admin'],
                                   is_admin_settings_management=data['user_permission']['is_admin_settings_management'],
                                   is_user_management=data['user_permission']['is_user_management'],
                                   is_category_management=data['user_permission']['is_category_management'],
                                   is_notifications=data['user_permission']['is_notifications'],
                                   inactive_account=data['user_permission']['inactive_account'],
                                   deleted=data['user']['deleted'],
                                   last_modification_user_id=data['user_permission']['last_modification_user_id'],
                                   last_modification_user_name=data['user_permission']['last_modification_user_name'],
                                   updated_at=data['user_permission']['updated_at'],
                                   animals=animals,
                                   payment_invoices=payment_invoices,
                                   ubi_last_modification_user_id=ubi_last_modification_user_id,
                                   ubi_last_modification_user_name=ubi_last_modification_user_name,
                                   ubi_created_at=ubi_created_at,
                                   ubi_updated_at=ubi_updated_at
                                   )
    else:
        return render_template('errorhandler/404.jinja2')


# AJAX
@mod.route('/_user-management-delete-user', methods=['POST'])
def _user_management_delete_user():
    data = json.loads(request.get_data())

    url = app.config['API_SERVER_URL'] + "/user-management-delete-user"
    headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
    payload = {
        "email": data['user_email']
    }
    r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

    if r.status_code == 200:
        data = {"status": 'success', 'message': r.json()}
        return make_response(jsonify(data), 200)
    else:
        data = {"status": 'error', 'message': r.json()}
        return make_response(jsonify(data), 400)


# AJAX
@mod.route('/_user-management-back-delete-user', methods=['POST'])
def _user_management_back_delete_user():
    data = json.loads(request.get_data())

    url = app.config['API_SERVER_URL'] + "/user-management-back-delete-user"
    headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
    payload = {
        "email": data['user_email']
    }
    r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

    if r.status_code == 200:
        data = {"status": 'success', 'message': r.json()}
        return make_response(jsonify(data), 200)
    else:
        data = {"status": 'error', 'message': r.json()}
        return make_response(jsonify(data), 400)

# AJAX
@mod.route('/_user-management-force-delete-user', methods=['POST'])
def _user_management_force_delete_user():
    data = json.loads(request.get_data())

    url = app.config['API_SERVER_URL'] + "/user-management-force-delete-user"
    headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
    payload = {
        "email": data['user_email']
    }
    r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

    if r.status_code == 200:
        data = {"status": 'success', 'message': r.json()}
        return make_response(jsonify(data), 200)
    else:
        data = {"status": 'error', 'message': r.json()}
        return make_response(jsonify(data), 400)


# AJAX
@mod.route('/_user-management-permission', methods=['POST'])
def _user_management_permission():
    data = json.loads(request.get_data())

    url = app.config['API_SERVER_URL'] + "/user-management-permission"
    headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
    payload = {
        "email": g.permission['is_user_login']['user']['email'],
        "data_type": data['data_type'],
        "data_status": data['data_status'],
        "data_user_id": data['data_user_id']
    }
    r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

    if r.status_code == 200:
        data = {"status": 'success', 'message': r.json()}
        return make_response(jsonify(data), 200)
    else:
        data = {"status": 'error', 'message': r.json()}
        return make_response(jsonify(data), 400)


# AJAX
@mod.route('/_user-management-add-user', methods=['POST'])
def _user_management_add_user():
    data = json.loads(request.get_data())

    email = data['email']
    name = data['name']
    password = data['password']
    password_confirm = data['password_confirm']

    url = app.config['API_SERVER_URL'] + "/user-management-add-user"
    headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
    payload = {
        "worker_id": g.permission['is_user_login']['user']['id'],
        "worker_username": g.permission['is_user_login']['user_profile']['username'],
        "email": email,
        "name": name,
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
