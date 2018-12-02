import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  signedIn=false;
  userName="";
  constructor(private auth: AuthService) { 

   
  }

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
     this.signedIn = true; 
     
     this.userName=this.auth.getUserName();
    
  } else {
      this.signedIn = false;
  }
  
  }
  logOut(){
    this.signedIn=false;
    this.auth.logout();
  
    window.location.reload();
  }
  isSignedIn(){
    return this.signedIn;
  }
  

}
