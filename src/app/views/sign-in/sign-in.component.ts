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

  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),

  });

  constructor(private auth: AuthService,
              private snackBar: MatSnackBar,
              public router: Router
  ) { }

  onSubmit(): void {
    this.auth.login({
      password: this.form.get('password').value,
      username: this.form.get('username').value,
    }).then(() => {
        this.router.navigate(['/']);
      }, ()  => {

        this.snackBar.open('Wrong username or password', 'X', {
          duration: 2000,
        });
      });
  }
}
