import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getToken(): string {
    return localStorage.getItem('token');
  }

  logIn(email: string, password: string): Observable<any> {
    const url = `${environment.apiUrl}/login`;
    return this.http.post<User>(url, {email, password});
  }

  register(email: string, password: string): Observable<User> {
    const url = `${environment.apiUrl}/register`;
    return this.http.post<User>(url, {email, password});
  }
}
