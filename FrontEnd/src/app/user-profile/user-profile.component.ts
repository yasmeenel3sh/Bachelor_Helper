import { Component, OnInit} from '@angular/core';
import {FormBuilder,FormGroup, Validators,ReactiveFormsModule, FormsModule} from "@angular/forms";
import {UserDTO} from "./data/userDTO";
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [FormBuilder,ReactiveFormsModule,FormsModule,UserDTO,],
 
})

export class UserProfileComponent implements OnInit {
   currentUser;

  formData: FormGroup = this.formBuilder.group({
    name: ['usr',[Validators.required]],
    country: ['egy',[Validators.required]],
    major: ['met'],
    year: ['2016'],
    university: ['guc'],
    info:['  ']
    
  });

 editProfile:boolean=false;
  constructor(private auth:AuthService,private formBuilder: FormBuilder,private reactiveFormModule: ReactiveFormsModule) { 
          //static data replaced by the call to the method .
            

  }

  ngOnInit() {
    //get the userDTo here from the data base
   this.currentUser=this.auth.getCurrentUser();
   console.log(this.currentUser);
    // this.currentUser=new UserDTO();
    // this.currentUser.email="ahmed.alaa@gmail.com";
    // this.currentUser.country="egypt";
    // this.currentUser.major="cs";
    // this.currentUser.university="guc";
    // this.currentUser.name="ahmed";
    // this.currentUser.year="1998";
    // this.currentUser.info="My bach Abroad was one of the best experiences that i had in life .I encourage every studet o go to the same country i was and reside in the same place i was its just wonderfull experience full of enjoyment and learning ,i will give here info about the place i resided and the phone number of the man to rent from and give full description of transportation food money you will job opurtunities there and much more ";
    // this.currentUser.info=2;
    
  }
  initialize ():void{

    this.formData.controls.year.setValue(this.currentUser.year); 
    this.formData.controls.name.setValue(this.currentUser.name);
    this.formData.controls.country.setValue(this.currentUser.country);
    this.formData.controls.major.setValue(this.currentUser.major);
    this.formData.controls.university.setValue(this.currentUser.university);
    this.formData.controls.bachDetails.setValue(this.currentUser.info);
  }
  //copy the user data in the form .
   enableEdit(): void{
    this.initialize();
     console.log(this.formData);
       this.editProfile=true;
      
  }
//submit the user data edited to the db with the id 
//take the data from the form inside the userDTO to send todb
onSubmit():void{
 this.currentUser.year= this.formData.controls.year.value;
 this.currentUser.major= this.formData.controls.major.value;
 this.currentUser.university= this.formData.controls.university.value;
 this.currentUser.country= this.formData.controls.country.value;
 this.currentUser.info= this.formData.controls.bachDetails.value;
 this.currentUser.name= this.formData.controls.name.value;
//here is the service that updates a user
  this.editProfile=false; 
console.log(this.currentUser);

}
}
