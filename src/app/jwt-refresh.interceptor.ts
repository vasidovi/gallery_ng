import { tap, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { AuthService } from './services';
import { catchError } from 'rxjs/operators';
import {EMPTY } from 'rxjs';
import { JwtInterceptor } from '@auth0/angular-jwt/src/jwt.interceptor';

@Injectable()
export class JwtRefreshInterceptor implements HttpInterceptor {

  refreshTokenInProgress = false;
  tokenRefreshedSource = new Subject();
  tokenRefreshed$ = this.tokenRefreshedSource.asObservable();

  constructor(public authService: AuthService, private jwtInterceptor: JwtInterceptor) { }

  refreshToken() {
    if (this.refreshTokenInProgress) {
      return new Observable(observer => {
        this.tokenRefreshed$.subscribe(() => {
          observer.next();
          observer.complete();
        });
      });
    } else {
      this.refreshTokenInProgress = true;

      return this.authService.refreshToken().pipe(
        tap(() => {
          this.refreshTokenInProgress = false;
          this.tokenRefreshedSource.next();
        }));
    }
  }

  logout() {
    this.authService.logout();
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {

    return next.handle(request).pipe(
      catchError(error => {
      if (error.status === 401) {
        return this.refreshToken().pipe(
          switchMap(() => {
            return this.jwtInterceptor.intercept(request, next);
          })).pipe(
          catchError(() => {
            this.logout();
            return EMPTY;
          }));
      }
      return throwError(error);
    }));
  }
}
