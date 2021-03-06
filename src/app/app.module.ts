import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { CookieService } from 'ngx-cookie-service';
import { JwtModule } from '@auth0/angular-jwt';
import { JwtInterceptor } from '@auth0/angular-jwt/src/jwt.interceptor';
import { environment } from './../environments/environment';

import { MaterialModule } from './material.module';
import { SrcPipeModule } from './srcPipe.module';

import { AppComponent } from './app.component';

import {
  MenuComponent,
  FooterComponent,
} from './components';

import { PhotoDialogComponent } from './dialogs/photo-dialog/photo-dialog.component';
import { FirstLetterUppercasePipe } from './pipes/first-letter-uppercase.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwtRefreshInterceptor } from './jwt-refresh.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    PhotoDialogComponent,
    FirstLetterUppercasePipe,
    MenuComponent,
    FooterComponent,
  ],
  imports: [
    SrcPipeModule,
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: [environment.domainName],
        blacklistedRoutes: [ environment.hostName + '/signup',  environment.hostName + '/tags',
        environment.hostName + '/oauth/token',
        environment.hostName + '/images',  environment.hostName + '/catalogs',
        environment.hostName + '/image/metadata/**',  environment.hostName + '/images/find'
       ],
      }
    })
  ],
  providers: [CookieService,
    JwtInterceptor, // Providing JwtInterceptor allow to inject JwtInterceptor manually into RefreshTokenInterceptor
      {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtRefreshInterceptor,
        multi: true
      }
    ],
  bootstrap: [AppComponent],
  entryComponents: [PhotoDialogComponent]
})
export class AppModule { }

export function tokenGetter() {

  function getCookie(cookieName) {
    const name = cookieName + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let cookieElement of cookieArray) {
      while (cookieElement.charAt(0) === ' ') {
        cookieElement = cookieElement.substring(1);
      }
      if (cookieElement.indexOf(name) === 0) {
        return cookieElement.substring(name.length, cookieElement.length);
      }
    }
    return '';
  }
  return getCookie('token');
}
