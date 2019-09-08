import { Injectable } from '@angular/core';
import { IUser } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  register(user: IUser): Promise<IUser> {
    return this.http.post<IUser>('http://localhost:8080/signup', user).toPromise();
  }

  signin(user: IUser): Promise<IUser> {
    return this.http.post<IUser>('http://localhost:8080/token/generate-token', user).toPromise();
  }

  checkIfUsernameExists(userName: string) : any {
    return this.http.get('http://localhost:8080/usename/' + userName).toPromise();
  }

}