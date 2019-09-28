import { passwordsMatch } from './../../directives/password-mismatch.directive';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  hidePassword = true;
  login = {
    status: '',
    message: '',
  };
  password: string;
  username: string;

  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),

  });

  constructor(private auth: AuthService,
              private snackBar: MatSnackBar,
              public router: Router
  ) { }

  onSubmit(): void {
    console.log(this.password + " " + this.username);
    this.auth.login({
      password: this.password,
      username: this.username,
    }).then(() => {
        this.router.navigate(['/']);
      }, ()  => {

        this.snackBar.open('Wrong username or password', 'X', {
          duration: 2000,
        });
      });
  }
}
