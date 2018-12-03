import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserDTO } from '../user-profile/data/userDTO';
import { AuthService } from '../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-expert-profile',
  templateUrl: './expert-profile.component.html',
  styleUrls: ['./expert-profile.component.css'],
  providers: [FormBuilder, ReactiveFormsModule, FormsModule, UserDTO]
})
export class ExpertProfileComponent implements OnInit {
  currentUser:UserDTO;
  sendEmail:boolean;
  loggedIn:boolean;
  isRetrieved:boolean;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('userToken')
    })
  };

  formData: FormGroup = this.formBuilder.group({
    text: [null,[Validators.required]],
    subject:[null,[Validators.required]]

  });

constructor(private http: HttpClient, private auth: AuthService,private route: ActivatedRoute,
    private formBuilder: FormBuilder, private reactiveFormModule: ReactiveFormsModule) {

this.currentUser=new UserDTO();



    }
    enableSendemail(){
      this.sendEmail=true;
    }

  ngOnInit() {
   // get the userDTo here from the data base
   this.isRetrieved=false;
   this.loggedIn=false;
   console.log(this.route.snapshot.paramMap.get('id'));
   this.http.get<any>(environment.domain+'user/'+this.route.snapshot.paramMap.get('id'))
   .subscribe((res: any) => {
    this.currentUser=res.data;
    this.isRetrieved=true;
    
  }, err => {
   console.log(err);
  });

  this.loggedIn=this.auth.isAuthenticated();
 

  }
onSubmit(){
  //this should be placed inside the success of the method
  let mailObject= {
      to :this.auth.getCurrentUser().email,
      from :this.currentUser.email,
      text : this.formData.controls.text.value,
      subject :this.formData.controls.subject.value
  }

console.log("clicked");
console.log(mailObject);
  this.http.post(environment.domain + 'user/mail', mailObject,this.httpOptions)
  .subscribe((data: any) => {
    console.log(data);
    this.sendEmail=false;

  }, (err: any) => {
    console.log(err);
    
  });
  
 


}
}




 


  
 

 
  

  


