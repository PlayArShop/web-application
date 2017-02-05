import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { contentHeaders } from '../common/headers';

import { Auth } from '../services/auth';

const template = require('./signup.template.html');

@Component({
  selector: 'signup',
  template: template,
  styleUrls: [ './signup.style.css' ],
  providers: [ Auth ]
})
export class SignupComponent {
  API_URL: string = 'http://api.playarshop.com';
  errorMessage: string;
  user: string = 'none';
  titlename: string;
  titledesc: string;

  constructor(public router: Router, public http: Http, public auth: Auth) {
    if (localStorage.getItem('id_token')) {
      this.router.navigate(['/home']);
    }
    this.setTitle();
  }

  setUser(type) {
    this.user = type;
    localStorage.setItem('user', type);
    this.setTitle();
  }

  setTitle() {
    if (this.user == 'none') {
      this.titlename = 'Welcome';
      this.titledesc = 'Select your space';
    }
    if (this.user == 'player') {
      this.titlename = 'Player';
      this.titledesc = 'Use your game credentials';
    }
    if (this.user == 'shop') {
      this.titlename = 'Merchant';
      this.titledesc = 'Signup to create a game';
    }
  }

  signup(email, password) {
    this.errorMessage = this.auth.signup(email, password, this.user + 's');
  }
}
