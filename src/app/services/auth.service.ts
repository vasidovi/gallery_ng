import { UserService } from './user.service';
import { IUser } from './../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private userService: UserService,
              private cookie: CookieService) {}

login(user: IUser) {

  this.userService.signin(user).then(data => {
    console.log(data);
    this.cookie.set('role', JSON.parse(atob(data.token.split('.')[1])).scopes);
    this.cookie.set('token', data.token);
  }, (err) => {
    console.log(err);
    });
}

logout(): void {
  this.cookie.delete('token');
  this.cookie.delete('role');
}

isLoggedIn(): boolean {
  if (this.cookie.get('token')){
  return true;
  } else {
    return false;
  }

}
}
