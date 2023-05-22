import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '../../../core/services/auth.service';

import { UserProfileService } from '../../../core/services/user.service';
import { AdminService } from 'src/app/core/services/admin.service';
import { Admin } from './admin';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, AfterViewInit {

  admin:Admin = new Admin();
  logo:any;

  signupForm: FormGroup;
  // submitted = false;
  // error = '';
  // successmsg = false;

  // set the currenr year
  // year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService,
              private userService: UserProfileService , private adminservice:AdminService) { }

  selectlogo(e:any){
    this.logo = e.target.files[0];
    console.log(this.logo)
  }            

  onSubmit(){
    let formData = new FormData()
    formData.append('admin', JSON.stringify(this.admin));
    // formData.append('name' , this.admin.name)
    // formData.append('email' , this.admin.email)
    // formData.append('tel' , this.admin.tel)
    // formData.append('adresse' , this.admin.adresse)
    // formData.append('site' , this.admin.site)
    formData.append('logo' , this.logo)

    this.adminservice.ajouteradmin(formData).subscribe(
      responce=>{
          console.log(responce)
          this.router.navigate(['/account/login']);
      },
      err=>{
        console.log(err)
      }
    )
    
  }

  ngOnInit() {
    // document.body.removeAttribute('data-layout');
    // document.body.classList.add('auth-body-bg');

    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', Validators.required],
      adresse: ['', Validators.required],
      site: ['', Validators.required],
      fileUpload: ['', Validators.required],

    });
  }

  ngAfterViewInit() {
    
  }

  // convenience getter for easy access to form fields
  // get f() { return this.signupForm.controls; }

  /**
   * On submit form
   */
 // onSubmit() {
    // this.submitted = true;

    // // stop here if form is invalid
    // if (this.signupForm.invalid) {
    //   return;
    // } else {
    //   if (environment.defaultauth === 'firebase') {
    //     this.authenticationService.register(this.f.email.value, this.f.password.value).then((res: any) => {
    //       this.successmsg = true;
    //       if (this.successmsg) {
    //         this.router.navigate(['/']);
    //       }
    //     })
    //       .catch(error => {
    //         this.error = error ? error : '';
    //       });
    //   } else {
    //     this.userService.register(this.signupForm.value)
    //       .pipe(first())
    //       .subscribe(
    //         data => {
    //           this.successmsg = true;
    //           if (this.successmsg) {
    //             this.router.navigate(['/account/login']);
    //           }
    //         },
    //         error => {
    //           this.error = error ? error : '';
    //         });
    //   }
    // }
 // }
}
