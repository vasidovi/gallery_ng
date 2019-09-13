import { UserService } from './user.service';
import { IUser } from './../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private userService: UserService,
              private cookie: CookieService) {}

login(user: IUser): Promise<any> {

  return new Promise((resolved, rejected) => {
    this.userService.signin(user).then(data => {
      this.cookie.set('role', JSON.parse(atob(data.token.split('.')[1])).scopes);
      this.cookie.set('token', data.token);
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
    console.log("token received");
    return true;
  } else {
    return false;
    }
  }
}
