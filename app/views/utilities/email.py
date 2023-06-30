# -*- coding: utf-8 -*-
from app import app
from flask import render_template, json
from app import mail
from flask_mail import Message
from config import _templates
import smtplib


def sign_up_email(lang, email, pin, code):
    i18n_json = open(_templates + "/i18n/anlirealestate." + lang + ".json", "r")
    i18n_data = json.loads(i18n_json.read())

    url = app.config['SERVER_URL'] + "/sign-up-pin?code=" + code + "&pin=" + pin
    anlihouse_anlibreeders = i18n_data['anlihouse-anlibreeders']
    welcome = i18n_data['welcome']
    pleaseClickBelow = i18n_data['pleaseClickBelow']
    verifyEmailAdress = i18n_data['verifyEmailAdress']
    ifyoudidnotregistred = i18n_data['ifyoudidnotregistred']
    regards = i18n_data['regards']
    anlihouseTeam = i18n_data['anlihouseTeam']
    havingTroubleAboutClicking = i18n_data['havingTroubleAboutClicking']

    msg = Message(recipients=[email])
    msg.body = render_template('email/anonymous/sign-up.jinja2',
                               url=url,
                               pin=pin,
                               anlihouse_anlibreeders=anlihouse_anlibreeders,
                               welcome=welcome,
                               pleaseClickBelow=pleaseClickBelow,
                               verifyEmailAdress=verifyEmailAdress,
                               ifyoudidnotregistred=ifyoudidnotregistred,
                               regards=regards,
                               anlihouseTeam=anlihouseTeam,
                               havingTroubleAboutClicking=havingTroubleAboutClicking)
    msg.html = msg.body
    try:
        mail.send(msg)
    except smtplib.SMTPException as error:
        app.logger.debug(error)


def password_reset_email(lang, email, pin, code):
    i18n_json = open(_templates + "/i18n/anlirealestate." + lang + ".json", "r")
    i18n_data = json.loads(i18n_json.read())

    url = app.config['SERVER_URL'] + "/password-reset-pin?code=" + code + "&pin=" + pin

    msg = Message(recipients=[email])
    msg.body = render_template('email/anonymous/password-reset.jinja2',
                               url=url,
                               pin=pin)
    msg.html = msg.body
    try:
        mail.send(msg)
    except smtplib.SMTPException as error:
        app.logger.debug(error)


def security_email(lang, secondary_email, secret_key):
    i18n_json = open(_templates + "/i18n/anlirealestate." + lang + ".json", "r")
    i18n_data = json.loads(i18n_json.read())

    url = app.config['SERVER_URL'] + "/security?secret-key=" + secret_key

    msg = Message(recipients=[secondary_email])
    msg.body = render_template('email/authentication/security-email.jinja2',
                               url=url,
                               secret_key=secret_key)
    msg.html = msg.body
    try:
        mail.send(msg)
    except smtplib.SMTPException as error:
        app.logger.debug(error)
