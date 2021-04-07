import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Video } from '../Video';
import { Observable } from 'rxjs';
import { Playlist } from '../Playlist';

const url = 'http://localhost:5000';


@Injectable({
    providedIn: 'root',
})

export class MusicGetterService {
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

    public DownloadFromServer(video_id: string): Observable<Blob> {
        const params = new HttpParams({ fromString: 'name=' + video_id });
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
        this.httpClient.request('POST', url + '/add/playlist', { responseType: 'text' , params}).subscribe(response => {
            this.playlists.push(JSON.parse(response)[0]);
        });
    }

    public DeletePlaylist(playlist: Playlist): void {
        const params = new HttpParams({ fromString: 'name=' + playlist.playlist_id });
        this.httpClient.request('POST', url + '/rm/playlist', { responseType: 'text' , params}).subscribe(response => {
            const index = this.playlists.indexOf(playlist);
            if(index > -1) {
                this.playlists.splice(index, 1);
            }
        });
    }

    public GetSongsInPlaylist(playlist: Playlist): Observable<any> {
        const params = new HttpParams({ fromString: 'name=' + playlist.playlist_id });
        return this.httpClient.request('GET', url + '/playlists/songs', { responseType: 'json', params });
    }

    public AddSongToPlaylist(playlist: Playlist, song: Video): void {
        let params = new HttpParams({ fromObject: {song: song.song_id, playlist: playlist.playlist_id.toString() }});
        this.httpClient.request('POST', url + '/add/playlist/song', { responseType: 'json', params }).subscribe(response => {
        });
    }

    public GetReadySongs(): Observable<Object> {
        return this.httpClient.request('GET', url + '/songs', { responseType: 'json' });
    }

    public DeleteSongFromPlaylist(song: Video, playlist: Playlist): void {
        let params = new HttpParams({ fromObject: {song: song.song_id, playlist: playlist.playlist_id.toString() }});
        this.httpClient.request('GET', url + '/rm/playlist/song', { responseType: 'json', params }).subscribe(response => {
            console.log(response)
        });
    }

}

