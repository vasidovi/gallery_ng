import { GalleryComponent } from './views/gallery/gallery.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageUploadComponent } from './views/image-upload/image-upload.component';
import { ImageEditComponent } from './views/image-edit/image-edit.component';
import { SignUpComponent } from './views/sign-up/sign-up.component';
import { SignInComponent } from './views/sign-in/sign-in.component';

const routes: Routes = [
  { path: '', component: GalleryComponent },
  { path: 'upload', component: ImageUploadComponent },
  { path: 'image/edit/:id', component: ImageEditComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'signin', component: SignInComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
