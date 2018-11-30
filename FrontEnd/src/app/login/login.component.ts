import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth:AuthService, private router:Router) { }
  error :boolean=false;
  private errorMsg;
  ngOnInit() {
  }
  login(form){

    this.auth.login(form.value.email.trim(),form.value.password).subscribe((data : any)=>{
      localStorage.setItem('userToken',data.data);
      this.router.navigate(['/home']);
     window.location.reload();

     
    },
  (err :any)=>{
    this.errorMsg=err.error.msg;
    this.error=true;
 console.log(err);
  });
   
  }
}
