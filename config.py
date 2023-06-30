# -*- coding: utf-8 -*-
import os

_basedir = os.path.abspath(os.path.dirname(__file__))
_static = os.path.join(_basedir, 'app/static')
_templates = os.path.join(_basedir, 'app/templates')


class Config(object):
    BRAND_NAME = "ANLI Breeders"
    VERSION = "v1.3-rc2"
    #: python -c "print(repr(__import__('os').urandom(24)))"
    SECRET_KEY = '\xb4u\xce0]\xa5\xc8\x8aa\x02\xc9DE8\x13\xabm\x084)=p\x92\x04'
    API_SECRET_KEY = '|\nrq\xe6\x8f8z\t\x9ex\x1a\x0c\xce\xd9\xd8\x03\xb0\xcf\x8a\xf2\xef'
    #: hashlib.sha256(os.urandom(32)).hexdigest()
    API_KEY = 'd330bd488282ed02d0256e0ee704114776dfd0b28ca1eb667a875193ca8d63d1'

    VATLAYER_API_URL = "https://apilayer.net/api"

    MAIL_SERVER = 'mail.elin.hu'
    MAIL_PORT = 587
    MAIL_USE_TLS = True

    ALLOWED_EXTENSIONS_IMG = {'png', 'jpg', 'JPG', 'JPEG'}
    ALLOWED_EXTENSIONS_VIDEO = {'mp4', 'avi', 'mov', 'webm', 'ogv', 'ogg'}
    ALLOWED_EXTENSIONS_PDF = {'pdf'}

    TMP_IMG_DIRECTORY = os.path.join(_static, 'images/tmp/')
    IMG_DIRECTORY = os.path.join(_static, 'images/')

    TMP_VIDEO_DIRECTORY = os.path.join(_static, 'videos/tmp/')
    VIDEO_DIRECTORY = os.path.join(_static, 'videos/')

    TMP_PDF_DIRECTORY = os.path.join(_static, 'pdf/tmp/')
    PDF_DIRECTORY = os.path.join(_static, 'pdf/')

    SOUND_DIRECTORY = os.path.join(_static, 'sounds/')

    FILTER_PRICE_MIN = 0
    FILTER_PRICE_MAX = 100000
    FILTER_PRICE_STEP = 100
    FILTER_AGE_MIN = 0
    FILTER_AGE_MAX = 150
    FILTER_AGE_STEP = 1
    FILTER_HEIGHT_MIN = 0
    FILTER_HEIGHT_MAX = 200
    FILTER_HEIGHT_STEP = 1

    # CACHE_TYPE = 'FileSystemCache'
    # CACHE_DIR = _static + '/caching'
    CACHE_TYPE = 'RedisCache'
    CACHE_REDIS_HOST = '127.0.0.1'
    CACHE_REDIS_PORT = 6379
    CACHE_REDIS_DB = 0
    CACHE_REDIS_URL = 'redis://127.0.0.1:6379/0'
    CACHE_DEFAULT_TIMEOUT = 300

    SUPPORTED_LANGUAGES = ["hu", "en", "de", "fr", "es"]


