import { Component } from '@angular/core';
import { AuthService } from 'src/app/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  loginStatus: boolean;

  constructor(private auth: AuthService,
              private router: Router) { }


  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/signin', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/']));
  }
}
