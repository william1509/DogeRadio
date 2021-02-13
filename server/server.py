from flask import Flask, render_template, request, redirect, jsonify
import os
import youtube_dl
from youtube_api import YouTubeDataAPI

app = Flask(__name__)
api_key = 'AIzaSyBiIPmB4raMcn-i7V4gfK6h9FusnHuK0Bw'

@app.route('/search', methods=['POST'])
def search():
    if request.method == "POST":
        keyword = request.json['name']
        response = {'name': keyword}
        # yt = YouTubeDataAPI(api_key)

        # searches = yt.search(q='bruh', max_results=5)
        # print(searches)
        # ydl_opts = {'postprocessors': [{'key': 'FFmpegExtractAudio','preferredcodec': 'mp3','preferredquality': '192'}], 'outtmpl': 'Musics/%(title)s'+'.mp3'}
        # with youtube_dl.YoutubeDL(ydl_opts) as ydl:
        #     ydl.download(['https://www.youtube.com/watch?v=2ZIpFytCSVc'])
        # print(request.form)

        return jsonify(response)

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:4200')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Headers', 'Cache-Control')
    response.headers.add('Access-Control-Allow-Headers', 'X-Requested-With')
    response.headers.add('Access-Control-Allow-Headers', 'Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
    return response

