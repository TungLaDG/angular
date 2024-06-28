import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/products';

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

  getProducts(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(this.apiUrl, { headers }).pipe(
      catchError(error => {
        return throwError('Error fetching products');
      })
    );
  }

  addProduct(product: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(this.apiUrl, product, { headers }).pipe(
      catchError(error => {
        return throwError('Error adding product');
      })
    );
  }

  updateProduct(id: string, product: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.apiUrl}/${id}`, product, { headers }).pipe(
      catchError(error => {
        return throwError('Error updating product');
      })
    );
  }

  deleteProduct(id: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError(error => {
        return throwError('Error deleting product');
      })
    );
  }
}
