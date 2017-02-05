import * as stream from 'stream';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { contentHeaders } from '../../common/headers';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

class GameModel {
    logo: string;
    image: Array<string>;
    name: string;
    place: string;
    city: string;
    level: string;
    success: string;
    fail: string;
}
/**
  * game service
  */

@Injectable()
export class GameService {
    API_URL: string = 'http://api.playarshop.com';

    constructor(private router: Router, private http: Http) { }

    create(name_url: string, json: string): string {
        var ok = true;
        if (ok) {

            console.log(JSON.stringify(contentHeaders.values(), null, 2));
            this.http.post(`${this.API_URL}/${name_url}`, json, { headers: contentHeaders }) // companies
                .subscribe(
                response => {
                    console.log('RESPONSE: ' + response.json().id_game);
                    localStorage.setItem('id_game', response.json().id_game);
                    // Redirect to edit game
                    // window.location.href = 'http://playarshop.com/game/' + ref + '/index.html';
                    return '<div class="alert alert-success"><strong>Success!</strong>\
                            Customization being processed, you will be redirect to edit.</div>';
                },
                error => {
                    console.log('ERROR: ' + error.json());
                    return '<span class="help-block" style="color:red;">'
                        + error.json().errors + '</span>';
                }
                );
        } else {
            return '<div class="alert alert-danger">'
                + '<strong>Error!</strong> Please fill every fields of the form.' + '</div>';
        }
    }
}
