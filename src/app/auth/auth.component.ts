import { Component }   from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from './auth.service';

@Component({
	selector: 'login',
    templateUrl: './auth.template.html',
})
export class AuthComponent {
  message: string;

  constructor(public authService: AuthService, public router: Router) {
    this.setMessage();
  }

  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  login() {
    this.message = 'Trying to log in ...';

    this.authService.login().subscribe(() => {
      this.setMessage();
      if (this.authService.isLoggedIn) {
        this.router.navigate(['/home']);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.setMessage();
	this.router.navigate(['/home']);
  }
}