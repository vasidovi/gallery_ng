import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: boolean;

  constructor() { }

  login(): void {
    this.authState = true;
  }

  logout(): void {
    this.authState = false;
  }

  isLoggedIn(): boolean {
    return this.authState;
  }
}