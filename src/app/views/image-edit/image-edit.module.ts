import { DirectivesModule } from './../../directives.module';
import { ImageEditComponent } from './image-edit.component';
import { ImageEditRoutingModule } from './image-edit-routing.module';

import { GalleryService } from '../../services/gallery.service';
import { AuthService } from 'src/app/services';

import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../material.module';
import { FormComponentsModule } from '../../formComponets.module';
import { DeleteConfirmDialogComponent } from 'src/app/dialogs/delete-confirm-dialog/delete-confirm-dialog.component';
import { SrcPipeModule } from 'src/app/srcPipe.module';


@NgModule({
  declarations: [
    ImageEditComponent,
    DeleteConfirmDialogComponent,
  ],
  imports: [
    MaterialModule,
    FormComponentsModule,
    CommonModule,
    ImageEditRoutingModule,
    SrcPipeModule,
    FormsModule,
    DirectivesModule,
  ],
  providers: [
    GalleryService,
    AuthService,
  ],
  entryComponents: [DeleteConfirmDialogComponent]

})
export class ImageEditModule { }
