import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

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

  constructor(private userService: UserService,
              public router: Router
  ) { }

  onSubmit(): void {
    this.userService.signin({
      password: this.form.get('password').value,
      username: this.form.get('username').value,
    }).then((res) => {
      // do something... 
      console.log(res);
      this.router.navigate(['/']);
    }, (err) => {
      this.login.status = 'failed';
      this.login.message = 'Wrong username or password';
    }
    );
  }



}
