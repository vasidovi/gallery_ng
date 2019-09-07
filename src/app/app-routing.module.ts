import { GalleryComponent } from './views/gallery/gallery.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageUploadComponent } from './views/image-upload/image-upload.component';

const routes: Routes = [
  { path: '', component: GalleryComponent },
  { path: 'upload', component: ImageUploadComponent },
//  { path: 'image/: id'}, component: ImageEditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
