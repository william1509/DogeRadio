from flask import Flask, render_template, request, redirect, jsonify
import os
import youtube_dl
from youtube_api import YouTubeDataAPI

app = Flask(__name__)
api_key = 'AIzaSyA8Bz3_e58U3aCxZvNt2W9zyBgcVnzGLeU'


@app.route('/download', methods=['POST'])
def download():
    if request.method == "POST":
        try:
            print(request.json)
            ydl_opts = {'postprocessors': [{'key': 'FFmpegExtractAudio','preferredcodec': 'mp3','preferredquality': '192'}], 'outtmpl': 'Musics/%(title)s'}
            with youtube_dl.YoutubeDL(ydl_opts) as ydl:
                ydl.download(['https://www.youtube.com/watch?v=' + request.json])

            return jsonify("OK")
        except:
            return jsonify("NO")
        
@app.route('/search', methods=['POST'])
def search():
    if request.method == "POST":
        yt = YouTubeDataAPI(api_key)

        response = yt.search(q=request.data, max_results=5)

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
