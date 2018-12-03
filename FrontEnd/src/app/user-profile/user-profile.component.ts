import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserDTO } from './data/userDTO';
import { AuthService } from '../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import{Country} from '../search/search.component';
import {Major} from '../search/search.component';
import {Uni} from '../search/search.component';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [FormBuilder, ReactiveFormsModule, FormsModule, UserDTO],

})



export class UserProfileComponent implements OnInit {
  // we get the user by id in here
  successMsg:string;
  errorMsg:string;

  error :boolean=false;
  success:boolean=false;

  currentUser;
  isRetrieved:boolean;
  

  // majors=["Computer Science","Dmet","Business Informatics","Applied Arts",
  // "Management","Electronics","Law","Pharmacy","Communication","Networks",
  // "Mechatronics","Production","Material"];

  // countries=["Germany","USA","England","Egypt","Switzerland","Canada","Japan","Autsralia"];
 
  countries: Country[] = [
    { value: 'NA', viewValue: '--' },
    { value: 'finland', viewValue: 'Finland' },
    { value: 'denmark', viewValue: 'Denmark' },
    { value: 'belgium', viewValue: 'Belgium' },
    { value: 'greece', viewValue: 'Greece' },
    { value: 'italy', viewValue: 'Italy' },
    { value: 'england', viewValue: 'England' },
    { value: 'france', viewValue: 'France' },
    { value: 'germany', viewValue: 'Germany' },
    { value: 'spain', viewValue: 'Spain' },
    { value: 'austria', viewValue: 'Austria' }

  ];
  unis: Uni[] = [
    { value: 'NA', viewValue: '--' },
    { value: 'tum', viewValue: 'TUM' },
    { value: 'ulm', viewValue: 'ULM' },
    { value: 'humboldtuniversityofberlin', viewValue: 'Humboldt University of Berlin' },
    { value: 'heidelberguniversity', viewValue: 'Heidelberg University' },  
    { value: 'universityofoxford', viewValue: 'University of Oxford' },
    { value: 'universityofcambridge', viewValue: 'University of Cambridge' },
    { value: 'universityofedinburgh', viewValue: 'University of Edinburgh' },
    { value: 'universityofcopenhagen', viewValue: 'University of Copenhagen' },
    { value: 'ecolepolytechnique', viewValue: 'École Polytechnique' },
    { value: 'universityoffreiburg', viewValue: 'University of Freiburg' }
  ];
  majors: Major[] = [
    { value: 'law', viewValue: 'Law' },
    { value: 'pharmacy', viewValue: 'Pharmacy' },
    { value: 'mechatronics', viewValue: 'Mechatronics' },
    { value: 'production', viewValue: 'Production' },
    { value: 'material', viewValue: 'Material' },
    { value: 'communication', viewValue: 'Communications' },
    { value: 'networks', viewValue: 'Networks' },
    { value: 'businessinformatics', viewValue: 'Business Informatics' },
    { value: 'appliedarts', viewValue: 'Applied Arts' },
    { value: 'management', viewValue: 'Management' },
    { value: 'electronics', viewValue: 'Electronics' },
    { value: 'dmet', viewValue: 'DMET' },
    { value: 'computerscience', viewValue: 'Computer Science' },
    { value: 'mechatronics', viewValue: 'Mechatronics' }
  ];
 


  selectedfile;
  fd;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('userToken')
    })
  };



  formData: FormGroup = this.formBuilder.group({
    name: [null,[Validators.maxLength(10)]],
    bachCountry: [null],
    bachYear: [null],
    bachUni: [null],
    major: [null],
    info: [null]

  });

  editProfile = false;

  constructor(private http: HttpClient, private auth: AuthService,
     private formBuilder: FormBuilder, private reactiveFormModule: ReactiveFormsModule) {
     

  }
  // onFileSelected(event){
  //  this.selectedfile =event.target.files[0];
  //  console.log(event);
  // }

// onUpload(){
//   //from Data is used to send files
//   this.fd = new FormData();
//   this.fd.append('image',this.selectedfile,this.selectedfile.name);
//   //here i give him the fd but take a look at back end what he expects to take from us
//   this.http.patch(environment.domain+'user/updateImage',this.fd).subscribe(
//    res=>{
//      console.log(res);
//    },err=>{
//      console.log(err);
//    }
//    )
// }

  ngOnInit() {
    // get the userDTo here from the data base
     this.isRetrieved=false;
     this.http.get<any>(environment.domain+'user/'+this.auth.getCurrentUser()._id)
     .subscribe((res: any) => {
      this.currentUser=res.data;
      this.isRetrieved=true;
      console.log(res.data);
      console.log(this.unis);
      console.log(this.unis[0].value +""+ this.unis[0].viewValue);
     
    }, err => {
     console.log(err);
     this.errorMsg=err.error.msg;
     this.error=true;

    });

   

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
    this.success=false;
    this.error=false;
    console.log(this.currentUser);
    this.editProfile = true;
    this.initialize();


  }
  // submit the user data edited to the db with the id
  // take the data from the form inside the userDTO to send todb
  onSubmit(): void {
    let updatedUser={
      name : this.formData.controls.name.value,
     bachYear : this.formData.controls.bachYear.value,
     bachUni : this.formData.controls.bachUni.value,
      bachCountry :this.formData.controls.bachCountry.value,
     major : this.formData.controls.major.value,
      info : this.formData.controls.info.value
    }

   console.log(this.formData.controls.name.value);
    this.http.patch(environment.domain + 'user/update', updatedUser, this.httpOptions)
      .subscribe((data: any) => {
        this.editProfile = false;
        this.error=false;
        console.log(data);
        this.successMsg=data.msg;
        this.success=true;
        this.ngOnInit();
      }, (err: any) => {
        console.log(err);
        this.errorMsg=err.error.msg;
        this.error=true;
      });

  }

}
