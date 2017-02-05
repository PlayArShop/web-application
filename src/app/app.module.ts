import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, FormBuilder, Validators } from '@angular/forms';

import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { AgmCoreModule } from 'angular2-google-maps/core';
/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { TabsModule } from "ng2-tabs";
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { HomeComponent } from './home';
import { LandingComponent } from './landing';
import { SignupComponent } from './signup';
import { LoginComponent } from './login';
import { GameComponent, GameValidateComponent } from './game';
import { ProfilComponent } from './profil';
import { StatisticComponent } from './statistic';
import { MapComponent } from './map';
import { ScoresComponent } from './scores';
import { ProfileComponent } from './profile';

import { NavbarComponent } from './navbar';
import { FooterComponent } from './footer';

import { AuthGuard } from './common/auth.guard';

import { NoContentComponent } from './no-content';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    HomeComponent,
    LandingComponent,
    SignupComponent,
    LoginComponent,
    MapComponent,
    ScoresComponent,
    ProfileComponent,
    GameComponent,
    GameValidateComponent,
    StatisticComponent,
    NavbarComponent,
    FooterComponent,
    NoContentComponent
  ],
  imports: [ // import Angular's modules
    TabsModule,
    AgmCoreModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartsModule,
    RouterModule.forRoot(ROUTES, { useHash: false })
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
    AUTH_PROVIDERS,
    AuthGuard,
    FormBuilder
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) {}

  hmrOnInit(store: StoreType) {
    if (!store || !store.state) return;
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}

