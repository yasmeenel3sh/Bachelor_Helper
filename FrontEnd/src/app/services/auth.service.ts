import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment } from '../../environments/environment'
@Injectable({
    providedIn: 'root'
  })

  export class AuthService {
    constructor(private http: HttpClient, private router: Router) {
    }

   public   signup(data){
    let signUp={
     name:data.name,
     email:data.email.trim(),
     password:data.password.trim(),
     confirmPassword:data.confirmPassword.trim(),
     major:data.major,
     bachCountry:"",
     bachUni:"",
     info:""
    }
    return this.http.post(environment.domain+'auth/register', signUp);
  }

   public  login(email,password) {
        var reqHeader = new HttpHeaders({'Content-Type':'application/json'});
        return this.http.post(environment.domain+'auth/login', {email:email,password:password},{headers:reqHeader});
      
      }
    

    public logout() {
        localStorage.removeItem('userToken');
        //to do navigate to home 
        this.router.navigateByUrl("/")
      }


    public getToken(): string {
        return localStorage.getItem('userToken');
      }



     //check if user logged in
    public isAuthenticated() {
        // get the token
        const token = this.getToken();
        // return a boolean reflecting 
        // whether or not the token is expired
        return token !== undefined && token !== null;
      }


      //helps in restricted view pages
     public redirectIfAuthenticated(route: string) {
        if (this.isAuthenticated()) {
          this.router.navigateByUrl(route);
        }
      }
    
  }