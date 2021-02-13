from flask import Flask, render_template, request, redirect
import os
import youtube_dl
from youtube_api import YouTubeDataAPI

app = Flask(__name__)
api_key = 'AIzaSyBiIPmB4raMcn-i7V4gfK6h9FusnHuK0Bw'

@app.route('/search', methods=['POST', 'FETCH'])
def upload():
    if request.method == "POST":
        yt = YouTubeDataAPI(api_key)

        searches = yt.search(q='bruh', max_results=5)
        print(searches)
        # ydl_opts = {'postprocessors': [{'key': 'FFmpegExtractAudio','preferredcodec': 'mp3','preferredquality': '192'}], 'outtmpl': 'Musics/%(title)s'+'.mp3'}
        # with youtube_dl.YoutubeDL(ydl_opts) as ydl:
        #     ydl.download(['https://www.youtube.com/watch?v=2ZIpFytCSVc'])
        print(request.form)
        return 'Hello'
    print("fetch")

