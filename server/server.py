from flask import g, Flask, render_template, request, redirect, jsonify, send_file, send_from_directory, safe_join, abort
from flask_cors import CORS
import json
import os
import youtube_dl
from youtubesearchpython import VideosSearch
from server_helper import ServerHelper
from psycopg2.extras import RealDictCursor
import traceback

app = Flask(__name__)

serverHelper = ServerHelper()

CORS(app)

@app.before_request
def activate_job():
    try:
        if not hasattr(g, 'db_conn'):
            g.db_conn = serverHelper.connect_db()

        
    except Exception as e:
        print(e)
        print('Connection to the database failed')

@app.route('/download', methods=['GET'])
def download():
    try:
       
        songs = os.listdir('static/Musics/')
        video_id = request.args.get('name')     
        fileName = video_id + '.mp3'
        if fileName not in songs:
            ydl_opts = {'postprocessors': [{'key': 'FFmpegExtractAudio','preferredcodec': 'mp3','preferredquality': '192'}], 'outtmpl': 'static/Musics/' + video_id}
            with youtube_dl.YoutubeDL(ydl_opts) as ydl:
                ydl.download(['https://www.youtube.com/watch?v=' + video_id])
            
        cursor = g.db_conn.cursor()
        serverHelper.addSongToDatabase(cursor, video_id)

        return app.send_static_file('Musics/{}.mp3'.format(video_id))
    except Exception as e:  
        print(traceback.format_exc())
        return abort(404)
        
@app.route('/search', methods=['GET'])
def search():
    try:
        keywords = request.args.get('keyword')
        videos = VideosSearch(keywords, limit=5).result()
        g.videos = videos['result']
        for vid in g.videos:
            # We need to change the field name 'id' to 'song_id' so it matches the name in the database. Otherwise we need to manipulate manually every value
            vid['song_id'] = vid.pop('id')

        return videos
    except Exception as e:
        print(e)
        return '100'

@app.route('/playlists', methods=['GET'])
def getPlaylist():
    cursor = g.db_conn.cursor(cursor_factory=RealDictCursor)
    try:
        cursor.execute("select * from playlists_users where user_id = '1'")
    except Exception:
        print('Could not retreive the songs')
        return '100'

    rows = cursor.fetchall()
    return jsonify(rows)

@app.route('/add-playlist', methods=['POST'])
def addPlaylist():
    cursor = g.db_conn.cursor(cursor_factory=RealDictCursor)
    name = request.args.get('name')
    try:
        cursor.execute("insert into playlists_users(user_id, playlist_title) values (%s, %s)", [1, name])
        cursor.execute("select * from playlists_users where user_id = %s and playlist_title = %s", [1, name])

    except Exception as e:
        print(e)
        print('Could not insert the new playlist')
        return '100'
    rows = cursor.fetchall()
    return jsonify(rows)

@app.route('/rm-playlist', methods=['POST'])
def deletePlaylist():
    cursor = g.db_conn.cursor()
    name = request.args.get('name')
    try:
        cursor.execute("delete from playlists_users where playlist_id = %s", [name])
        cursor.execute("delete from playlist_songs where playlist_id = %s", [name])

    except Exception:
        print('Could not delete the playlist')
        return '100'

    return jsonify('200')

@app.route('/songs-playlist', methods=['GET'])
def getSongsInPlaylist():
    cursor = g.db_conn.cursor(cursor_factory=RealDictCursor)
    name = request.args.get('name')
    shuffle = request.args.get('shuffle')
    try:
        if shuffle == 'true':
            cursor.execute("""select * from songs 
            left join playlists_songs on songs.song_id = playlists_songs.song_id 
            where playlists_songs.playlist_id = %s 
            order by RANDOM(), song_order""", 
            [name]
            )
        else:
            cursor.execute("""select * from songs 
            left join playlists_songs on songs.song_id = playlists_songs.song_id 
            where playlists_songs.playlist_id = %s 
            order by song_order""",
            [name]
            )
    except Exception as e:
        print(e)
        return '100'

    rows = cursor.fetchall()
    return jsonify(rows)

@app.route('/add-song-playlist', methods=['POST'])
def addSongToPlaylist():
    cursor = g.db_conn.cursor(cursor_factory=RealDictCursor)
    song = request.args.get('song')
    playlist = request.args.get('playlist')

    try:
        cursor.execute("""insert into playlists_songs(playlist_id, song_id, song_order) 
        values (%s, %s, (select MAX(song_order) + 1 from playlists_songs where playlist_id = %s)) 
        on conflict (playlist_id, song_id) do nothing""",
        [playlist, song, playlist]
        )
        serverHelper.addSongToDatabase(cursor, song)

    except Exception as e:
        print(e)
        return '100'

    return '200'

@app.route('/songs', methods=['GET'])
def GetReadySongs():
    cursor = g.db_conn.cursor(cursor_factory=RealDictCursor)
    try:
        cursor.execute("select * from songs")
        rows = cursor.fetchall()
    except Exception as e:
        print(e)
        return '100'

    return jsonify(rows)

@app.route('/rm-song-playlist', methods=['GET'])
def removeSongFromPlaylist():
    song = request.args.get('song')
    playlist = request.args.get('playlist')
    cursor = g.db_conn.cursor()
    try:
        cursor.execute("delete from playlists_songs where playlist_id = %s and song_id = %s", [playlist, song])
    except Exception as e:
        print(e)
        return '100'

    return '200'

@app.route('/set-title-playlist', methods=['GET'])
def changePlaylistTitle():
    playlist_name = request.args.get('name')
    playlist_id = request.args.get('id')
    cursor = g.db_conn.cursor()
    try:
        cursor.execute("update playlists_users set playlist_title = %s where playlist_id = %s", [playlist_name, playlist_id])
    except Exception as e:
        print(e)
        return '100'

    return '200'

@app.route('/set-song-order', methods=['PATCH'])
def changeSongOrder():
    playlist_id = request.args.get('playlist')
    songs = request.json
    cursor = g.db_conn.cursor()
    try:
        for i in range(len(songs)):
            cursor.execute("update playlists_songs set song_order = %s where playlist_id = %s and song_id = %s", [i, playlist_id, songs[i]['song_id']])
    except Exception as e:
        print(e)
        return '100'
    return '200'

@app.after_request
def after_request(response):
    g.db_conn.commit()
    try:
        serverHelper.close_db(g.db_conn)
        print('Closing connection')
    except Exception:
        print('An error occured while close the connection to the database')

    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:4200')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Headers', 'Cache-Control')
    response.headers.add('Access-Control-Allow-Headers', 'X-Requested-With')
    response.headers.add('Access-Control-Allow-Headers', 'Authorization')
    response.headers.add('Access-Control-Allow-Headers', 'responseType')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH')
    return response

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)