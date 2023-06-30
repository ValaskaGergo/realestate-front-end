# -*- coding: utf-8 -*-
from app import app
from flask import Blueprint, render_template

mod = Blueprint('i18n_module', __name__)


# -------- HU ----------------------------------------------------- #
@mod.route('/i18n/anlirealestate.hu.json', methods=['GET'])
def i18n_hu():
    return render_template('i18n/anlirealestate.hu.json')


# -------- EN ----------------------------------------------------- #
@mod.route('/i18n/anlirealestate.en.json', methods=['GET'])
def i18n_en():
    return render_template('i18n/anlirealestate.en.json')


# -------- DE ----------------------------------------------------- #
@mod.route('/i18n/anlirealestate.de.json', methods=['GET'])
def i18n_de():
    return render_template('i18n/anlirealestate.de.json')


# -------- FR ----------------------------------------------------- #
@mod.route('/i18n/anlirealestate.fr.json', methods=['GET'])
def i18n_fr():
    return render_template('i18n/anlirealestate.fr.json')


# -------- ES ----------------------------------------------------- #
@mod.route('/i18n/anlirealestate.es.json', methods=['GET'])
def i18n_es():
    return render_template('i18n/anlirealestate.es.json')

