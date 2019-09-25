import { UserService } from './user.service';
import { IUser } from './../models/user.model';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  sessionWarningCalled = false;

  constructor(private userService: UserService,
              private snackBar: MatSnackBar,
              private cookie: CookieService) { }

  login(user: IUser): Promise<any> {

    return new Promise((resolved, rejected) => {
      this.userService.signin(user).then(data => {
        this.cookie.set('token', data.token);
        this.sessionWarningCalled = false;
        resolved();
      }, rejected);
    });
  }

  logout(): void {
    this.cookie.delete('token');
    this.cookie.delete('role');
  }

  isAdmin(): boolean {
     return (JSON.parse(atob(this.cookie.get('token').split('.')[1])).scopes).includes('ROLE_ADMIN');
  }

  isLoggedIn(): boolean {
    if (this.cookie.get('token')) {
      return this._checkCookieExpiration();
    } else {
      return false;
    }
  }


  private _checkCookieExpiration(): boolean {

    const warnTimeInSeconds = 300;
    const currentTimeInSeconds = new Date().getTime() / 1000;
    const expiration = +JSON.parse(atob(this.cookie.get('token').split('.')[1])).exp;

    if (expiration > currentTimeInSeconds + warnTimeInSeconds) {
      return true;

    } else if (expiration > currentTimeInSeconds) {
      if (!this.sessionWarningCalled) {
        this.snackBar.open('Your session will end in ' + Math.round(expiration - currentTimeInSeconds) + ' seconds ', 'X', {
          duration: 2000,
        });
        this.sessionWarningCalled = true;
      }
      return true;
    } else {
      this.snackBar.open('Your session has ended logging out', 'X', {
        duration: 2000,
      });
      this.logout();
      return false;
    }
  }
}
