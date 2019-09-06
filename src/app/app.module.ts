import { GalleryService } from './services/gallery.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {MatIconModule,
        MatButtonModule,
        MatDialogModule,
        MatCardModule,
        MatChipsModule,
        MatSelectModule,
        MatProgressSpinnerModule } from '@angular/material';

import {} from '@angular/material/dialog';

import {ReactiveFormsModule} from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GalleryComponent } from './views/gallery/gallery.component';
import { PhotoComponent } from './components/photo/photo.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PhotoDialogComponent } from './components/photo-dialog/photo-dialog.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { ImageSrcPipe } from './pipes/image-src.pipe';

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    PhotoComponent,
    PhotoDialogComponent,
    ImageUploadComponent,
    ImageSrcPipe,
  ],
  imports: [
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [GalleryService],
  bootstrap: [AppComponent],
  entryComponents: [PhotoDialogComponent]
})
export class AppModule { }
