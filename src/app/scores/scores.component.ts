import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { contentHeaders } from '../common/headers';

const styles = require('./scores.style.css');
const template = require('./scores.template.html');

@Component({
  selector: 'scores',
  template: template,
  styles: [styles]
})
export class ScoresComponent {
  API_URL: string = 'http://api.playarshop.com';
  result: any;
  type: string;
  scores: any[];

  constructor(public router: Router, public http: Http) {
    this.type = localStorage.getItem('user');
    this.getScores()
      .then((data) => {
        this.scores = data.scores;
      })
  }

  getScores() {
    let options = new RequestOptions({ headers: contentHeaders });
    return this.http.get(`${this.API_URL}/scores `, options)
      .toPromise()
      .then(function (res) {
        console.log('RESPONSE: ', JSON.stringify(res, null, 2));
        return res.json();
      })
      .catch(function (err) {
        console.error('ERROR: ', JSON.stringify(err, null, 2));
      });
  }

}
