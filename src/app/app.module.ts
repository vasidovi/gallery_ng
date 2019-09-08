import { GalleryService } from './services/gallery.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialFileInputModule } from 'ngx-material-file-input';



import {MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        MatDialogModule,
        MatCardModule,
        MatChipsModule,
        MatSelectModule,
        MatInputModule,
        MatProgressSpinnerModule } from '@angular/material';


import { AppComponent } from './app.component';
import { GalleryComponent } from './views/gallery/gallery.component';
import { ImageUploadComponent } from './views/image-upload/image-upload.component';
import { PhotoComponent } from './components/photo/photo.component';
import { PhotoDialogComponent } from './components/photo-dialog/photo-dialog.component';
import { ImageSrcPipe } from './pipes/image-src.pipe';
import { ImageEditComponent } from './views/image-edit/image-edit.component';
import { SignUpComponent } from './views/sign-up/sign-up.component';
import { SignInComponent } from './views/sign-in/sign-in.component';

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    PhotoComponent,
    PhotoDialogComponent,
    ImageUploadComponent,
    ImageSrcPipe,
    ImageEditComponent,
    SignUpComponent,
    SignInComponent,
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
    MatProgressSpinnerModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MaterialFileInputModule,
  ],
  providers: [GalleryService],
  bootstrap: [AppComponent],
  entryComponents: [PhotoDialogComponent]
})
export class AppModule { }
