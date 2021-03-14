from flask import Flask, render_template, request, redirect, jsonify, send_file, send_from_directory, safe_join, abort
import os
import youtube_dl
from youtube_api import YouTubeDataAPI

app = Flask(__name__)
api_key = 'AIzaSyA8Bz3_e58U3aCxZvNt2W9zyBgcVnzGLeU'

@app.route('/download', methods=['POST', "GET"])
def download():
    try:
        songs = os.listdir('static/Musics/')
        video_id = request.args.get('name')     
        fileName = video_id + '.mp3'
        if fileName not in songs:
            ydl_opts = {'postprocessors': [{'key': 'FFmpegExtractAudio','preferredcodec': 'mp3','preferredquality': '192'}], 'outtmpl': 'static/Musics/' + video_id}
            with youtube_dl.YoutubeDL(ydl_opts) as ydl:
                ydl.download(['https://www.youtube.com/watch?v=' + video_id])
        
        return app.send_static_file('Musics/{}.mp3'.format(video_id))
    except FileNotFoundError:   
        return abort(404)
        
@app.route('/search', methods=['POST'])
def search():
    if request.method == "POST":
        print(request.json)
        yt = YouTubeDataAPI(api_key)
        response = yt.search(request.json, max_results=5)
        return jsonify(response)



@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:4200')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Headers', 'Cache-Control')
    response.headers.add('Access-Control-Allow-Headers', 'X-Requested-With')
    response.headers.add('Access-Control-Allow-Headers', 'Authorization')
    response.headers.add('Access-Control-Allow-Headers', 'responseType')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
    return response
