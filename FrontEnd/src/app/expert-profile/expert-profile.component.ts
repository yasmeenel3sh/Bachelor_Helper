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
  isRetrieved:boolean;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('userToken')
    })
  };

  formData: FormGroup = this.formBuilder.group({
    emailBody: [null,[Validators.required]],
    from:[null,[Validators.required]],
    subject:[null,[Validators.required]]

  });

constructor(private http: HttpClient, private auth: AuthService,private route: ActivatedRoute,
    private formBuilder: FormBuilder, private reactiveFormModule: ReactiveFormsModule) {

this.currentUser=new UserDTO();
// this.currentUser.name="Ahmed";
// this.currentUser.bachCountry="A";
// this.currentUser.bachUni="B";
// this.currentUser.major="met";
// this.currentUser.info="he is a an expert";



    }
    enableSendemail(){
      this.sendEmail=true;
    }

  ngOnInit() {
   // get the userDTo here from the data base
   this.isRetrieved=false;
   console.log(this.route.snapshot.paramMap.get('id'));
   this.http.get<any>(environment.domain+'user/'+this.route.snapshot.paramMap.get('id'))
   .subscribe((res: any) => {
    this.currentUser=res.data;
    this.isRetrieved=true;
    console.log(res.data);
   
  }, err => {
   console.log(err);
  });

 

  }
onSubmit(){
  //this should be placed inside the success of the method
  console.log('here is the email being sent');
  this.sendEmail=false;
}
}








 


  
 

 
  

  


