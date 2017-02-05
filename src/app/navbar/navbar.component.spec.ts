import {
  inject,
  TestBed
} from '@angular/core/testing';

// Load the implementations that should be tested
import { AppComponent } from '../app.component';
import { NavbarComponent } from './navbar.component';
import { AppState } from '../app.service';


describe('Navbar', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AppState,
      AppComponent,
      NavbarComponent
    ]}));

  // it('should have a logo', inject([ NavbarComponent ], (navbar: NavbarComponent) => {
  //   expect(navbar.logo).toEqual('assets/img/logo.png');
  // }));

});
