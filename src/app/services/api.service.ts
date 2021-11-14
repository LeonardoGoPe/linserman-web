import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    
  //URL_API = 'http://127.0.0.1:8000/api/'
  URL_API = 'https://linserman.pythonanywhere.com/api/'
  
  constructor(
    private http: HttpClient
  ) { }
  
  ApiCall(endpoint: any, method: any, data?: any, data2?: any) {
      const headers = new HttpHeaders({ 
        "Content-Type": "application/json", 
        "Authorization": "Token " + localStorage.getItem('token')
      });

      const headers2 = new HttpHeaders({
        'Content-Type':'multipart/form-data',  
        "Authorization": "Token " + localStorage.getItem('token')
      });

      switch (method) {
          case "GET":
              return this.http.get(this.URL_API + endpoint, { headers: headers , params: data })
          case "POST":
              return this.http.post(this.URL_API + endpoint, data, { headers: headers , params : data2 });
          case "PUT":
              return this.http.put(this.URL_API + endpoint, data, { headers: headers , params : data2  });
          case "PUTMULT":
              return this.http.put(this.URL_API + endpoint, data, { headers: headers , params : data2  });
          case "DELETE":
              return this.http.delete(this.URL_API + endpoint, { headers: headers, params: data });
      }
      return null;
  }
}
