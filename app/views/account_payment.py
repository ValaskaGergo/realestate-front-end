# -*- coding: utf-8 -*-
from app import app
from flask import Blueprint, g, request, render_template, redirect, url_for, json, make_response, jsonify
from app.forms.account_payment_forms import AccountPaymentForm
import requests
from pyjsonq import JsonQ
from furl import furl

mod = Blueprint('account_payment_module', __name__)


@mod.route('/pricing', methods=['GET'])
def pricing():
    url = app.config['API_SERVER_URL'] + "/get-admin-settings-all"
    headers = {'X-Api-Key': app.config['API_KEY']}
    r = requests.get(url, headers=headers, verify=app.config['TLS_VERIFY'])
    if r.status_code == 200:
        data = r.json().get("data")
        form = AccountPaymentForm()

        # Start Start Account
        start_1_month_price = JsonQ(data=data).where('settings_id', '=', 1).get()
        start_1_month_price_value = float(start_1_month_price[0]['settings_value'])
        start_3_month_price = JsonQ(data=data).where('settings_id', '=', 4).get()
        start_3_month_price_value = float(start_3_month_price[0]['settings_value'])
        start_1_year_price = JsonQ(data=data).where('settings_id', '=', 7).get()
        start_1_year_price_value = float(start_1_year_price[0]['settings_value'])

        start_ad_limit = JsonQ(data=data).where('settings_id', '=', 10).get()
        start_ad_limit_value = start_ad_limit[0]['settings_value']

        start_chat_limit = JsonQ(data=data).where('settings_id', '=', 13).get()
        start_chat_limit_value = start_chat_limit[0]['settings_value']

        start_1_month_eur_net = start_1_month_price_value
        start_3_month_eur_net = start_3_month_price_value
        start_1_year_eur_net = start_1_year_price_value
        # End Start Account

        # Start Basic Account
        basic_1_month_price = JsonQ(data=data).where('settings_id', '=', 2).get()
        basic_1_month_price_value = float(basic_1_month_price[0]['settings_value'])
        basic_3_month_price = JsonQ(data=data).where('settings_id', '=', 5).get()
        basic_3_month_price_value = float(basic_3_month_price[0]['settings_value'])
        basic_1_year_price = JsonQ(data=data).where('settings_id', '=', 8).get()
        basic_1_year_price_value = float(basic_1_year_price[0]['settings_value'])

        basic_ad_limit = JsonQ(data=data).where('settings_id', '=', 11).get()
        basic_ad_limit_value = basic_ad_limit[0]['settings_value']

        basic_chat_limit = JsonQ(data=data).where('settings_id', '=', 14).get()
        basic_chat_limit_value = basic_chat_limit[0]['settings_value']

        basic_1_month_eur_net = basic_1_month_price_value
        basic_3_month_eur_net = basic_3_month_price_value
        basic_1_year_eur_net = basic_1_year_price_value
        # End Basic Account

        # Start Premium Account
        premium_1_month_price = JsonQ(data=data).where('settings_id', '=', 3).get()
        premium_1_month_price_value = float(premium_1_month_price[0]['settings_value'])
        premium_3_month_price = JsonQ(data=data).where('settings_id', '=', 6).get()
        premium_3_month_price_value = float(premium_3_month_price[0]['settings_value'])
        premium_1_year_price = JsonQ(data=data).where('settings_id', '=', 9).get()
        premium_1_year_price_value = float(premium_1_year_price[0]['settings_value'])

        premium_ad_limit = JsonQ(data=data).where('settings_id', '=', 12).get()
        premium_ad_limit_value = premium_ad_limit[0]['settings_value']

        premium_chat_limit = JsonQ(data=data).where('settings_id', '=', 15).get()
        premium_chat_limit_value = premium_chat_limit[0]['settings_value']

        premium_1_month_eur_net = premium_1_month_price_value
        premium_3_month_eur_net = premium_3_month_price_value
        premium_1_year_eur_net = premium_1_year_price_value
        # End Premium Account

        return render_template("anonymous/pricing.jinja2",
                               form=form,

                               # Start Start Account
                               start_1_month_eur_net=round(start_1_month_eur_net, 2),
                               start_3_month_eur_net=round(start_3_month_eur_net, 2),
                               start_1_year_eur_net=round(start_1_year_eur_net, 2),
                               start_ad_limit_value=start_ad_limit_value,
                               start_chat_limit_value=start_chat_limit_value,
                               # End Start Account

                               # Start Basic Account
                               basic_1_month_eur_net=round(basic_1_month_eur_net, 2),
                               basic_3_month_eur_net=round(basic_3_month_eur_net, 2),
                               basic_1_year_eur_net=round(basic_1_year_eur_net, 2),
                               basic_ad_limit_value=basic_ad_limit_value,
                               basic_chat_limit_value=basic_chat_limit_value,
                               # End Basic Account

                               # Start Premium Account
                               premium_1_month_eur_net=round(premium_1_month_eur_net, 2),
                               premium_3_month_eur_net=round(premium_3_month_eur_net, 2),
                               premium_1_year_eur_net=round(premium_1_year_eur_net, 2),
                               premium_ad_limit_value=premium_ad_limit_value,
                               premium_chat_limit_value=premium_chat_limit_value,
                               # End Premium Account
                               )


