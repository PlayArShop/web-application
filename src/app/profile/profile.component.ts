import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { contentHeaders } from '../common/headers';

import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { FormBuilder, Validators } from '@angular/forms';

import 'rxjs/add/operator/catch';

import {OnInit} from '@angular/core';
import { AuthHttp } from 'angular2-jwt';

let styles = require('./profile.style.css');
let template = require('./profile.template.html');

@Component({
    selector: 'profile',
    template: template,
    styles: [styles]
})
export class ProfileComponent {
    API_URL: string = 'http://api.playarshop.com';
    public response: any;
    public fev: string;
    public username: string;
    public firstname1: string;
    public lastname1: string;
    public email1: string;
    public position1: string;
    public about1: string;
    public fname: string;
    public PFirst: string;
    public PPass: string;
    public PPRPass: string;
    public PAbout: string;
    public PFunction: string;
    errorMessage: string;

    constructor(public router: Router, public http: Http,
                public authHttp: AuthHttp, fb: FormBuilder) {
        this.http.get(`${this.API_URL}/users`, { headers: contentHeaders })
            .map((res: Response) => this.setResponse(res.text()))
            .subscribe(
            res => this.response = res
            );
    }

    login(event, email, password, first_name, last_name, position, about) {
        event.preventDefault();
        console.log('test about', about);
        let body = JSON.stringify({ email, password, first_name, last_name, about });
        console.log('PRE POST', body);
        // HTTP POST TO API 
        this.http.post(`${this.API_URL}/users`, body, { headers: contentHeaders })
            .map((res: Response) => this.setPostResponse(res.text()))
            .subscribe(
            response => {
                console.log('auth_token: ' + response);
            },
            error => {
                this.errorMessage = '<span class=\'help-block\' style=\'color:red;\'>'
                    + error.json().errors + '</span>';
            }
            );
    }

    setPostResponse(str: string) {
        console.log('marche !', str);
    }

    setResponse(toto: string) {
        var object;
        var layer;
        this.fev = toto;
        console.log('entire FEV:', this.fev);
        object = JSON.parse(this.fev);
        console.log('Good', object['first_name']);
        this.lastname1 = object['last_name'];
        this.firstname1 = object['first_name'];
        this.email1 = object['email'];
        this.position1 = object['position'];
        this.about1 = object['about'];
    }

    logError(err) {
        console.error('ERROR: ' + err);
    }

}
