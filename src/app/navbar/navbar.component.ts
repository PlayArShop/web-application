import {Component, Input, Output, EventEmitter} from '@angular/core';
import { Router, Route } from '@angular/router';

let styles   = require('./navbar.style.css');
let template = require('./navbar.template.html');

@Component({
    selector: 'navbar',
    // properties: ['routes'],
    styleUrls: [ './navbar.style.css' ],
    template: template
})
export class NavbarComponent {
    jwt: string;
    decodedJwt: string;
    username: string;
    logo = 'assets/img/logo.png';
    avatar = 'assets/img/avatar.jpg';
    type: string;
    constructor(public router: Router) {
        this.type = localStorage.getItem('user');
    }

    // Check if your are on landing page
    get onLanding(): boolean {
        // console.log(this.router.url);
        // if (this.router.url === '/' || this.router.url.match(/#[a-z]/g)) {
        this.type = localStorage.getItem('user')
        if (this.router.url === '/') {            
            return true;
        } else {
            return false;
        }
    }

    get isShop(): boolean {
        this.type = localStorage.getItem('user');
        return (this.type === 'shop') ? true : false;
    }

    get isAuthed(): boolean {
        this.jwt = localStorage.getItem('id_token');
        if (this.jwt != null) {
            // console.log('auth with : ' + this.jwt);
            // this.decodedJwt = this.jwt && window.jwt_decode(this.jwt);
            // this.username = 'John Doe'; //this.decodedJwt['user'].split('@')[0];
            return true;
        } else {
            return false;
        }
    }

    logout() {
        localStorage.removeItem('id_token');
        // localStorage.removeItem('game_ref');
        // localStorage.removeItem('user');
        // localStorage.removeItem('id_game');
    }
}
