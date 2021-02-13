import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Video } from '../Video';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MusicGetterService {


  constructor(private httpClient: HttpClient) {
    
  }

  /**
   * 
   */
  public SearchForSong(keyword: Video): Promise<Video> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8'
    });
    const body = JSON.stringify(keyword);
    const response = this.httpClient.post<Video>('http://localhost:5000/search', body, {
      headers: httpHeaders
    }).toPromise();
    console.log(response);
    return response;
  }
}
