import {passwordsMatch } from './../../directives/password-mismatch.directive';
import { UserService } from './../../services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  hidePassword = true;
  hidePasswordRepeat = true;

  file: File;
  isHovering: boolean;

  // email : new FormControl('', [Validators.required, Validators.email]);, for now without email
  // toDo to implement password match confirm as per nice example ->

  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required]),
    passwordRepeat: new FormControl('', [Validators.required, passwordsMatch ]),
  },
  {
    validators: passwordsMatch
  }
  );


  getUsernameErrorMessage(): string {

    return this.form.get('username').hasError('required') ? 'You must enter a value' :
      this.form.get('username').hasError('minlength') ? 'Username must be at least 3 letters' :
          '';
  }

  getPasswordErrorMessage(): string {

    return this.form.get('password').hasError('required') ? 'You must enter a value' :
          '';
  }

  getPasswordRepeatErrorMessage(): string {
    if (this.form.get('passwordRepeat').hasError('required')){
      return 'You must enter a value';
    } else if ( this.form.hasError('passwordsMismatch' )){
      console.log(this.form.hasError('passwordsMismatch'));
      return 'Passwords do not match';
    } else {
      return '';
    }

    // return this.form.get('passwordRepeat').hasError('required') ? 'You must enter a value' :
    //        this.form.hasError('passwordsMismatch') ? 'Passwords do not match' :
    //       '';
  }


  // todo  optional side project to check in DB if User by such name and email exists and return response
  // if does not exits to register user and autologin

  constructor(private userService: UserService,
              private _snackBar: MatSnackBar,
              public router: Router
    ) { }

  ngOnInit() {
  }

  checkNameValidity(event) {

    if (event.trim().length > 2) {
      // Optional feature
      // this.userService.checkIfUsernameExists(event.trim());
    }
  }

  onSubmit(): void {
    this.userService.register({
      password: this.form.get('password').value,
      username: this.form.get('username').value,
    }).then(
      (res) => {
        this._snackBar.open( 'Welcome abroad ' + this.form.get('username').value + ' ', 'X', {
          duration: 2000,
        });
        setTimeout(() => this.router.navigate(['/']), 1000);
      },
      (err) => {
        this._snackBar.open( 'Registration failed : ' + err.error + ' ', 'X', {
          duration: 4000,
        });
      }
    );
  }
}
