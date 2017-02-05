import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { contentHeaders } from '../common/headers';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';

const styles = require('./home.style.css');
const template = require('./home.template.html');

@Component({
    selector: 'home',
    template: template,
    styles: [styles]
})
export class HomeComponent {
    API_URL: string = 'http://api.playarshop.com';
    type: string;
    games: any[];

    constructor(public router: Router, public http: Http) {
      
        this.getUserGames()
            .then((data) => {
                this.games = data.games;
            })
        this.type = localStorage.getItem('user');
    }

    isGames() {
      if (this.games) {
        return this.games.length === 0 ? false : true;
      } else {
        return false;
      }
    }

    deleteGame(id) {
      let options = new RequestOptions({ headers: contentHeaders });
      this.http.get(`${this.API_URL}/games/${id}/delete`, options)
            .toPromise()
            .then(function (res) {
                console.log('RESPONSE: ', res);
                window.location.reload();
                return res.json();
            })
            .catch(function (err) {
                console.error('ERROR: ', err);
            });
    }

    getUserGames() {
        let options = new RequestOptions({ headers: contentHeaders });
        return this.http.get(`${this.API_URL}/games `, options)
            .toPromise()
            .then(function (res) {
                console.log('RESPONSE: ', res);
                return res.json();
            })
            .catch(function (err) {
                console.error('ERROR: ', err);
            });
    }

}
