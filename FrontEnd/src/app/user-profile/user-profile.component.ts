import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserDTO } from './data/userDTO';
import { AuthService } from '../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [FormBuilder, ReactiveFormsModule, FormsModule, UserDTO],

})



export class UserProfileComponent implements OnInit {
  // we get the user by id in here
   updatedUser: UserDTO;
  currentUser;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('userToken')
    })
  };



  formData: FormGroup = this.formBuilder.group({
    name: ['usr', [Validators.required]],
    bachCountry: ['egy', [Validators.required]],
    bachYear: ['2016'],
    bachUni: ['guc'],
    major: ['met'],
    info: ['  ']

  });

  editProfile = false;

  constructor(private http: HttpClient, private auth: AuthService,
     private formBuilder: FormBuilder, private reactiveFormModule: ReactiveFormsModule) {
     this.updatedUser = new UserDTO();

  }

  ngOnInit() {
    // get the userDTo here from the data base
    this.currentUser = this.auth.getCurrentUser();

    console.log(this.currentUser);

  }
  initialize(): void {
    // we initialiae the form with tha data of the user who wants to edit
    this.formData.controls.name.setValue(this.currentUser.name);
    this.formData.controls.bachCountry.setValue(this.currentUser.bachCountry);
    this.formData.controls.bachYear.setValue(this.currentUser.bachYear);
    this.formData.controls.bachUni.setValue(this.currentUser.bachUni);
    this.formData.controls.major.setValue(this.currentUser.major);
    this.formData.controls.info.setValue(this.currentUser.info);
  }

  // copy the user data in the form .
  enableEdit(): void {
    this.editProfile = true;
    this.initialize();


  }
  // submit the user data edited to the db with the id
  // take the data from the form inside the userDTO to send todb
  onSubmit(): void {
    this.updatedUser.name = this.formData.controls.name.value;
    this.updatedUser.bachYear = this.formData.controls.bachyear.value;
    this.updatedUser.bachUni = this.formData.controls.bachUni.value;
    this.updatedUser.bachCountry = this.formData.controls.bachCountry.value;
    this.updatedUser.major = this.formData.controls.major.value;
    this.updatedUser.info = this.formData.controls.info.value;
    // here is the service that updates a user


    this.http.patch(environment.domain + 'user/update', this.currentUser, this.httpOptions)
      .subscribe((data: any) => {
        this.editProfile = false;
        console.log(data);
      }, (err: any) => {
        console.log(err);
      });

  }

}
