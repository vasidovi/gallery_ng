import { Injectable } from '@angular/core';
import { IUser } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

import * as Globals from './../globals/globals';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  register(user: IUser): Promise<IUser> {
    return this.http.post<IUser>( Globals.hostName + '/signup', user).toPromise();
  }

  signin(user: IUser): Promise<any> {
    return this.http.post<IUser>( Globals.hostName + '/token/generate-token', user).toPromise();
  }

  checkIfUsernameExists(userName: string): any {
    return this.http.get( Globals.hostName + '/usename/' + userName).toPromise();
  }

}
