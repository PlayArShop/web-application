/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';

import { AppState } from './app.service';

const template = require('./app.template.html');
/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ './app.style.css' ],
  template: template
})
export class AppComponent {
  url = 'http://localhost:8080/';
  name = 'PlayARShop';

  constructor(
    public appState: AppState) {

  }

  ngOnInit() {
    // console.log('Initial App State', this.appState.state);
  }

}