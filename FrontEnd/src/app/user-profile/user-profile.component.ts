import { Component, OnInit, NgModule } from '@angular/core';
import {FormBuilder,FormGroup, Validators,ReactiveFormsModule, FormsModule} from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [FormBuilder,ReactiveFormsModule,FormsModule],
 
})
// @NgModule({
//   imports: [
//     BrowserModule,
//     ReactiveFormsModule,
//     FormsModule
//   ],
// })
export class UserProfileComponent implements OnInit {


  formData: FormGroup = this.formBuilder.group({
    
    userName: ['usr',[Validators.required,Validators.maxLength(200)]],
    country: ['egy',[Validators.required,Validators.maxLength(200)]],
    Major: ['met',[Validators.maxLength(200)]],
    year: ['2016', [Validators.required,Validators.maxLength(50)]],
    university: ['guc ', [Validators.required,Validators.maxLength(50)]],
    
  });

 editProfile:boolean=false;
  constructor(private formBuilder: FormBuilder,private reactiveFormModule: ReactiveFormsModule) { 

  }

  ngOnInit() {

  }
   enableEdit(): void{
     console.log('hello');
       this.editProfile=true;
  }

}
