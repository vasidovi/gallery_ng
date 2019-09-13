import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { CookieService } from 'ngx-cookie-service';
import { JwtModule } from '@auth0/angular-jwt';


import {
  GalleryService,
  AuthService,
  UserService
} from './services';


import {
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
} from './components';

import { PhotoDialogComponent } from './dialogs/photo-dialog/photo-dialog.component';
import { ImageSrcPipe } from './pipes/image-src.pipe';
import { DropZoneDirective } from './directives/dropzone.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    PhotoComponent,
    PhotoDialogComponent,
    ImageUploadComponent,
    FileUploadComponent,
    ImageSrcPipe,
    ImageEditComponent,
    SignUpComponent,
    SignInComponent,
    DropZoneDirective,
    MenuComponent,
  ],
  imports: [
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
    FlexLayoutModule,
    MaterialFileInputModule,
    NgbModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function  tokenGetter() {

          function getCookie(cname) {
            const name = cname + '=';
            const decodedCookie = decodeURIComponent(document.cookie);
            const ca = decodedCookie.split(';');
            for (let c of ca) {
              while (c.charAt(0) === ' ') {
                c = c.substring(1);
              }
              if (c.indexOf(name) === 0) {
                console.log(c);

                return c.substring(name.length, c.length);
              }
            }
            return '';
          }

          return getCookie('token');},
        whitelistedDomains: ['localhost:8080'],
        blacklistedRoutes: [ 'http://localhost:8080/signup',
        'http://localhost:8080/images', 'http://localhost:8080/catalogs', 'http://localhost:8080/token/generate-token',
        'http://localhost:8080/image/metadata/**', 'http://localhost:8080/images/find'
       ],
      }
    })
  ],
  providers: [GalleryService, AuthService, UserService, CookieService],
  bootstrap: [AppComponent],
  entryComponents: [PhotoDialogComponent]
})
export class AppModule { }