@mod.route('/account-payment', methods=['GET'])
def account_payment():
    if g.logged_in:
        url = app.config['API_SERVER_URL'] + "/get-admin-settings-all"
        headers = {'X-Api-Key': app.config['API_KEY']}
        r = requests.get(url, headers=headers, verify=app.config['TLS_VERIFY'])
        if r.status_code == 200:
            if g.permission['is_user_login']['user_billing_information']['completed'] == "True":
                data = r.json().get("data")

                country_vat = g.permission['is_user_login']['user_billing_information']['payment_country_vat']
                currency = g.permission['is_user_login']['user_billing_information']['currency']
                eur1_to_net = g.permission['is_user_login']['user_billing_information']['eur1_to_net']
                eur1_to_gross = g.permission['is_user_login']['user_billing_information']['eur1_to_gross']
                eur1_to_net_currency = g.permission['is_user_login']['user_billing_information']['eur1_to_net_currency']
                eur1_to_gross_currency = g.permission['is_user_login']['user_billing_information'][
                    'eur1_to_gross_currency']

                # Start Start Account
                start_1_month_price = JsonQ(data=data).where('settings_id', '=', 1).get()
                start_1_month_price_value = float(start_1_month_price[0]['settings_value'])
                start_3_month_price = JsonQ(data=data).where('settings_id', '=', 4).get()
                start_3_month_price_value = float(start_3_month_price[0]['settings_value'])
                start_1_year_price = JsonQ(data=data).where('settings_id', '=', 7).get()
                start_1_year_price_value = float(start_1_year_price[0]['settings_value'])

                start_ad_limit = JsonQ(data=data).where('settings_id', '=', 10).get()
                start_ad_limit_value = start_ad_limit[0]['settings_value']

                start_chat_limit = JsonQ(data=data).where('settings_id', '=', 13).get()
                start_chat_limit_value = start_chat_limit[0]['settings_value']

                start_1_month_eur_net = start_1_month_price_value * eur1_to_net
                start_1_month_eur_gross = start_1_month_price_value * eur1_to_gross
                start_1_month_currency_net = start_1_month_price_value * eur1_to_net_currency
                start_1_month_currency_gross = start_1_month_price_value * eur1_to_gross_currency

                start_3_month_eur_net = start_3_month_price_value * eur1_to_net
                start_3_month_eur_gross = start_3_month_price_value * eur1_to_gross
                start_3_month_currency_net = start_3_month_price_value * eur1_to_net_currency
                start_3_month_currency_gross = start_3_month_price_value * eur1_to_gross_currency

                start_1_year_eur_net = start_1_year_price_value * eur1_to_net
                start_1_year_eur_gross = start_1_year_price_value * eur1_to_gross
                start_1_year_currency_net = start_1_year_price_value * eur1_to_net_currency
                start_1_year_currency_gross = start_1_year_price_value * eur1_to_gross_currency
                # End Start Account

                # Start Basic Account
                basic_1_month_price = JsonQ(data=data).where('settings_id', '=', 2).get()
                basic_1_month_price_value = float(basic_1_month_price[0]['settings_value'])
                basic_3_month_price = JsonQ(data=data).where('settings_id', '=', 5).get()
                basic_3_month_price_value = float(basic_3_month_price[0]['settings_value'])
                basic_1_year_price = JsonQ(data=data).where('settings_id', '=', 8).get()
                basic_1_year_price_value = float(basic_1_year_price[0]['settings_value'])

                basic_ad_limit = JsonQ(data=data).where('settings_id', '=', 11).get()
                basic_ad_limit_value = basic_ad_limit[0]['settings_value']

                basic_chat_limit = JsonQ(data=data).where('settings_id', '=', 14).get()
                basic_chat_limit_value = basic_chat_limit[0]['settings_value']

                basic_1_month_eur_net = basic_1_month_price_value * eur1_to_net
                basic_1_month_eur_gross = basic_1_month_price_value * eur1_to_gross
                basic_1_month_currency_net = basic_1_month_price_value * eur1_to_net_currency
                basic_1_month_currency_gross = basic_1_month_price_value * eur1_to_gross_currency

                basic_3_month_eur_net = basic_3_month_price_value * eur1_to_net
                basic_3_month_eur_gross = basic_3_month_price_value * eur1_to_gross
                basic_3_month_currency_net = basic_3_month_price_value * eur1_to_net_currency
                basic_3_month_currency_gross = basic_3_month_price_value * eur1_to_gross_currency

                basic_1_year_eur_net = basic_1_year_price_value * eur1_to_net
                basic_1_year_eur_gross = basic_1_year_price_value * eur1_to_gross
                basic_1_year_currency_net = basic_1_year_price_value * eur1_to_net_currency
                basic_1_year_currency_gross = basic_1_year_price_value * eur1_to_gross_currency
                # End Basic Account

                # Start Premium Account
                premium_1_month_price = JsonQ(data=data).where('settings_id', '=', 3).get()
                premium_1_month_price_value = float(premium_1_month_price[0]['settings_value'])
                premium_3_month_price = JsonQ(data=data).where('settings_id', '=', 6).get()
                premium_3_month_price_value = float(premium_3_month_price[0]['settings_value'])
                premium_1_year_price = JsonQ(data=data).where('settings_id', '=', 9).get()
                premium_1_year_price_value = float(premium_1_year_price[0]['settings_value'])

                premium_ad_limit = JsonQ(data=data).where('settings_id', '=', 12).get()
                premium_ad_limit_value = premium_ad_limit[0]['settings_value']

                premium_chat_limit = JsonQ(data=data).where('settings_id', '=', 15).get()
                premium_chat_limit_value = premium_chat_limit[0]['settings_value']

                premium_1_month_eur_net = premium_1_month_price_value * eur1_to_net
                premium_1_month_eur_gross = premium_1_month_price_value * eur1_to_gross
                premium_1_month_currency_net = premium_1_month_price_value * eur1_to_net_currency
                premium_1_month_currency_gross = premium_1_month_price_value * eur1_to_gross_currency

                premium_3_month_eur_net = premium_3_month_price_value * eur1_to_net
                premium_3_month_eur_gross = premium_3_month_price_value * eur1_to_gross
                premium_3_month_currency_net = premium_3_month_price_value * eur1_to_net_currency
                premium_3_month_currency_gross = premium_3_month_price_value * eur1_to_gross_currency

                premium_1_year_eur_net = premium_1_year_price_value * eur1_to_net
                premium_1_year_eur_gross = premium_1_year_price_value * eur1_to_gross
                premium_1_year_currency_net = premium_1_year_price_value * eur1_to_net_currency
                premium_1_year_currency_gross = premium_1_year_price_value * eur1_to_gross_currency
                # End Premium Account

                form = AccountPaymentForm()

                barion_payment_id = request.args.get('paymentId')
                paypal_payment_id = request.args.get('token')

                #  Start Barion Payment Status
                if barion_payment_id is not None:
                    barion_payment_id_status = True
                else:
                    barion_payment_id_status = False
                #  End Barion Payment Status

                #  Start PayPal Payment Status
                if paypal_payment_id is not None:
                    paypal_payment_id_status = True
                else:
                    paypal_payment_id_status = False
                #  End PayPal payment Status

                return render_template('authentication/account-payment.jinja2',
                                       form=form,
                                       country_vat=country_vat,
                                       currency=currency,

                                       # Start Start Account
                                       start_1_month_eur_net=round(start_1_month_eur_net, 2),
                                       start_1_month_eur_gross=round(start_1_month_eur_gross, 2),
                                       start_1_month_currency_net=round(start_1_month_currency_net, 2),
                                       start_1_month_currency_gross=round(start_1_month_currency_gross, 2),

                                       start_3_month_eur_net=round(start_3_month_eur_net, 2),
                                       start_3_month_eur_gross=round(start_3_month_eur_gross, 2),
                                       start_3_month_currency_net=round(start_3_month_currency_net, 2),
                                       start_3_month_currency_gross=round(start_3_month_currency_gross, 2),

                                       start_1_year_eur_net=round(start_1_year_eur_net, 2),
                                       start_1_year_eur_gross=round(start_1_year_eur_gross, 2),
                                       start_1_year_currency_net=round(start_1_year_currency_net, 2),
                                       start_1_year_currency_gross=round(start_1_year_currency_gross, 2),

                                       start_ad_limit_value=start_ad_limit_value,

                                       start_chat_limit_value=start_chat_limit_value,
                                       # End Start Account

                                       # Start Basic Account
                                       basic_1_month_eur_net=round(basic_1_month_eur_net, 2),
                                       basic_1_month_eur_gross=round(basic_1_month_eur_gross, 2),
                                       basic_1_month_currency_net=round(basic_1_month_currency_net, 2),
                                       basic_1_month_currency_gross=round(basic_1_month_currency_gross, 2),

                                       basic_3_month_eur_net=round(basic_3_month_eur_net, 2),
                                       basic_3_month_eur_gross=round(basic_3_month_eur_gross, 2),
                                       basic_3_month_currency_net=round(basic_3_month_currency_net, 2),
                                       basic_3_month_currency_gross=round(basic_3_month_currency_gross, 2),

                                       basic_1_year_eur_net=round(basic_1_year_eur_net, 2),
                                       basic_1_year_eur_gross=round(basic_1_year_eur_gross, 2),
                                       basic_1_year_currency_net=round(basic_1_year_currency_net, 2),
                                       basic_1_year_currency_gross=round(basic_1_year_currency_gross, 2),

                                       basic_ad_limit_value=basic_ad_limit_value,

                                       basic_chat_limit_value=basic_chat_limit_value,
                                       # End Basic Account

                                       # Start Premium Account
                                       premium_1_month_eur_net=round(premium_1_month_eur_net, 2),
                                       premium_1_month_eur_gross=round(premium_1_month_eur_gross, 2),
                                       premium_1_month_currency_net=round(premium_1_month_currency_net, 2),
                                       premium_1_month_currency_gross=round(premium_1_month_currency_gross, 2),

                                       premium_3_month_eur_net=round(premium_3_month_eur_net, 2),
                                       premium_3_month_eur_gross=round(premium_3_month_eur_gross, 2),
                                       premium_3_month_currency_net=round(premium_3_month_currency_net, 2),
                                       premium_3_month_currency_gross=round(premium_3_month_currency_gross, 2),

                                       premium_1_year_eur_net=round(premium_1_year_eur_net, 2),
                                       premium_1_year_eur_gross=round(premium_1_year_eur_gross, 2),
                                       premium_1_year_currency_net=round(premium_1_year_currency_net, 2),
                                       premium_1_year_currency_gross=round(premium_1_year_currency_gross, 2),

                                       premium_ad_limit_value=premium_ad_limit_value,

                                       premium_chat_limit_value=premium_chat_limit_value,
                                       # End Premium Account

                                       barion_payment_id_status=barion_payment_id_status,
                                       barion_payment_id=barion_payment_id,

                                       paypal_payment_id_status=paypal_payment_id_status,
                                       paypal_payment_id=paypal_payment_id
                                       )
            else:
                return redirect(url_for('billing_and_shipping_address_module.billing_and_shipping_address'))
    else:
        return render_template('errorhandler/404.jinja2')


