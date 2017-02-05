import { forEach } from '@angular/router/src/utils/collection';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { contentHeaders } from '../common/headers';
import { TabsModule } from "ng2-tabs";


// Statics
import 'rxjs/add/observable/throw';

// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';


import { GameService } from '../services/game';

let styles = require('./game.style.css');
let template = require('./game.template.html');

class GameModel {
    logo: string;
    image: string[] = [];
    name: string;
    place: string;
    city: string;
    level: string;
    success: string;
    fail: string;
}

@Component({
    selector: 'game',
    template: template,
    styles: [styles],
    providers: [GameService]
})
export class GameComponent {
    API_URL: string = 'http://api.playarshop.com';
    model: GameModel;
    errorMessage: string;
    files: string[] = [];
    tabs: ['Companie', 'Cible', 'Réduction', 'Jeu', 'Editeur'];
    valid: string = 'company';
    test: string = 'ok';

    companyName: string = '';
    companyLogo: string = '';

    constructor(private http: Http, public router: Router, public game: GameService) {
        this.model = new GameModel();

        this.getCompany()
            .then((data) => {
                if (data) {
                    this.companyName = data.name;
                    // this.companyLogo = data.logo.url;
                    if (this.companyName) {
                      this.valid = 'target';
                    }
                }
            })
    }

    getCompany() {
        let options = new RequestOptions({ headers: contentHeaders });
        return this.http.get(`${this.API_URL}/companies `, options)
            .toPromise()
            .then(function (res) {
                console.log('RESPONSE: ', JSON.stringify(res, null, 2));
                return res.json();
            })
            .catch(function (err) {
                console.error('ERROR: ', JSON.stringify(err, null, 2));
            });
    }

    postCompany(name, image) {
        var json_company = JSON.stringify({
            company: {
                name: name,
                logo: image
            }
        });
        console.log(JSON.stringify(json_company, null, 2));
        if (name && image) {
            this.create('companies', json_company);
            this.valid = 'target';
            this.errorMessage = '';
        }
        this.errorMessage = 'Your missing a field';
    }

    postTargets(place, city, images) {
        var json_targets = JSON.stringify({
            target: images.map(function (e) {
                return { place: place, city: city, image: e };
            }
            )
        });
        var ref = '';
        if (place && city && images.length) {
            this.create('targets', json_targets)
                .then(function (res) {
                    localStorage.setItem('game_ref', res.json().game_ref);
                });
            this.valid = 'discount';
            this.errorMessage = '';
        }
        this.errorMessage = 'Your missing a field';
    }

    postDiscount(success, fail) {
        var json_discount = JSON.stringify({
            game_ref: localStorage.getItem('game_ref'),
            discount: [{ success: success, fail: fail }]
        });
        if (success && fail) {
            this.create('discounts', json_discount);
            this.valid = 'game';
            this.errorMessage = '';
        }
        this.errorMessage = 'Your missing a field';
    }

    postGame(id) {
      localStorage.setItem('id_game', id + 1);
      window.location.href = 'http://localhost:8080/game/edit/' + id + '/index.html';
    }

    create(name_url, json) {
        // console.log(JSON.stringify(contentHeaders.values(), null, 2));
        let options = new RequestOptions({ headers: contentHeaders });
        return this.http.post(`${this.API_URL}/${name_url}`, json, options)
            .toPromise()
            .then(function (res) {
                console.log('RESPONSE: ', JSON.stringify(res, null, 2));
                return res;
            })
            .catch(function (err) {
                console.error('ERROR: ', JSON.stringify(err, null, 2));
                return null;
            });
    }

    onImageChange(input) {

        // Loop through each picture file
        for (var i = 0; i < input.files.length; i++) {

            this.files.push(input.files[i]);

            // Create an img element and add the image file data to it
            var img = document.createElement("img");
            img.src = window.URL.createObjectURL(input.files[i]);

            // Create a FileReader
            var reader: any,
                target: EventTarget;
            reader = new FileReader();
            // Add an event listener to deal with the file when the reader is complete
            reader.addEventListener("load", (event: any) => {
                // Get the event.target.result from the reader (base64 of the image)
                img.src = event.target.result;

                // Resize the image
                var resized_img = this.resize(img);

                // Push the img src (base64 string) into our array that we display in our html template
                // this.file_srcs.push(resized_img);
                this.model.image.push(resized_img);
            }, false);

            reader.readAsDataURL(input.files[i]);
        }
    }

    onLogoChange(input) {
        // Loop through each picture file
        this.files.push(input.files[0]);
        // Create an img element and add the image file data to it
        var img = document.createElement("img");
        img.src = window.URL.createObjectURL(input.files[0]);

        // Create a FileReader
        var reader: any,
            target: EventTarget;
        reader = new FileReader();
        // Add an event listener to deal with the file when the reader is complete
        reader.addEventListener("load", (event: any) => {
            // Get the event.target.result from the reader (base64 of the image)
            img.src = event.target.result;

            // Resize the image
            var resized_img = this.resize(img);

            // Push the img src (base64 string) into our array that we display in our html template
            // this.file_srcs.push(resized_img);
            this.model.logo = resized_img;
        }, false);

        reader.readAsDataURL(input.files[0]);
    }

    deleteImage(index) {
        // this.file_srcs.splice(index, 1);
        this.model.image.splice(index, 1);
    }

    clicked(event) {
        console.log(this.model);
    }

    resize(img, MAX_WIDTH: number = 900, MAX_HEIGHT: number = 900) {
        var canvas = document.createElement('canvas');

        // console.log('Size Before: ' + img.src.length + ' bytes');

        var width = img.width;
        var height = img.height;

        if (width > height) {
            if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
            }
        } else {
            if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
            }
        }
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext('2d');

        ctx.drawImage(img, 0, 0, width, height);

        var dataUrl = canvas.toDataURL('image/jpeg');
        // IMPORTANT: 'jpeg' NOT 'jpg'
        return dataUrl;
    }

}
