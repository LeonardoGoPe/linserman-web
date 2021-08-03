import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser:any;
  public user = new BehaviorSubject<any>(null);
  private token: any;

  URL_API = 'http://127.0.0.1:8000/api'

  isLogged = false
  constructor(
    private router: Router,
    public http: HttpClient
  ){}

  apiLogin(credentials: any){
    let headers = new HttpHeaders(); 
    return this.http.post(this.URL_API+'/login', credentials, {headers: headers});
  }

  autoLogin() {
    const userData = localStorage.getItem('userData');
    if (!userData) {
      this.user.next(null);
      return;
    }
      this.user.next(userData);
  }
}
