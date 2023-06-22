import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from 'src/app/account/auth/signup/admin';
import { Gestionaire } from 'src/app/core/models/gestionaire';
import { AdminService } from 'src/app/core/services/admin.service';
import { GestionaireService } from 'src/app/core/services/gestionaire.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  gestionaire:Gestionaire = new Gestionaire();
  photo:any
  gestionaireForm: FormGroup;

  idadmin:any

  admin:any
  user:any

  emailadmin:any

  breadCrumbItems: Array<{}>;

  validationForm: FormGroup;

  submitted: boolean = false;
  
  constructor(private router: Router , private formBuilder: FormBuilder , private gestionaireservice:GestionaireService, private adminservice:AdminService) {
    this.validationForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      cin: ['', Validators.required],
      tel: ['', Validators.required],
      dateOfBirthday: ['', Validators.required],
      address: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      codePostal: ['', Validators.required],
      photo: ['', Validators.required],
      description: ['', Validators.required],
      
      
    });
   }

  ngOnInit(): void {

    

    this.breadCrumbItems = [{ label: 'Nazox' }, { label: 'User', active: true }];

    this.getUserDATAFromToken();

    console.log(this.emailadmin)
    this.getadminbyemail()
    
  }

  choosecontry(event): void {
    this.gestionaire.country = event.target.value;
    console.log('Selected depot ID:', this.gestionaire.country);
  }

  selectpicture(e:any){
    this.photo = e.target.files[0];
    console.log(this.photo)
  } 

  cancel(){
    this.router.navigate(['/user']); 
  }

  saveGestionaire(){
    this.submitted = true;
    if (this.validationForm.valid) {
    let formData = new FormData()

    formData.append('user', JSON.stringify(this.gestionaire));
    formData.append('photo' , this.photo)
  this.gestionaireservice.savegestionaire(formData , this.idadmin).subscribe(
    responce=>{
      console.log(responce)
      this.validationForm.reset();
      this.submitted = false;
      this.router.navigate(['/user']); 
      
    },
    err=>{
      console.log(err)
      
    }
  )
} else {
  // Handle form validation errors or display a message to the user
  // For example:
  console.log("Form is invalid. Please fill in all required fields.");
}
  }

  getUserDATAFromToken(){
    let token = localStorage.getItem('token');
    if(token){
      let data = JSON.parse(window.atob(token.split('.')[1]))
      this.user=data
      this.emailadmin=this.user.sub
      return data;
      
    }  }

    getadminbyemail(){
      this.adminservice.getadminbyemail(this.emailadmin).subscribe(
        responce=>{
          this.admin=responce
          this.idadmin=responce.id
          console.log(this.idadmin)
          console.log(responce)
          
          
        },
        err=>{
          console.log(err)
          
        }
      )
    }

}
