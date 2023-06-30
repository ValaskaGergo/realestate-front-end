# -*- coding: utf-8 -*-
from app import app
from flask import Blueprint
from flask import render_template, redirect, request

mod = Blueprint('error_handler', __name__)


# ======== Error Handler ========================================================================= #

# -------- 404 ---------------------------------------------- #
@app.errorhandler(404)
def not_found(error):
    return render_template('errorhandler/404.jinja2', error=error), 404


# -------- 500 ---------------------------------------------- #
@app.errorhandler(500)
def not_found(error):
    #  return redirect("/")
    return render_template('errorhandler/500.jinja2', error=error), 500
