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

    this.authService.login().subscribe(
	    data => this.saveJwt(data.token),
	    err => this.logError(err)
    );
  }

  saveJwt(jwt: string) {
    if (jwt) {
      localStorage.setItem('authToken', jwt);
      this.authService.isLoggedIn = true;
    } else {
      localStorage.removeItem('authToken');
    }

    this.setMessage();
    if (this.authService.isLoggedIn) {
      let goto = '/home';
      if (this.redirect != '') {
        goto = `/${this.redirect}`;
        this.redirect = '';
      }
      this.router.navigate([goto]);
    }
  }

  logError(err: any) {
      console.log(err);
  }
 
  logout() {
    this.authService.logout();
    this.setMessage();
    this.router.navigate(['/home']);
  }
}
