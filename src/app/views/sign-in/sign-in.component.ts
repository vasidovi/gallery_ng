import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  password: string;
  username: string;

  constructor(private auth: AuthService,
              private snackBar: MatSnackBar,
              public router: Router
  ) { }

  onSubmit(): void {
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
