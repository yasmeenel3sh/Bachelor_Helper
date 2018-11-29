import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor( private http: HttpClient,private auth:AuthService, private router:Router) { }
  error :boolean=false;
  public errorMsg;
  ngOnInit() {
  }
  signUp(form){
    console.log(form.value);
       if(form.value.password != form.value.confirmPassword){
      this.error=true;
      this.errorMsg="Password and Comfirmed Password didn't match"
    }else{
      this.error=false;
      this.auth.signup(form.value).subscribe((data : any)=>{
        this.router.navigate(['/home']);
        console.log(data);
       
      },
    (err:any)=>{
      this.errorMsg=err.error.err;
      this.error=true;
   console.log(err);
    });
      
    }
   
  }

}
