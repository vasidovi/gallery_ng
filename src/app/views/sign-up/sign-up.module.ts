import { SignUpComponent } from '..';

import { AuthService, UserService } from 'src/app/services';

import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../material.module';
import { FormComponentsModule } from '../../formComponets.module';
import { DirectivesModule } from './../../directives.module';
import { SignUpRoutingModule } from './sign-up.routing.module';


@NgModule({
  declarations: [
    SignUpComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FormComponentsModule,
    SignUpRoutingModule,
    DirectivesModule,
  ],
  providers: [
    AuthService,
    UserService,
  ],
})
export class SignUpModule { }
