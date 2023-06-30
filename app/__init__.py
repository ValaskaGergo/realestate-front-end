# -*- coding: utf-8 -*-
import os
from flask import Flask
from dotenv import load_dotenv, find_dotenv
import flask_assets
from flask_mail import Mail
from flask_caching import Cache
import urllib3

app = Flask(__name__)

env_file = find_dotenv(".env.template")
load_dotenv(env_file)
app.config.from_object(os.getenv('SERVER'))
# app.config.from_object('config.DevelopmentConfig')

assets = flask_assets.Environment()
assets.init_app(app)
mail = Mail(app)
cache = Cache(app)
cache.init_app(app)

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# ======== Register Views ======================================================================= #

# -------- ERROR HANDLER ------------------------------------------ #
from .views.utilities.error_handler import mod as error_handler_module

app.register_blueprint(error_handler_module)

# -------- I18N --------------------------------------------------- #
from .views.i18n import mod as i18n_module

app.register_blueprint(i18n_module)

# -------- CONTEXT PROCESSOR -------------------------------------- #
from .views.utilities.context_processor import mod as context_processor_module

app.register_blueprint(context_processor_module)

# -------- BEFORE REQUEST ----------------------------------------- #
from .views.utilities.before_request import mod as before_request_module

app.register_blueprint(before_request_module)

# -------- AFTER REQUEST ------------------------------------------ #
from .views.utilities.after_request import mod as after_request_module

app.register_blueprint(after_request_module)

# -------- INDEX -------------------------------------------------- #
from .views.index import mod as index_module

app.register_blueprint(index_module)

# -------- SIGN UP ------------------------------------------------ #
from .views.signup import mod as signup_module

app.register_blueprint(signup_module)

# -------- SIGN IN ------------------------------------------------ #
from .views.signin import mod as signin_module

app.register_blueprint(signin_module)

# -------- PASSWORD RESET ----------------------------------------- #
from .views.password_reset import mod as password_reset_module

app.register_blueprint(password_reset_module)

# -------- ADMIN SETTINGS ----------------------------------------- #
from .views.admin_settings import mod as admin_settings_module

app.register_blueprint(admin_settings_module)

# -------- USER MANAGEMENT ---------------------------------------- #
from .views.user_management import mod as user_management_module

app.register_blueprint(user_management_module)

# -------- BILLING AND SHIPPING ADDRESS ---------------------------- #
from .views.billing_and_shipping_address import mod as billing_and_shipping_address_module

app.register_blueprint(billing_and_shipping_address_module)

# -------- SECURITY ------------------------------------------------ #
from .views.security import mod as security_module

app.register_blueprint(security_module)

# -------- ACCOUNT PAYMENT ----------------------------------------- #
from .views.account_payment import mod as account_payment_module

app.register_blueprint(account_payment_module)

# -------- INVOICES ------------------------------------------------ #
from .views.invoices import mod as invoices_module

app.register_blueprint(invoices_module)

# -------- CATEGORY ------------------------------------------------ #
from .views.category import mod as category_module

app.register_blueprint(category_module)

# -------- ANIMAL -------------------------------------------------- #
from .views.animal import mod as animal_module

app.register_blueprint(animal_module)

# -------- NOTIFICATION -------------------------------------------- #
from .views.notification import mod as notification_module

app.register_blueprint(notification_module)

# -------- FILTER -------------------------------------------------- #
from .views.filter import mod as filter_module

app.register_blueprint(filter_module)

# -------- FULL PAGE -------------------------------------------------- #
from .views.full_page import mod as full_page_module

app.register_blueprint(full_page_module)

# -------- RATING ----------------------------------------------------- #
from .views.rating import mod as rating_module

app.register_blueprint(rating_module)

# -------- Questions And Answers ----------------------------------------------------- #
from .views.questions_and_answers import mod as questions_and_answers_module

app.register_blueprint(questions_and_answers_module)

# -------- Talking ------------------------------------------------------------------- #
from .views.talking import mod as talking_module

app.register_blueprint(talking_module)

# -------- Translate ----------------------------------------------------------------- #
from .views.translate import mod as translate_module

app.register_blueprint(translate_module)

# -------- Status --------------------------------------------------------------------- #
from .views.status import mod as status_module

app.register_blueprint(status_module)

# ======== Assets =============================================================================== #
if app.config['ENV'] == 'production':
    app.config['ASSETS_DEBUG'] = False
else:
    app.config['ASSETS_DEBUG'] = True

# -------- CSS ---------------------------------------------------- #
css = flask_assets.Bundle(
    'node_modules/bootstrap/dist/css/bootstrap.css',
    'node_modules/perfect-scrollbar/css/perfect-scrollbar.css',
    'node_modules/bootstrap-steps/dist/bootstrap-steps.css',
    'node_modules/formstone/dist/css/checkbox.css',
    'node_modules/formstone/dist/css/upload.css',
    'node_modules/bootstrap-select/dist/css/bootstrap-select.css',
    'node_modules/cropperjs/dist/cropper.min.css',
    'node_modules/treeflex/dist/css/treeflex.css',
    # 'node_modules/@fancyapps/ui/dist/fancybox.css',
    'node_modules/nouislider/dist/nouislider.min.css',
    'node_modules/jquery-toast-plugin/dist/jquery.toast.min.css',
    'stylesheets/app.less',
    depends=[
        'stylesheets/less/*.less',
    ],
    filters='less, rcssmin' if app.config['ENV'] == 'production' else 'less',
    output='build/bundle.min.css'
)
assets.register('css', css)

# -------- JS ----------------------------------------------------- #
js = flask_assets.Bundle(
    'node_modules/jquery/dist/jquery.js',
    'node_modules/@wikimedia/jquery.i18n/src/jquery.i18n.js',
    'node_modules/@wikimedia/jquery.i18n/src/jquery.i18n.messagestore.js',
    'node_modules/@wikimedia/jquery.i18n/src/jquery.i18n.fallbacks.js',
    'node_modules/@wikimedia/jquery.i18n/src/jquery.i18n.parser.js',
    'node_modules/@wikimedia/jquery.i18n/src/jquery.i18n.emitter.js',
    'node_modules/@wikimedia/jquery.i18n/src/jquery.i18n.emitter.bidi.js',
    'node_modules/@wikimedia/jquery.i18n/src/jquery.i18n.language.js',
    'node_modules/@wikimedia/jquery.i18n/src/languages/hu.js',
    'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
    'node_modules/formstone/dist/js/core.js',
    'node_modules/formstone/dist/js/mediaquery.js',
    'node_modules/formstone/dist/js/checkbox.js',
    'node_modules/formstone/dist/js/upload.js',
    'node_modules/bootstrap-select/dist/js/bootstrap-select.js',
    'node_modules/cropperjs/dist/cropper.min.js',
    'javascripts/utilities/anlibreeders.serializeObject.js',
    'javascripts/utilities/jquery.easing.min.js',
    'node_modules/numbro/dist/languages.min.js',
    'node_modules/wnumb/wNumb.min.js',
    'node_modules/nouislider/dist/nouislider.min.js',
    # 'node_modules/waypoints/lib/jquery.waypoints.min.js',
    # 'node_modules/waypoints/lib/shortcuts/inview.min.js',
    # 'node_modules/waypoints/lib/shortcuts/infinite.min.js',
    # 'node_modules/waypoints/lib/waypoints.debug.js',
    'node_modules/jquery-toast-plugin/dist/jquery.toast.min.js',
    'javascripts/bundle/bundle.js',
    filters="rjsmin" if app.config['ENV'] == 'production' else None,
    output='build/bundle.min.js'
)
assets.register('js', js)
