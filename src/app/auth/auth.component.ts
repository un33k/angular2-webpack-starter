import { Component } from '@angular/core';
import { FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, FormBuilder, Validators, FormControl, FormGroup} from '@angular/forms';
import { Router, ActivatedRoute }	from '@angular/router';

import { AuthService } from './auth.service';

@Component({
  selector: 'login',
  styleUrls: ['./auth.style.css'],
  templateUrl: './auth.template.html',
	directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AuthComponent {
  private message: string;
  private sub: any;
  private redirect: string = '';

  private loginForm: FormGroup;
  private email: FormControl;
  private password: FormControl;

  constructor(
	  private route: ActivatedRoute,
	  public router: Router,
    public authService: AuthService,
    private formBuilder: FormBuilder) {
      this.setMessage();
      this.reset();
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

  login(credentials) {
    this.message = 'Trying to log in ...';
    console.log(credentials);
    this.authService.doLogin(credentials).subscribe(
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
 
  logout(event) {
    this.authService.doLogout(event);
    this.setMessage();
    this.router.navigate(['/home']);
  }

  reset() {
    this.email = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);
    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password
    });
  }

}
