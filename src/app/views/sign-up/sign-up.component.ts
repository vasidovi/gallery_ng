import { UserService } from './../../services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  hidePassword = true;
  hidePasswordRepeat = true;
  registration = {
    status: '',
    message: '',
  };
  file: File;
  isHovering: boolean;

  // email : new FormControl('', [Validators.required, Validators.email]);, for now without email
  // toDo to implement password match confirm as per nice example ->
  // https://codinglatte.com/posts/angular/cool-password-validation-angular/

  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required]),
    passwordRepeat: new FormControl('', [Validators.required]),
  });

  getErrorMessage() {
    return this.form.get('username').value.hasError('required') ? 'You must enter a value' :
      this.form.get('username').value.hasError('minLength') ? 'Username must be at least 3 letters' :
        this.form.get('passwordRepeat').value.hasError('required') ? 'You must enter a value' :
          '';
  }


  // todo check in DB if User by such name and email exists and return response
  // if does not exits to register user and autologin

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  checkNameValidity(event) {

    if (event.trim().length > 2) {

      // Optional feature
      // this.userService.checkIfUsernameExists(event.trim());
    }
  }

  onSubmit() {

    this.userService.register({
      password: this.form.get('password').value,
      username: this.form.get('username').value,
    }).then(
      (res) => {
        this.registration.status = 'ok';
        this.registration.message = 'registration was successful';
      },
      (err) => {
        this.registration.status = 'failed';
        this.registration.message = err.error;
      }
    );
  }
}
