import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {}

  setItem(key: string, value: string): void {
    if (this.isBrowser()) {
      sessionStorage.setItem(key, value);
    }
  }

  getItem(key: string): string | null {
    if (this.isBrowser()) {
      return sessionStorage.getItem(key);
    }
    return null;
  }

  removeItem(key: string): void {
    if (this.isBrowser()) {
      sessionStorage.removeItem(key);
    }
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof sessionStorage !== 'undefined';
  }
}
