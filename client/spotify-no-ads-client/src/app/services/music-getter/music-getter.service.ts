import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MusicGetterService {


  constructor(private httpClient: HttpClient) {
    
  }

  /**
   * 
   */
  public async SearchForSong(keyword: string) {
    const response = this.httpClient.post('http://127.0.0.1:5000/search', {
      method: 'POST',
      body: keyword,
      headers: {'Content-Type': 'application/json; charset=UTF-8'} 
    }).toPromise();
    console.log(response);
  }
}
