import { IUser } from './../../models/user.model';
import { AuthService } from 'src/app/services';
import { passwordsMatch } from './../../directives/password-mismatch.directive';
import { UserService } from './../../services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  hidePassword = true;
  hidePasswordRepeat = true;

  file: File;
  isHovering: boolean;
  imageSrc = '../../../assets/images/2678153.jpg';


  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required]),
    passwordRepeat: new FormControl('', [Validators.required]),
  },
    {
      validators: passwordsMatch
    }
  );

  constructor(private userService: UserService,
              private auth: AuthService,
              private snackBar: MatSnackBar,
              public router: Router
) { }

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

    return this.form.get('passwordRepeat').hasError('required') ? 'You must enter a value' :
        '';
  }

  // todo  optional side project to check in DB if User by such name and email exists and return response
  // if does not exits to register user and autologin
  checkNameValidity(event) {

    if (event.trim().length > 2) {
      // this.userService.checkIfUsernameExists(event.trim());
    }
  }

  onSubmit(): void {

    const newUser: IUser = {
      password: this.form.get('password').value,
      username: this.form.get('username').value,
    };

    this.userService.register(newUser).then(
      (res) => {
        this.snackBar.open('Welcome abroad ' + newUser.username + ' ', 'X', {
          duration: 2000,
        });
        this.auth.login(newUser).then(() => {
          setTimeout(() => this.router.navigate(['/']), 1000);
        });
      },
      (err) => {
        this.snackBar.open('Registration failed : ' + err.error + ' ', 'X', {
          duration: 4000,
        });
      }
    );
  }
}
