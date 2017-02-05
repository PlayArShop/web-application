import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { contentHeaders } from '../common/headers';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

let styles = require('./validate.style.css');
let template = require('./validate.template.html');

@Component({
  selector: 'gamevalidate',
  template: template,
  styles: [styles]
})
export class GameValidateComponent {
  API_URL: string = 'http://api.playarshop.com';
  result: any;
  company: any;
  game: any;
  discount: any;
  type: string;

  constructor(public router: Router, public http: Http) {
    if (!localStorage.getItem('id_token')) {
      this.router.navigate(['/home']);
    }
    this.type = localStorage.getItem('user');

    this.getRecap()
      .then((data) => {
        this.company = data.company;
        this.game = data.game;
        this.discount = data.discount;
        console.log('DATA: ', data.company);
      })
  }

  isGames() {
    if (this.company.name.length !== 0) {
      return true;
    } else {
      return false;
    }
  }

  validateGame() {
    localStorage.removeItem('game_ref');
    localStorage.removeItem('id_game');
    this.router.navigate(['/home']);
  }



  openCheckout() {
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_qU6xezwDLDFDYEZhC2zg2hlF',
      locale: 'auto',
      token: this.validateGame()
    });
    handler.open({
      name: 'Demo Site',
      description: '2 widgets',
      amount: 2000
    });
  }

  getRecap() {
    var game_ref = localStorage.getItem('game_ref')
    let options = new RequestOptions({ headers: contentHeaders });
    return this.http.get(`${this.API_URL}/recap/${game_ref}`, options)
      .toPromise()
      .then(function (res) {
        console.log('RESPONSE: ', res.json());
        return res.json();
      })
      .catch(function (err) {
        console.error('ERROR: ', err);
      });
  }

}
