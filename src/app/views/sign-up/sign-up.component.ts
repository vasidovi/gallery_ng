import { IUser } from './../../models/user.model';
import { AuthService } from 'src/app/services';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  imageSrc = '../../../assets/images/2678153.jpg';

  username: string;
  password: string;
  passwordRepeat: string;

  constructor(private auth: AuthService,
              private snackBar: MatSnackBar,
              public router: Router
) { }

  onSubmit(): void {

    const newUser: IUser = {
      password: this.password,
      username: this.username,
    };

    this.auth.register(newUser).then(
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
