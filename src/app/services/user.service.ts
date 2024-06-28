import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('No token found');
    }

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getUsers(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(this.apiUrl, { headers });
  }

  createUser(user: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(this.apiUrl, user, { headers });
  }

  updateUser(id: string, user: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.apiUrl}/${id}`, user, { headers });
  }

  deleteUser(id: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers });
  }
}
