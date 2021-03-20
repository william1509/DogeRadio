import psycopg2

class PSQLConnector(object):
    _instance = None
    conn = None
    def __init__(self):
        raise RuntimeError('Call instance() instead')

    @classmethod
    def instance(cls):
        if cls._instance is None:
            print('Creating new instance')
            cls._instance = cls.__new__(cls)
            # Put any initialization here.
        return cls._instance

    @classmethod
    def connect(self):
        try:
            self.conn = psycopg2.connect(database="spotify_no_ads", user = "dev", password = "1234", host = "127.0.0.1", port = "5432")
        except Exception:
            print('Could not connect to the database')
    @classmethod
    def close(self):
        self.conn.close()
        