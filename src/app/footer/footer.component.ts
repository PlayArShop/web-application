import { Component, style } from '@angular/core';
import { Router } from '@angular/router';

let styles = require('./footer.style.css');
let template = require('./footer.template.html');

@Component({
    selector: 'footer',
    template: template,
    styleUrls: [styles]
})
export class FooterComponent {
    test: string = 'ok';

    constructor(private router: Router) {
    }
}
