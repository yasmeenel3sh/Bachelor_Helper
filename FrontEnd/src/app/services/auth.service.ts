import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient, private router: Router) {
    const helper = new JwtHelperService();

  }

  public signup(data) {
    var major = ("" + data.major).toLocaleLowerCase().trim().split(" ").join("");
    let signUp = {
      name: data.name,
      email: data.email.trim(),
      password: data.password.trim(),
      confirmPassword: data.confirmPassword.trim(),
      major: major,
      photo:"",
      bachCountry: "",
      bachUni: "",
      bachYear: "",
      info: ""
    }
    return this.http.post(environment.domain + 'auth/register', signUp);
  }

  public login(email, password) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(environment.domain + 'auth/login', { email: email, password: password }, { headers: reqHeader });

  }


  public logout() {
    localStorage.removeItem('userToken');
    //to do navigate to home 
    this.router.navigateByUrl('/home');
  }


  public getToken(): string {
    return JSON.stringify(localStorage.getItem('userToken'));
  }



  //check if user logged in
  public isAuthenticated() {
    // get the token
    const token = localStorage.getItem('userToken');

    // return a boolean reflecting 
    // whether or not the token is expired
    return token != undefined && token != null;
  }


  //helps in restricted view pages
  public redirectIfAuthenticated(route: string) {
    if (this.isAuthenticated()) {
      this.router.navigateByUrl(route);
    }
  }
  public getUserFromToken(token: any) {
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload).user;
    } else {
      return null;
    }
  }
  public getCurrentUser() {
    return this.getUserFromToken(this.getToken());
  }
  public getUserName() {
    return this.getCurrentUser().name;
  }
}