import { GalleryComponent } from './views/gallery/gallery.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageUploadComponent } from './views/image-upload/image-upload.component';
import { ImageEditComponent } from './views/image-edit/image-edit.component';

const routes: Routes = [
  { path: '', component: GalleryComponent },
  { path: 'upload', component: ImageUploadComponent },
  { path: 'image/edit/:id', component: ImageEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
