import { Injectable } from '@angular/core';
import { IUser } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  register(user: IUser): Promise<IUser> {
    return this.http.post<IUser>(environment.hostName + '/signup', user).toPromise();
  }

  signin(user: IUser): Promise<any> {
    const params = new URLSearchParams();
    params.append('username', user.username);
    params.append('password', user.password);
    params.append('grant_type', 'password');

    // todo save client name and secret as enviroment settings

    const base64Credential: string = btoa('testjwtclientid:XY7kmzoNzl100');
    const headers = new HttpHeaders({'Content-Type' : 'application/x-www-form-urlencoded',
    Authorization : 'Basic ' + base64Credential});

    return this.http.post(environment.hostName + '/oauth/token',
      params.toString(), {headers}).toPromise();
  }



  checkIfUsernameExists(userName: string): any {
    return this.http.get(environment.hostName + '/usename/' + userName).toPromise();
  }

}
