import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8'
    });
    const body = JSON.stringify(keyword);
    this.httpClient.post<Video>(url + '/search', body, {
      headers: httpHeaders
    }).toPromise().then(vid => {
      this.songs = this.songs.concat(vid);
    });
  }

  /**
   * name
   */
  public DownloadFromServer(video_id: string): void {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8'
    });
    const body = JSON.stringify(video_id);
    this.httpClient.post(url + '/download', body, {
      headers: httpHeaders
    }).toPromise().then(vid => {
      console.log(vid);
    });
  }
}
