import psycopg2
from youtubesearchpython import VideosSearch

class ServerHelper(object):
    def connect_db(self):
        password = open('credentials.txt', 'r').read()
        return psycopg2.connect(database="doge-radio", user = "dev", password = password, host = "35.203.72.59")


    def close_db(self, db_connection):
        db_connection.close()

    def addSongToDatabase(self, cursor, song_id):
        # We get the results of the query. Because we limit to 1 element, we can simply access the first element of the result
        videosInfo = VideosSearch(song_id, limit=1).result()['result'][0]
        

        # We need to change the field name 'id' to 'song_id' so it matches the name in the database. Otherwise we need to manipulate manually every value
        videosInfo['song_id'] = videosInfo.pop('id')
        cursor.execute("insert into songs(song_id, title, publishedtime, duration, viewcount_short, viewcount_long, channel_id, thumbnail_url, description) values (%s, %s, %s, %s, %s, %s, %s, %s, %s) on conflict (song_id) do nothing",
        [videosInfo['song_id'],
         videosInfo['title'],
         videosInfo['publishedTime'],
         videosInfo['duration'],
         videosInfo['viewCount']['short'],
         videosInfo['viewCount']['text'],
         videosInfo['channel']['id'],
         videosInfo['thumbnails'][0]['url'],
         ''
        ])
        



