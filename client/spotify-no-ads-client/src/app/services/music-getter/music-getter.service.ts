import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Video } from '../Video';

const url = 'http://localhost:5000';


@Injectable({
    providedIn: 'root',
})

export class MusicGetterService {
    public songs: Video[];


    constructor(private httpClient: HttpClient) {
        this.songs = [];
    }

    /**
     * 
     */
    public SearchForSong(keyword: string): void {
        this.songs = [];
        const httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json; charset=UTF-8'
        });
        const body = JSON.stringify(keyword);
        console.log(body);
        this.httpClient.post<Video>(url + '/search', body, {
            headers: httpHeaders
        }).toPromise().then(vid => {
            this.songs = this.songs.concat(vid);
        });
    }

    /**
     * name
     *
     */
    public DownloadFromServer(video_id: string): void {

        const params = new HttpParams({ fromString: 'name=' + video_id });
        this.httpClient.request('GET', url + '/download', { responseType: 'blob', params }).toPromise().then(response => {
            console.log('RESPONSE' + response);
            var data_url = URL.createObjectURL(response);
            var player = document.getElementById('player') as HTMLAudioElement;
            player.setAttribute('src', data_url);
        });
    }
}

