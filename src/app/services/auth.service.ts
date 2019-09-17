import { UserService } from './user.service';
import { IUser } from './../models/user.model';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userService: UserService,
              private _snackBar: MatSnackBar,
              private cookie: CookieService) {}


sessionWarningCalled = false;

login(user: IUser): Promise<any> {

  return new Promise((resolved, rejected) => {
    this.userService.signin(user).then(data => {
      this.cookie.set('role', JSON.parse(atob(data.token.split('.')[1])).scopes);
      this.cookie.set('token', data.token);

      // expiration time in seconds
      this.cookie.set('exp', JSON.parse(atob(data.token.split('.')[1])).exp);
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

return this.cookie.get('role') === 'ROLE_ADMIN';
}

isLoggedIn(): boolean {
  if (this.cookie.get('token')){
    const warnTimeInSeconds = 300;
    const currentTimeInSeconds = new Date().getTime() / 1000;
    if ( +this.cookie.get('exp') > currentTimeInSeconds + warnTimeInSeconds){
      return true;

    } else if (+this.cookie.get('exp') > currentTimeInSeconds){
      if (!this.sessionWarningCalled){
      this._snackBar.open( 'Your session will end in ' +  Math.round(+this.cookie.get('exp') - currentTimeInSeconds) + ' seconds ', 'X', {
        duration: 2000,
      });
      this.sessionWarningCalled = true;
    }
      return true;
    } else {
      this._snackBar.open( 'Your session has ended logging out' , 'X', {
        duration: 2000,
      });
      this.logout();
      return false;
    }
  } else {
    return false;
    }
  }
}
