import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { CORE_DIRECTIVES } from '@angular/common';

let styles = require('./tmp.style.css');
let template = require('./tmp.template.html');

@Component({
    selector: 'tmp',
    directives: [CORE_DIRECTIVES],
    template: template,
    styles: [styles]
})
export class Tmp {
    API_URL: string = 'http://api.playarshop.com';
    response: any;

    constructor(private http: Http) {
        this.http.get(`${this.API_URL}/games/1`)
            .map(res => res.text())
            .subscribe(
            data => this.response = data,
            err => this.logError(err),
            () => console.log('RESPONSE: ' + this.response)
            );
    }

    logError(err) {
        console.error('ERROR: ' + err);
    }
}

