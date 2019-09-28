import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./views/gallery/gallery.module').then(mod => mod.GalleryModule) },
  { path: 'upload',  loadChildren: () => import('./views/image-upload/image-upload.module').then(mod => {
    return mod.ImageUploadModule;
  }), canActivate: [AuthGuard] },
  { path: 'image/edit/:id', loadChildren: () => import('./views/image-edit/image-edit.module').then(mod => {
    return mod.ImageEditModule;
  }), canActivate: [AuthGuard] },
  { path: 'signup', loadChildren: () => import('./views/sign-up/sign-up.module').then(mod => mod.SignUpModule) },
  { path: 'signin', loadChildren: () => import('./views/sign-in/sign-in.module').then(mod => mod.SignInModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
