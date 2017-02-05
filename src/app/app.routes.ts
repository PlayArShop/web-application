import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { LandingComponent } from './landing';
import { SignupComponent } from './signup';
import { LoginComponent } from './login';
import { GameComponent, GameValidateComponent } from './game';
import { ProfilComponent } from './profil';
import { StatisticComponent } from './statistic';
import { ProfileComponent } from './profile';
import { MapComponent } from './map';
import { ScoresComponent } from './scores';
import { NoContentComponent } from './no-content';

import { AuthGuard } from './common/auth.guard';

import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '',      component: LandingComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home',  component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'game',  component: GameComponent, canActivate: [AuthGuard] },
  { path: 'profile',  component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'statistic',  component: StatisticComponent, canActivate: [AuthGuard] },
  { path: 'map',  component: MapComponent, canActivate: [AuthGuard] },
  { path: 'scores',  component: ScoresComponent, canActivate: [AuthGuard] },
  { path: 'game/recap', component: GameValidateComponent, canActivate: [AuthGuard] },
  { path: '**',    component: NoContentComponent },
];
