import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { CookieService } from 'ngx-cookie-service';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from './../environments/environment';

import {
  GalleryService,
  AuthService,
  UserService
} from './services';

import { MaterialModule } from './material.module';
import { SrcPipeModule } from './srcPipe.module';
import { FormComponentsModule } from './formComponets.module';
import { DirectivesModule } from './directives.module';

import { AppComponent } from './app.component';

import {
  ImageUploadComponent,
  SignUpComponent,
  SignInComponent
} from './views';

import {
  MenuComponent,
  FooterComponent,
} from './components';

import { PhotoDialogComponent } from './dialogs/photo-dialog/photo-dialog.component';
import { FirstLetterUppercasePipe } from './pipes/first-letter-uppercase.pipe';
import { DropZoneDirective } from './directives/dropzone.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    PhotoDialogComponent,
    ImageUploadComponent,
    FirstLetterUppercasePipe,
    SignUpComponent,
    SignInComponent,
    DropZoneDirective,
    MenuComponent,
    FooterComponent,
  ],
  imports: [
    DirectivesModule,
    FormComponentsModule,
    SrcPipeModule,
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialFileInputModule,
    NgbModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: [environment.domainName],
        blacklistedRoutes: [ environment.hostName + '/signup',
        environment.hostName + '/images',  environment.hostName + '/catalogs',  environment.hostName + '/token/generate-token',
        environment.hostName + '/image/metadata/**',  environment.hostName + '/images/find'
       ],
      }
    })
  ],
  providers: [GalleryService, AuthService, UserService, CookieService],
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
