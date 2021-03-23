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
    public songs: Video[];
    public playlists: Playlist[];


    constructor(private httpClient: HttpClient) {
        this.songs = [];
        this.playlists = [];
    }

    /**
     * 
     */
    public SearchForSong(keyword: string): void {
        this.songs = [];
        const params = new HttpParams({ fromString: 'keyword=' + keyword });
        this.httpClient.request('GET', url + '/search', { responseType: 'text', params }).subscribe(response => {
            const results = JSON.parse(response)
            this.songs = results['result'];
        });        
    }

    /**
     * name
     *
     */
    public DownloadFromServer(video_id: string): Observable<Blob> {
        const params = new HttpParams({ fromString: 'name=' + video_id });
        return this.httpClient.request('GET', url + '/download', { responseType: 'blob', params });
    }

    public GetPlaylists(): void {
        this.playlists = [];
        this.httpClient.request('GET', url + '/playlists', { responseType: 'text' }).subscribe(response => {
            console.log(response);

            this.playlists = JSON.parse(response);
            console.log(this.playlists)
        });
    }
}

