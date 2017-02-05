import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { contentHeaders } from '../common/headers';

// import { API_URL } from '../common/constants';

let styles = require('./landing.style.css');
let template = require('./landing.template.html');

@Component({
    selector: 'landing',
    styleUrls: [ 'landing.style.css' ],
    template: template
})

export class LandingComponent {
    API_URL: string = 'http://api.playarshop.com';
    errorMessage: string;
    appmenuImg = 'assets/img/app-menu.png';
    appgameImg = 'assets/img/app-game.png';
    balloonImg = 'assets/img/balloon.jpg';
    banditsmanchotsImg = 'assets/img/bandits-manchots.jpg';



    constructor(public router: Router, public http: Http) {
        if (localStorage.getItem('id_token')) {
            this.router.navigate(['./home']);
        }
    }

    contact(event, name, email, phone, message) {
        event.preventDefault();
        let body = JSON.stringify({ name, email, phone, message });

        this.http.post(`${this.API_URL}/contacts`, body, { headers: contentHeaders })
            .subscribe(
            response => {
                console.log('FORM: success');

            },
            error => {
                this.errorMessage = '<span class="help-block" style="color:red;">'
                    + error.json().errors + '.</span>';
                console.log(error.text());
            }
            );
    }

    ngOnInit() {

    }

}
