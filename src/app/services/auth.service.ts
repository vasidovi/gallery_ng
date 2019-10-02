import { IUser } from './../models/user.model';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private cookie: CookieService) { }


  login(user: IUser): Promise<any> {
    const params = new URLSearchParams();
    params.append('username', user.username);
    params.append('password', user.password);
    params.append('grant_type', 'password');

    const headers = this._setAuthorizationHeaders();

    return this.http.post(environment.hostName + '/oauth/token',
      params.toString(), { headers }).toPromise().then(data => {
        this._setCookies(data);
      });
  }

  logout(): void {
    this.cookie.delete('token');
    this.cookie.delete('refresh_token');
  }

  isAdmin(): boolean {
  return (this.cookie.get('token')) ?
    (JSON.parse(atob(this.cookie.get('token').split('.')[1])).authorities).includes('ROLE_ADMIN') : false;
  }

  isLoggedIn(): boolean { return this.cookie.get('token') ? true : false; }

  refreshToken(): Observable<any> {
    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', this.cookie.get('refresh_token'));

    const headers = this._setAuthorizationHeaders();

    return this.http.post(environment.hostName + '/oauth/token',
      params.toString(), { headers }).pipe(
        tap(data => {
          this._setCookies(data);
        }));
  }

  register(user: IUser): Promise<IUser> {
    return this.http.post<IUser>(environment.hostName + '/signup', user).toPromise();
  }

  private _setAuthorizationHeaders(): HttpHeaders {
    const base64Credential: string = btoa(environment.clientName + ':' + environment.clientPassword);
    return new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + base64Credential
    });
  }

  private _setCookies(data): void {
    this.cookie.set('token', data.access_token);
    this.cookie.set('refresh_token', data.refresh_token);
  }
}
