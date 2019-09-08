import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  hidePassword = true;
  login = {
    status: '',
    message: '',
  };

  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private userService: UserService) { }

  ngOnInit() {
  }


  onSubmit() {

    this.userService.signin({
      password: this.form.get('password').value,
      username: this.form.get('username').value,
    }).then(
      (res) => {
        this.login.status = 'ok';
        this.login.message = 'login was successful';
        console.log(res);
      },
      (err) => {
        this.login.status = 'failed';
        this.login.message = 'wrong username or password';
      }
    );
  }

}
