import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from './register/register.component';
import{AppComponent} from './app.component' ;
import {DashboardComponent} from './dashboard/dashboard.component';
//import { UserProfileComponent } from './user-profile/user-profile.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path:'register',component: RegisterComponent},
  { path:'search',component: SearchComponent},
  { path:'**',redirectTo:''}
    ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
