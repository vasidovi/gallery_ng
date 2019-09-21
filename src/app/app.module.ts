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


import {
  MatAutocompleteModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatDialogModule,
  MatCardModule,
  MatChipsModule,
  MatSelectModule,
  MatInputModule,
  MatSnackBarModule,
  MatProgressSpinnerModule
} from '@angular/material';

import { AppComponent } from './app.component';

import {
  GalleryComponent,
  ImageUploadComponent,
  ImageEditComponent,
  SignUpComponent,
  SignInComponent
} from './views';

import {
  PhotoComponent,
  MenuComponent,
  FooterComponent,
  NoResultsComponent,
} from './components';

import { PhotoDialogComponent } from './dialogs/photo-dialog/photo-dialog.component';
import { ImageSrcPipe } from './pipes/image-src.pipe';
import { FirstLetterUppercasePipe } from './pipes/first-letter-uppercase.pipe';
import { DropZoneDirective } from './directives/dropzone.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PasswordMismatchDirective } from './directives/password-mismatch.directive';
import { DeleteConfirmDialogComponent } from './dialogs/delete-confirm-dialog/delete-confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    PhotoComponent,
    PhotoDialogComponent,
    ImageUploadComponent,
    ImageSrcPipe,
    FirstLetterUppercasePipe,
    ImageEditComponent,
    SignUpComponent,
    SignInComponent,
    DropZoneDirective,
    MenuComponent,
    PasswordMismatchDirective,
    DeleteConfirmDialogComponent,
    FooterComponent,
    NoResultsComponent,
  ],
  imports: [
    MatAutocompleteModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    MatSelectModule,
    MatChipsModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
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
  entryComponents: [PhotoDialogComponent, DeleteConfirmDialogComponent]
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
