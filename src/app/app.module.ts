import { GalleryService } from './services/gallery.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import {ReactiveFormsModule} from "@angular/forms";
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';


import {MatIconModule,
        MatButtonModule,
        MatDialogModule,
        MatCardModule,
        MatChipsModule,
        MatSelectModule,
        MatProgressSpinnerModule } from '@angular/material';


import { AppComponent } from './app.component';
import { GalleryComponent } from './views/gallery/gallery.component';
import { PhotoComponent } from './components/photo/photo.component';
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
    FormsModule,
    FlexLayoutModule
  ],
  providers: [GalleryService],
  bootstrap: [AppComponent],
  entryComponents: [PhotoDialogComponent]
})
export class AppModule { }
