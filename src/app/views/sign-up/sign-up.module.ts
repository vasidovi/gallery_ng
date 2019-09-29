import { SignUpComponent } from '..';

import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../material.module';
import { FormComponentsModule } from '../../formComponets.module';
import { DirectivesModule } from './../../directives.module';
import { SignUpRoutingModule } from './sign-up.routing.module';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';


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
