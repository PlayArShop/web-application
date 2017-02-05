import { Component } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';

@Component({
  selector: 'notfound',
  directives: [CORE_DIRECTIVES],
  template: `<header>
  <div class=\"container">
    <div class="row">
      <div class="col-lg-12">
        <h2>404 NOT FOUND</h2>
      </div>
    </div>
  </div>
</header>`,
styles: ['header { height: 700px; padding-top: 10%;}']
})
export class NotFound {
  constructor() {
  }
}
