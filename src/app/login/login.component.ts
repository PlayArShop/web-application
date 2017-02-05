import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { contentHeaders } from '../common/headers';

import { Auth } from '../services/auth';

const styles = require('./login.style.css');
const template = require('./login.template.html');

@Component({
  selector: 'login',
  template: template,
  styleUrls: ['./login.style.css'],
  providers: [Auth]
})
export class LoginComponent {
  errorMessage: string;
  user: string = 'none';
  title: { name: string, desc: string };
  titlename: string;
  titledesc: string;
  API_URL: string = 'http://api.playarshop.com';

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
      this.titlename = 'Who are you?';
      this.titledesc = 'Select your space';
    }
    if (this.user == 'player') {
      this.titlename = 'Player';
      this.titledesc = 'Use your game credentials';
    }
    if (this.user == 'shop') {
      this.titlename = 'Merchant';
      this.titledesc = 'Login or signup to create a game';
    }
  }

  /**
     * login
     */


    login = function (email, password): string {
        var type = this.user + 's';
        // ------ Post to API with headers 
        return this.http.post(`${this.API_URL}/` + type + `/sign_in`,
            JSON.stringify({ email, password }),
            { headers: contentHeaders }
        ).subscribe(
            response => {
                // ------ Store auth jwt token
                localStorage.setItem('id_token', response.json().auth_token);
                if (type === 'shops') {
                    this.router.navigate(['/home']);
                } else if (type === 'players') {
                    this.router.navigate(['/scores']);
                }
                return '';
            },
            error => {
                console.error('ERROR: ', error);
                return '';
            }
        );
    }

    /**
     * signup
     */
    signup = function (email, password, type): string {
        console.log(email, password);
        return this.http.post(`${this.API_URL}/` + type + `/sign_up`,
            JSON.stringify({ email, password }),
            { headers: contentHeaders }
        ).subscribe(
            response => {
                localStorage.setItem('id_token', response.json().auth_token);
                if (type === 'shops') {
                    this.router.navigate(['/home']);
                } else if (type === 'players') {
                    this.router.navigate(['/scores']);
                }
                return '<span class="help-block" style="color:green;"></span>';
            },
            error => {
                return '<span class="help-block" style="color:red;">'
                    + error.json().error + '.</span>';
            }
        );
    }
}
