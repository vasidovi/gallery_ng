import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageUploadComponent } from './views/image-upload/image-upload.component';
import { ImageEditComponent } from './views/image-edit/image-edit.component';
import { SignUpComponent } from './views/sign-up/sign-up.component';
import { SignInComponent } from './views/sign-in/sign-in.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./views/gallery/gallery.module').then(mod => mod.GalleryModule) },
  { path: 'upload', component: ImageUploadComponent, canActivate: [AuthGuard] },
  { path: 'image/edit/:id', component: ImageEditComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignUpComponent },
  { path: 'signin', component: SignInComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
