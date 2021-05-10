import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Video } from '../Video';
import { Observable } from 'rxjs';
import { Playlist } from '../Playlist';

const url = 'http://35.215.31.219:5000/';


@Injectable({
    providedIn: 'root',
})

export class BackendService {
    public searchedSongs: Video[];
    public playlists: Playlist[];


    constructor(private httpClient: HttpClient) {
        this.searchedSongs = [];
        this.playlists = [];
    }

    public SearchForSong(keyword: string): void {
        this.searchedSongs = [];
        const params = new HttpParams({ fromString: 'keyword=' + keyword });
        this.httpClient.request('GET', url + '/search', { responseType: 'text', params }).subscribe(response => {
            const results = JSON.parse(response)
            this.searchedSongs = results['result'];
        });        
    }

    public DownloadFromServer(song: Video): Observable<Blob> {
        if(!song) {
            return new Observable;
        }
        const params = new HttpParams({ fromString: 'name=' + song.song_id });
        return this.httpClient.request('GET', url + '/download', { responseType: 'blob', params });
    }

    public GetPlaylists(): void {
        this.playlists = [];
        this.httpClient.request('GET', url + '/playlists', { responseType: 'text' }).subscribe(response => {
            this.playlists = JSON.parse(response);
        });
    }

    public CreatePlaylist(playlistName: string): void {
        const params = new HttpParams({ fromString: 'name=' + playlistName });
        this.httpClient.request('POST', url + '/add-playlist', { responseType: 'text' , params}).subscribe(response => {
            this.playlists.push(JSON.parse(response)[0]);
        });
    }

    public DeletePlaylist(playlist: Playlist): void {
        const params = new HttpParams({ fromString: 'name=' + playlist.playlist_id });
        this.httpClient.request('POST', url + '/rm-playlist', { responseType: 'text' , params}).subscribe(response => {
            const index = this.playlists.indexOf(playlist);
            if(index > -1) {
                this.playlists.splice(index, 1);
            }
        });
    }

    public GetSongsInPlaylist(playlist: Playlist, shouldShuffle: boolean): Observable<any> {
        const params = new HttpParams({ fromObject: { name: playlist.playlist_id.toString(), shuffle: String(shouldShuffle)} });
        return this.httpClient.request('GET', url + '/songs-playlist', { responseType: 'json', params });
    }

    public AddSongToPlaylist(playlist: Playlist, song: Video): void {
        let params = new HttpParams({ fromObject: {song: song.song_id, playlist: playlist.playlist_id.toString() }});
        this.httpClient.request('POST', url + '/add-song-playlist', { responseType: 'json', params }).subscribe(response => {
        });
    }

    public GetReadySongs(): Observable<Object> {
        return this.httpClient.request('GET', url + '/songs', { responseType: 'json' });
    }

    public DeleteSongFromPlaylist(song: Video, playlist: Playlist): void {
        let params = new HttpParams({ fromObject: {song: song.song_id, playlist: playlist.playlist_id.toString() }});
        this.httpClient.request('GET', url + '/rm-song-playlist', { responseType: 'json', params }).subscribe(response => {
            console.log(response)
        });
    }

    public ChangePlaylistTitle(newTitle: string, playlist: Playlist): Promise<Object> {
        let params = new HttpParams({ fromObject: {name: newTitle, id: playlist.playlist_id.toString() }});
        return this.httpClient.request('GET', url + '/set-title-playlist', { responseType: 'json', params }).toPromise();
    }

    public ChangeSongOrder(songs: Video[], playlist: Playlist): Promise<Object> {
        let params = new HttpParams({ fromObject: {playlist: playlist.playlist_id.toString() }});
        return this.httpClient.request('PATCH', url + '/set-song-order', {body: songs, responseType: 'json', params }).toPromise();
    }

}

