from flask import Flask, render_template, request, redirect, jsonify, send_file, send_from_directory, safe_join, abort
import os
import youtube_dl
from youtubesearchpython import VideosSearch
from PSQLConnector import *
import psycopg2
from psycopg2.extras import RealDictCursor

app = Flask(__name__)

videos = []

@app.before_request
def activate_job():
    
    try:
        PSQLConnector.instance().connect()
    except Exception:
        print('Connected to the database')

@app.route('/download', methods=['GET'])
def download():
    try:
        songs = os.listdir('static/Musics/')
        video_id = request.args.get('name')     
        fileName = video_id + '.mp3'
        print(videos)
        if fileName not in songs:
            ydl_opts = {'postprocessors': [{'key': 'FFmpegExtractAudio','preferredcodec': 'mp3','preferredquality': '192'}], 'outtmpl': 'static/Musics/' + video_id}
            with youtube_dl.YoutubeDL(ydl_opts) as ydl:
                ydl.download(['https://www.youtube.com/watch?v=' + video_id])
            cursor = PSQLConnector.instance().conn.cursor()
            #cursor.execute("insert into songs values (%s, %s) on conflict (song_id,) do nothing", [video_id])
            cursor.execute("insert into songs values (%s) on conflict (song_id) do nothing", [video_id])

        return app.send_static_file('Musics/{}.mp3'.format(video_id))
    except Exception:  
        print('An internal error occured') 
        return abort(404)
        
@app.route('/search', methods=['GET'])
def search():
    try:
        keywords = request.args.get('keyword')
        print(keywords)
        videos = VideosSearch(keywords, limit=5).result()
        return videos
    except Exception:
        print('Search failed')
        return '100'

@app.route('/playlists', methods=['GET'])
def getPlaylist():
    cursor = PSQLConnector.instance().conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        cursor.execute("select * from playlists_users where user_id = '1'")
    except Exception:
        print('Could not retreive the songs')
        return '100'

    rows = cursor.fetchall()
    return jsonify(rows)

@app.route('/add/playlist', methods=['POST'])
def addPlaylist():
    cursor = PSQLConnector.instance().conn.cursor(cursor_factory=RealDictCursor)
    name = request.args.get('name')
    try:
        cursor.execute("insert into playlists_users(user_id, playlist_title) values (%s, %s)", [1, name])
        cursor.execute("select * from playlists_users where user_id = %s and playlist_title = %s", [1, name])

    except Exception:
        print('Could not insert the new playlist')
        return '100'
    rows = cursor.fetchall()
    return jsonify(rows)

@app.route('/rm/playlist', methods=['POST'])
def deletePlaylist():
    cursor = PSQLConnector.instance().conn.cursor()
    name = request.args.get('name')
    try:
        cursor.execute("delete from playlists_users where playlist_id = %s", [name])

    except Exception:
        print('Could not delete the playlist')
        return '100'

    return jsonify('200')

@app.route('/playlists/songs', methods=['GET'])
def getSongsInPlaylist():
    cursor = PSQLConnector.instance().conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        cursor.execute("select song_id from playlists_users where user_id = '1'")
    except Exception:
        print('Could not retreive the songs')
        return '100'

    rows = cursor.fetchall()
    return jsonify(rows)


@app.after_request
def after_request(response):
    PSQLConnector.instance().conn.commit()
    try:
        print('Closing connection')
        PSQLConnector.instance().conn.close()
    except Exception:
        print('An error occured while close the connection to the database')

    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:4200')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Headers', 'Cache-Control')
    response.headers.add('Access-Control-Allow-Headers', 'X-Requested-With')
    response.headers.add('Access-Control-Allow-Headers', 'Authorization')
    response.headers.add('Access-Control-Allow-Headers', 'responseType')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
    return response
