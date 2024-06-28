import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth'; // Base URL for auth APIs

  constructor(private http: HttpClient, private storageService: StorageService) {}

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response?.data?.token) {
          this.storageService.setItem('token', response.data.token);
        }
      })
    );
  }

  register(newUser: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, newUser);
  }

  logout() {
    this.storageService.removeItem('token');
  }

  getToken(): string | null {
    return this.storageService.getItem('token');
  }
}
