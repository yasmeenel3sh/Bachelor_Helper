import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { RegisterService } from './register/register.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SearchComponent } from './search/search.component';
import { SearchService } from './search/search.service';
import {  HttpClientModule } from '../../node_modules/@angular/common/http';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    DashboardComponent,
    UserProfileComponent,
    SearchComponent,
<<<<<<< HEAD
    LoginComponent,
    NavbarComponent
=======
   
>>>>>>> f999af28a27699024e196e43e91139bfe8d5c76b
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    RegisterService,
    SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
