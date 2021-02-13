import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Video } from '../Video';

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
    this.httpClient.post<Video>('http://localhost:5000/search', body, {
      headers: httpHeaders
    }).toPromise().then(vid => {
      this.songs = this.songs.concat(vid);
    });
   
  }
}
