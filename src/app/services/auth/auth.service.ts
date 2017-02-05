import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { contentHeaders } from '../../common/headers';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

/**
  * auth service
  */

@Injectable()
export class Auth {
    API_URL: string = 'http://api.playarshop.com';

    constructor(private router: Router, private http: Http) { }

    /**
     * login
     */


    login = function (email, password, type): string {
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
                return '<span class="help-block" style="color:green;"></span>';
            },
            error => {
                console.error('ERROR: ', error.json());
                return '<span class="help-block" style="color:red;">'
                    + error.json().error + '</span>';
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
