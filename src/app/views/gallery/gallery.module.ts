import { NoResultsComponent,   PhotoComponent,
} from './../../components';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { GalleryService } from './../../services/gallery.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryComponent } from '..';

import { MaterialModule } from '../.././material.module';
import { SrcPipeModule } from 'src/app/srcPipe.module';


@NgModule({
  declarations: [
    GalleryComponent,
    PhotoComponent,
    NoResultsComponent,
  ],
  imports: [
    SrcPipeModule,
    MaterialModule,
    CommonModule,
    GalleryRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    GalleryService
  ]
})
export class GalleryModule { }
