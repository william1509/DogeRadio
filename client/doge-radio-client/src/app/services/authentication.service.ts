import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { 
    let session_id = localStorage.getItem('session_id');
    if(!session_id) {
      localStorage.setItem('session_id', uuidv4());
    }
  }
}
