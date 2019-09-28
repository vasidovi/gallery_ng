import { ImageUploadComponent } from '..';

import { GalleryService } from '../../services/gallery.service';

import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../material.module';
import { FormComponentsModule } from '../../formComponets.module';
import { ImageUploadRoutingModule } from './image-upload.routing.module';
import { DirectivesModule } from './../../directives.module';
import { DropZoneDirective } from 'src/app/directives/dropzone.directive';
import { MaterialFileInputModule } from 'ngx-material-file-input';



@NgModule({
  declarations: [
    ImageUploadComponent,
    DropZoneDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialFileInputModule,
    MaterialModule,
    FormComponentsModule,
    ImageUploadRoutingModule,
    DirectivesModule,
  ],
  providers: [
    GalleryService,
  ],
})
export class ImageUploadModule { }
