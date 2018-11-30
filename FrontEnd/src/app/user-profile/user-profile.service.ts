import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {environment } from '../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  
 constructor(private http: HttpClient, private router: Router) {

 }
}
