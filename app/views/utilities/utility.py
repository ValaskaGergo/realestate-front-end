# -*- coding: utf-8 -*-
from app import app
import jwt
import secrets


class EncodedJWT(object):
    @staticmethod
    def encoded(data):
        encoded = jwt.encode(data, app.config['API_SECRET_KEY'], algorithm='HS256')
        return encoded


class DecodeJWT(object):
    @staticmethod
    def decode(data):
        decode = jwt.decode(data, app.config['API_SECRET_KEY'], algorithms=['HS256'])
        return decode


class SecretKey(object):
    @staticmethod
    def secret_key(number):
        return secrets.token_hex(number)


class File(object):
    @staticmethod
    def allowed_file(filename):
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS_IMG']


class FileVideo(object):
    @staticmethod
    def allowed_file(filename):
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS_VIDEO']


class FilePDF(object):
    @staticmethod
    def allowed_file(filename):
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS_PDF']
