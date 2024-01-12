import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/user';
  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    // console.log('Username:', credentials.username);
    // console.log('Password:', credentials.password);
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }
}
