import { UserService } from './user.service';
import { IUser } from './../models/user.model';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userService: UserService,
              private http: HttpClient,
              private cookie: CookieService) { }

  login(user: IUser): Promise<any> {

    return new Promise((resolved, rejected) => {
      this.userService.signin(user)
      .then(data => {
        this.cookie.set('token', data.access_token);
        this.cookie.set('refresh_token', data.refresh_token);
        resolved();
      }, rejected);
    });
  }

  logout(): void {
    this.cookie.delete('token');
    this.cookie.delete('refresh_token');
  }

  isAdmin(): boolean {
     return (JSON.parse(atob(this.cookie.get('token').split('.')[1])).authorities).includes('ROLE_ADMIN');
  }

  isLoggedIn(): boolean {
    if (this.cookie.get('token')) {
       if (!this._isTokenValid()) {
        //  this.refreshToken();
        this.logout();
        return false;
       }
       return true;
    } else {
      return false;
    }
  }

  refreshToken(): void {
    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');

    const base64Credential: string = btoa('testjwtclientid:XY7kmzoNzl100');
    const headers = new HttpHeaders({'Content-Type' : 'application/x-www-form-urlencoded',
    Authorization : 'Basic ' + base64Credential});

    this.http.post(environment.hostName + '/oauth/token',
      params.toString(), {headers}).toPromise().then(data => {
        // tslint:disable-next-line: no-string-literal
        this.cookie.set('token', data['access_token']);
        // tslint:disable-next-line: no-string-literal
        this.cookie.set('refresh_token', data['refresh_token']);
      });
  }

  private _isTokenValid(): boolean {

    const currentTimeInSeconds = new Date().getTime() / 1000;
    const expiration = +JSON.parse(atob(this.cookie.get('token').split('.')[1])).exp;
    return (expiration > currentTimeInSeconds) ? true : false;
  }
}
