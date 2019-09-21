import { Injectable } from '@angular/core';
import { IUser } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  register(user: IUser): Promise<IUser> {
    return this.http.post<IUser>( environment.hostName + '/signup', user).toPromise();
  }

  signin(user: IUser): Promise<any> {
    return this.http.post<IUser>( environment.hostName + '/token/generate-token', user).toPromise();
  }

  checkIfUsernameExists(userName: string): any {
    return this.http.get( environment.hostName + '/usename/' + userName).toPromise();
  }

}