class ProductionConfig(Config):
    ENV = 'production'
    DEBUG = False
    TLS_VERIFY = True
    TEMPLATES_AUTO_RELOAD = False

    SITE_URL = "https://anlirealestate.com"

    MAX_CONTENT_LENGTH_IMG = 25 * 1024 * 1024  # 25 Megabytes
    PIL_IMAGE_MAX_IMAGE_PIXELS = 26214400  # 25 Megabytes

    MAX_CONTENT_LENGTH_VIDEO = 200 * 1024 * 1024  # 200 Megabytes

    MAX_CONTENT_LENGTH_PDF = 25 * 1024 * 1024  # 25 Megabytes

    VATLAYER_API_KEY = "d1faec9c29bf6cf008c45c153fc78572"

    BARION_API_URL = "https://api.test.barion.com"
    BARION_API_KEY = "d97e43d0ccdd42bcb29307ae9c8b85cb"
    BARION_PIXEL_ID = "BPT-Exfw7hzWQ8-93"
    BARION_ACCOUNT_EMAIL = "robotharcos981@gmail.com"

    DEEPL_API_KEY = "4a9d2826-79e9-b81b-0b79-7fe2309f17ae"

    MAIL_USERNAME = 'noreply@anlibreeders.com'
    MAIL_PASSWORD = 'cph6Nu4T6XbcPQE'
    MAIL_DEFAULT_SENDER = 'noreply@anlibreeders.com'

    TWITTER_API_KEY = "s5LSUqu7Hm18uGWUWLfRXv1Qk"
    TWITTER_API_KEY_SECRET = "qDn40lUIFcVF0gPbJSEgDQ7fguICgfwC63IeApDkKhiumOE7Wy"
    TWITTER_BEARER_TOKEN = "AAAAAAAAAAAAAAAAAAAAANnejQEAAAAAAQMthhLshEyY5PLRAvWx3kls7n0%3DZFqPX2DlS1GVCPVweXVZkfIjjVYAEw29PpNixqjGs7NX6iQplb"

    GOOGLE_API_KEY = "AIzaSyB8hAIdYpwMUIIlM2kGFWlIu8yBaVe6gWg"
    GOOGLE_CLIENT_ID = "737025616861-fglb0vhb68g951aa1cn8268v2adm5uf3.apps.googleusercontent.com"
    GOOGLE_CLIENT_SECRET = "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"
    GOOGLE_CLIENT_SECRET_PATH = os.path.join(_basedir,
                                             'app/views/youtube/credentials.storage')

    MAPBOX_TOKEN = "pk.eyJ1IjoiYW5saWRldmVsb3BlciIsImEiOiJjbGlvNjB5MjIwNXg3M2VwOGwwdW03aTc0In0.fEHIpWxHY8WYtU8OvXWPRQ"

    SERVER_URL = "https://anlirealestate.com"
    API_SERVER_URL = "https://api.anlirealestate.com"
    SOCKET_SERVER_URL = "https://socket.anlirealestate.com"
    CORS_ALLOWED_ORIGINS = "https://anlirealestate.com"


class DevelopmentConfig(Config):
    ENV = 'development'
    DEBUG = True
    TLS_VERIFY = False
    TEMPLATES_AUTO_RELOAD = True

    SITE_URL = "https://anlirealestate.com"

    MAX_CONTENT_LENGTH_IMG = 25 * 1024 * 1024  # 25 Megabytes
    PIL_IMAGE_MAX_IMAGE_PIXELS = 26214400  # 25 Megabytes

    MAX_CONTENT_LENGTH_VIDEO = 200 * 1024 * 1024  # 200 Megabytes

    MAX_CONTENT_LENGTH_PDF = 25 * 1024 * 1024  # 25 Megabytes

    VATLAYER_API_KEY = "d1faec9c29bf6cf008c45c153fc78572"

    BARION_API_URL = "https://api.test.barion.com"
    BARION_API_KEY = "d97e43d0ccdd42bcb29307ae9c8b85cb"
    BARION_PIXEL_ID = "BPT-Exfw7hzWQ8-93"
    BARION_ACCOUNT_EMAIL = "robotharcos981@gmail.com"

    DEEPL_API_KEY = "4a9d2826-79e9-b81b-0b79-7fe2309f17ae"

    MAIL_USERNAME = 'noreply@anlibreeders.com'
    MAIL_PASSWORD = 'cph6Nu4T6XbcPQE'
    MAIL_DEFAULT_SENDER = 'noreply@anlibreeders.com'

    TWITTER_API_KEY = "s5LSUqu7Hm18uGWUWLfRXv1Qk"
    TWITTER_API_KEY_SECRET = "qDn40lUIFcVF0gPbJSEgDQ7fguICgfwC63IeApDkKhiumOE7Wy"
    TWITTER_BEARER_TOKEN = "AAAAAAAAAAAAAAAAAAAAANnejQEAAAAAAQMthhLshEyY5PLRAvWx3kls7n0%3DZFqPX2DlS1GVCPVweXVZkfIjjVYAEw29PpNixqjGs7NX6iQplb"

    GOOGLE_API_KEY = "AIzaSyB8hAIdYpwMUIIlM2kGFWlIu8yBaVe6gWg"
    GOOGLE_CLIENT_ID = "737025616861-fglb0vhb68g951aa1cn8268v2adm5uf3.apps.googleusercontent.com"
    GOOGLE_CLIENT_SECRET = "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"
    GOOGLE_CLIENT_SECRET_PATH = os.path.join(_basedir,
                                             'app/views/youtube/credentials.storage')

    MAPBOX_TOKEN = "pk.eyJ1IjoiYW5saWRldmVsb3BlciIsImEiOiJjbGlvNjB5MjIwNXg3M2VwOGwwdW03aTc0In0.fEHIpWxHY8WYtU8OvXWPRQ"

    SERVER_URL = "https://anlirealestate.com"
    API_SERVER_URL = "https://api.anlirealestate.com"
    SOCKET_SERVER_URL = "https://socket.anlirealestate.com"
    CORS_ALLOWED_ORIGINS = "https://anlirealestate.com"

