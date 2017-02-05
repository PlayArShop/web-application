import {
  inject,
  TestBed
} from '@angular/core/testing';

// Load the implementations that should be tested
import { AppComponent } from './app.component';
import { AppState } from './app.service';


describe('App', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AppState,
      AppComponent
    ]}));

  it('component Home should load', inject([ AppComponent ], (app: AppComponent) => {
    expect(app.url).toEqual('http://localhost:8080/');
  }));

  it('component Profile should load', inject([ AppComponent ], (app: AppComponent) => {
    expect(app.url).toEqual('http://localhost:8080/');
  }));

  it('component Navbar should load', inject([ AppComponent ], (app: AppComponent) => {
    expect(app.url).toEqual('http://localhost:8080/');
  }));

  it('component Footer should load', inject([ AppComponent ], (app: AppComponent) => {
    expect(app.url).toEqual('http://localhost:8080/');
  }));

  it('component Map should load', inject([ AppComponent ], (app: AppComponent) => {
    expect(app.url).toEqual('http://localhost:8080/');
  }));

  it('component Login should load', inject([ AppComponent ], (app: AppComponent) => {
    expect(app.url).toEqual('http://localhost:8080/');
  }));

  it('component Signup should load', inject([ AppComponent ], (app: AppComponent) => {
    expect(app.url).toEqual('http://localhost:8080/');
  }));

  it('component Game should load', inject([ AppComponent ], (app: AppComponent) => {
    expect(app.url).toEqual('http://localhost:8080/');
  }));

  it('should have a url', inject([ AppComponent ], (app: AppComponent) => {
    expect(app.url).toEqual('http://localhost:8080/');
  }));


  it('should have a name', inject([ AppComponent ], (app: AppComponent) => {
    expect(app.name).toEqual('PlayARShop');
  }));

});
