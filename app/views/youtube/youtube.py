# -*- coding: utf-8 -*-
from app import app
from flask import json
import http.client
import httplib2
import requests
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
from oauth2client.file import Storage
from slugify import slugify

httplib2.RETRIES = 1

MAX_RETRIES = 10

RETRIABLE_EXCEPTIONS = (httplib2.HttpLib2Error, IOError, http.client.NotConnected,
                        http.client.IncompleteRead, http.client.ImproperConnectionState,
                        http.client.CannotSendRequest, http.client.CannotSendHeader,
                        http.client.ResponseNotReady, http.client.BadStatusLine)

RETRIABLE_STATUS_CODES = [500, 502, 503, 504]

CLIENT_SECRETS_FILE = app.config['GOOGLE_CLIENT_SECRET_PATH']

SCOPES = ['https://www.googleapis.com/auth/youtube.upload']
API_SERVICE_NAME = 'youtube'
API_VERSION = 'v3'

VALID_PRIVACY_STATUSES = ('public', 'private', 'unlisted')


class YouTube(object):
    @staticmethod
    def get_authenticated_service():
        storage = Storage(CLIENT_SECRETS_FILE)
        credentials = storage.get()
        return build(API_SERVICE_NAME, API_VERSION, credentials=credentials)

    @staticmethod
    def upload(animal_id, file, youtube_cover, category_name, subcategory_name):
        url = app.config['API_SERVER_URL'] + "/youtube-upload"
        headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
        payload = {
            "animal_id": animal_id
        }
        r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

        if r.status_code == 200:
            data = r.json()

            youtube_video_id = data['youtube_video_id']
            title = data['title']
            animal_id = data['animal_id']

            youtube = YouTube.get_authenticated_service()

            videos_list_request = youtube.videos().list(
                part="snippet,contentDetails,statistics",
                id=str(youtube_video_id)
            ).execute()

            if videos_list_request['items'] != []:
                videos_delete_request = youtube.videos().delete(
                    id=str(youtube_video_id)
                ).execute()

            videos_insert_request = youtube.videos().insert(
                part="snippet,status",
                body={
                    "snippet": {
                        "title": title + " | " + category_name + " (" + subcategory_name + ") For Sale",
                        "description": 'Additional Information\n' \
                                       'https://anlirealestate.com/' + slugify(category_name) + "/" + slugify(
                            subcategory_name) + "/" + slugify(title) + "/" + str(animal_id) + '\n\n' \
                                                                                              'Discover ANLI House\n' \
                                                                                              'https://anlihouse.com\n\n' \
                                                                                              'Discover ANLI Breeders\n' \
                                                                                              'https://anlirealestate.com\n\n' \
                                                                                              'Discover ANLI Auction\n' \
                                                                                              'https://anliauction.com',
                        "categoryId": "15",
                        "tags": [category_name, subcategory_name, "Sale"]
                    },
                    "status": {
                        "privacyStatus": "public",
                        'selfDeclaredMadeForKids': False,
                    }
                },
                media_body=MediaFileUpload(file)
            ).execute()

            youtube_video_id = videos_insert_request.get('id')

            thumbnails_set_request = youtube.thumbnails().set(
                videoId=youtube_video_id,
                media_body=MediaFileUpload(youtube_cover)
            ).execute()

            playlistitems_insert_request = youtube.playlistItems().insert(
                part="snippet",
                body={
                    "snippet": {
                        "playlistId": "PLQronDiGxn_vRdaDG43nEm1xgDjxc6zLW",
                        "resourceId": {
                            "kind": 'youtube#video',
                            "videoId": youtube_video_id
                        }
                    }
                }
            ).execute()

            url = app.config['API_SERVER_URL'] + "/youtube-id"
            headers = {'X-Api-Key': app.config['API_KEY'], "Content-Type": "application/json"}
            payload = {
                "animal_id": animal_id,
                "youtube_video_id": youtube_video_id
            }
            r = requests.post(url, headers=headers, data=json.dumps(payload), verify=app.config['TLS_VERIFY'])

            if r.status_code == 200:
                data = r.json()

    @staticmethod
    def update(animal_id, youtube_video_id, title,  category_name, subcategory_name,
               youtube_video_status):

        youtube = YouTube.get_authenticated_service()

        if youtube_video_status == "private":
            privacy_status = "private"
        elif youtube_video_status == "public":
            privacy_status = "public"
        else:
            privacy_status = "unlisted"

        videos_update_request = youtube.videos().update(
            part="snippet,status",
            body={
                "id": str(youtube_video_id),
                "snippet": {
                    "title":title + " | " + category_name + " (" + subcategory_name + ") For Sale",
                    "description": 'Additional Information\n' \
                                   'https://anlirealestate.com/' + slugify(category_name) + "/" + slugify(
                        subcategory_name) + "/" + slugify(title) + "/" + str(animal_id) + '\n\n' \
                                                                                          'Discover ANLI House\n' \
                                                                                          'https://anlihouse.com\n\n' \
                                                                                          'Discover ANLI Breeders\n' \
                                                                                          'https://anlirealestate.com\n\n' \
                                                                                          'Discover ANLI Auction\n' \
                                                                                          'https://anliauction.com',
                    "categoryId": "15",
                    "tags": [category_name, subcategory_name, "Sale"]
                },
                "status": {
                    "privacyStatus": privacy_status,
                    'selfDeclaredMadeForKids': False,
                }
            },
        ).execute()

    @staticmethod
    def delete(youtube_video_id):

        youtube = YouTube.get_authenticated_service()

        if youtube is not None:
            try:
                videos_delete_request = youtube.videos().delete(
                    id=str(youtube_video_id)
                ).execute()
            except:
                pass
