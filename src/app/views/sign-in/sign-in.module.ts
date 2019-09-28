import { SignInComponent } from '..';

import { AuthService } from 'src/app/services';

import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../material.module';
import { FormComponentsModule } from '../../formComponets.module';
import { DirectivesModule } from './../../directives.module';
import { SignInRoutingModule } from './sign-in.routing.module';



@NgModule({
  declarations: [
    SignInComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FormComponentsModule,
    SignInRoutingModule,
    DirectivesModule,
  ],
  providers: [
    AuthService,
  ],
})
export class SignInModule { }