# AJAX
@mod.route('/_account-payment', methods=['POST'])
def _account_payment():
    data = json.loads(request.get_data())
    payment_data = data['payment_data']
    payment = json.loads(data['payment_data'])

    payment_country_vat = g.permission['is_user_login']['user_billing_information']['payment_country_vat']
    eur1_to_net = g.permission['is_user_login']['user_billing_information']['eur1_to_net']
    eur1_to_gross = g.permission['is_user_login']['user_billing_information']['eur1_to_gross']
    eur1_to_net_currency = g.permission['is_user_login']['user_billing_information']['eur1_to_net_currency']
    eur1_to_gross_currency = g.permission['is_user_login']['user_billing_information']['eur1_to_gross_currency']
    billingo_partner_id = g.permission['is_user_login']['user_billing_information']['billingo_partner_id']

    if payment['payment'] == "barion":
        url = app.config['API_SERVER_URL'] + "/barion-payment-start"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "email": g.permission['is_user_login']['user']['email'],
            "payment_data": payment_data,
            "payment_country_vat": payment_country_vat,
            "eur1_to_net": eur1_to_net,
            "eur1_to_gross": eur1_to_gross,
            "eur1_to_net_currency": eur1_to_net_currency,
            "eur1_to_gross_currency": eur1_to_gross_currency,
            "billingo_partner_id": billingo_partner_id
        }
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            data = r.json()
            return make_response(jsonify(data), 200)
        else:
            data = {"status": 'error', 'message': r.json()}
            return make_response(jsonify(data), 400)

    if payment['payment'] == "paypal":
        url = app.config['API_SERVER_URL'] + "/paypal-payment-start"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "email": g.permission['is_user_login']['user']['email'],
            "payment_data": payment_data,
            "payment_country_vat": payment_country_vat,
            "eur1_to_net": eur1_to_net,
            "eur1_to_gross": eur1_to_gross,
            "eur1_to_net_currency": eur1_to_net_currency,
            "eur1_to_gross_currency": eur1_to_gross_currency,
            "billingo_partner_id": billingo_partner_id
        }
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            data = r.json()
            return make_response(jsonify(data), 200)
        else:
            data = {"status": 'error', 'message': r.json()}
            return make_response(jsonify(data), 400)


# AJAX
@mod.route('/_barion-payment-id-status', methods=['POST'])
def _barion_payment_is_status():
    data = json.loads(request.get_data())
    payment_id = data['payment_id']

    url = app.config['API_SERVER_URL'] + "/barion-payment-id-status"
    headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
    payload = {
        "payment_id": payment_id
    }
    r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

    if r.status_code == 200:
        data = r.json()
        return make_response(jsonify(data), 200)
    else:
        data = {"status": 'error', 'message': r.json()}
        return make_response(jsonify(data), 400)


# AJAX
@mod.route('/_paypal-payment-id-status', methods=['POST'])
def _paypal_payment_is_status():
    data = json.loads(request.get_data())
    payment_id = data['payment_id']

    url = app.config['API_SERVER_URL'] + "/paypal-payment-id-status"
    headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
    payload = {
        "payment_id": payment_id
    }
    r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

    if r.status_code == 200:
        data = r.json()
        return make_response(jsonify(data), 200)
    else:
        data = {"status": 'error', 'message': r.json()}
        return make_response(jsonify(data), 400)
