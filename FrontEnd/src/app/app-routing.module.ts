import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
 import { UserProfileComponent } from './user-profile/user-profile.component';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import {ExpertProfileComponent} from './expert-profile/expert-profile.component'

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'home', component: DashboardComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'search', component: SearchComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'bprofile/:id', component: ExpertProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'expertProfile', component: ExpertProfileComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
