import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { APP_MAIN_DOMAIN, APP_API_VERSION } from '../index';

@Injectable()
export class AuthService {
  appDomain: string = '';
  isLoggedIn: boolean = false;
	private headers: Headers = new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
  });

  constructor (private http: Http) {
  }

  login(): any {
    let email = 'admin@simplyfound.info';
    let password = 'hello';

    let postData = JSON.stringify({ email: email, password: password });

    return this.http.post(`${APP_MAIN_DOMAIN}/api/auth/token/get/`, postData, {
	      headers: this.headers
	    }).map((res: any) => res.json());
    }

  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem('authToken');
  }
}
