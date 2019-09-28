import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './views/sign-up/sign-up.component';
import { SignInComponent } from './views/sign-in/sign-in.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./views/gallery/gallery.module').then(mod => mod.GalleryModule) },
  { path: 'upload',  loadChildren: () => import('./views/image-upload/image-upload.module').then(mod => {
    return mod.ImageUploadModule;
  }), canActivate: [AuthGuard] },
  { path: 'image/edit/:id', loadChildren: () => import('./views/image-edit/image-edit.module').then(mod => {
    return mod.ImageEditModule;
  }), canActivate: [AuthGuard] },
  { path: 'signup', component: SignUpComponent },
  { path: 'signin', component: SignInComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
