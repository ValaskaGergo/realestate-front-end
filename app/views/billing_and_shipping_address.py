# -*- coding: utf-8 -*-
from app import app
from config import _templates
from flask import Blueprint, g, render_template, request, json, make_response, jsonify
from app.forms.billing_and_shipping_address_forms import BillingAddressForm, ShippingAddressForm
import requests
from urllib import parse
import io
from pyjsonq import JsonQ

mod = Blueprint('billing_and_shipping_address_module', __name__)


@mod.route('/billing-and-shipping-address', methods=['GET'])
def billing_and_shipping_address():
    if g.logged_in:

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

        billing_form.billing_is_company.data = g.permission['is_user_login']['user_billing_information']['is_company']
        billing_form.billing_first_name.data = g.permission['is_user_login']['user_billing_information']['first_name']
        billing_form.billing_last_name.data = g.permission['is_user_login']['user_billing_information']['last_name']
        billing_form.billing_company_name.data = g.permission['is_user_login']['user_billing_information'][
            'company_name']
        billing_form.billing_company_tax.data = g.permission['is_user_login']['user_billing_information']['company_tax']
        billing_form.billing_phone.data = g.permission['is_user_login']['user_billing_information']['phone']
        if g.permission['is_user_login']['user_billing_information']['email'] is None:
            billing_form.billing_email.data = g.permission['is_user_login']['user']['email']
        else:
            billing_form.billing_email.data = g.permission['is_user_login']['user_billing_information']['email']
        billing_form.billing_country.data = g.permission['is_user_login']['user_billing_information']['country']
        billing_form.billing_zip_number.data = g.permission['is_user_login']['user_billing_information']['zip_number']
        billing_form.billing_place.data = g.permission['is_user_login']['user_billing_information']['place']
        billing_form.billing_street.data = g.permission['is_user_login']['user_billing_information']['street']
        billing_form.billing_is_shipping_address.data = g.permission['is_user_login']['user_billing_information'][
            'is_shipping_address']
        billing_form.billing_currency.data = g.permission['is_user_login']['user_billing_information']['currency']

        shipping_form.shipping_first_name.data = g.permission['is_user_login']['user_shipping_information'][
            'first_name']
        shipping_form.shipping_last_name.data = g.permission['is_user_login']['user_shipping_information']['last_name']
        shipping_form.shipping_company_name.data = g.permission['is_user_login']['user_shipping_information'][
            'company_name']
        shipping_form.shipping_phone.data = g.permission['is_user_login']['user_shipping_information']['phone']
        if g.permission['is_user_login']['user_shipping_information']['email'] is None:
            shipping_form.shipping_email.data = g.permission['is_user_login']['user']['email']
        else:
            shipping_form.shipping_email.data = g.permission['is_user_login']['user_shipping_information']['email']
        shipping_form.shipping_country.data = g.permission['is_user_login']['user_billing_information']['country']
        shipping_form.shipping_zip_number.data = g.permission['is_user_login']['user_shipping_information'][
            'zip_number']
        shipping_form.shipping_place.data = g.permission['is_user_login']['user_shipping_information']['place']
        shipping_form.shipping_street.data = g.permission['is_user_login']['user_shipping_information']['street']
        shipping_form.shipping_currency.data = g.permission['is_user_login']['user_shipping_information']['currency']

        return render_template('authentication/settings/billing-and-shipping-address.jinja2',
                               billing_form=billing_form,
                               shipping_form=shipping_form,
                               countries=countries)
    else:
        return render_template('errorhandler/404.jinja2')


# AJAX
@mod.route('/_billing-and-shipping-address', methods=['POST'])
def _billing_and_shipping_address():
    data = json.loads(request.get_data())

    if g.permission['is_user_login']['user_permission']['is_user_management'] == "True":
        if bool(data['user_email'] and data['user_email'].strip() is not False):
            email = data['user_email']
        else:
            email = data['billing_email']
    else:
        email = g.permission['is_user_login']['user']['email']

    url = app.config['API_SERVER_URL'] + "/billing-and-shipping-address"
    headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
    payload = {
        "email": email,
        "billing_is_company": data['billing_is_company'],
        "billing_email": data['billing_email'],
        "billing_first_name": data['billing_first_name'],
        "billing_last_name": data['billing_last_name'],
        "billing_phone": data['billing_phone'],
        "billing_company_name": data['billing_company_name'],
        "billing_company_tax": data['billing_company_tax'],
        "billing_country": data['billing_country'],
        "billing_zip_number": data['billing_zip_number'],
        "billing_place": data['billing_place'],
        "billing_street": data['billing_street'],
        "billing_is_shipping_address": data['billing_is_shipping_address'],
        "billing_currency": data['billing_currency'],
        "last_modification_user_id": g.permission['is_user_login']['user']['id'],
        "last_modification_user_name": g.permission['is_user_login']['user_profile']['username'],

        "shipping_email": data['shipping_email'],
        "shipping_first_name": data['shipping_first_name'],
        "shipping_last_name": data['shipping_last_name'],
        "shipping_company_name": data['shipping_company_name'],
        "shipping_phone": data['shipping_phone'],
        "shipping_country": data['shipping_country'],
        "shipping_zip_number": data['shipping_zip_number'],
        "shipping_place": data['shipping_place'],
        "shipping_street": data['shipping_street'],
        "shipping_currency": data['shipping_currency']
    }
    r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

    if r.status_code == 200:
        data = {"status": 'success', 'message': r.json()}
        return make_response(jsonify(data), 200)
    else:
        data = {"status": 'error', 'message': r.json()}
        return make_response(jsonify(data), 400)
