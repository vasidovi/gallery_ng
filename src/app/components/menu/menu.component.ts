import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private auth: AuthService,
    private router: Router,
  ) { }

  loginStatus: boolean;

  ngOnInit() {
  }

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  logout(): void {
    this.auth.logout();
    // todo a refresh
    this.router.navigateByUrl('/signin', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/']));
  }
}
