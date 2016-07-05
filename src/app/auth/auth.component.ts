import { Component }   from '@angular/core';
import { Router, ActivatedRoute}      from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'login',
  styleUrls: ['./auth.style.css'],
  templateUrl: './auth.template.html',
})
export class AuthComponent {
  private message: string;
  private sub: any;
  private redirect: string = '';

  constructor(
	  private route: ActivatedRoute,
	  public router: Router,
    public authService: AuthService) {
    this.setMessage();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if ('next' in params) {
        this.redirect = params['next'];
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  setMessage() {
    let status = this.authService.isLoggedIn ? 'in' : 'out';
    this.message = `You are logged ${status}`;
  }

  login() {
    this.message = 'Trying to log in ...';

    this.authService.login().subscribe(() => {
      this.setMessage();
      if (this.authService.isLoggedIn) {
        let goto = '/home';
        if (this.redirect != '') {
          goto = `/${this.redirect}`;
          this.redirect = '';
        }
        this.router.navigate([goto]);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.setMessage();
    this.router.navigate(['/home']);
  }
}