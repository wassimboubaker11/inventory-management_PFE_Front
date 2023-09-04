import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Option } from 'src/app/core/models/option';
import { SousOption } from 'src/app/core/models/sous-option';
import { OptionService } from 'src/app/core/services/option.service';
import { SousOptionService } from 'src/app/core/services/sous-option.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-option',
  templateUrl: './edit-option.component.html',
  styleUrls: ['./edit-option.component.scss']
})
export class EditOptionComponent implements OnInit {
  sous_optionn:SousOption=new SousOption();
  option:Option=new Option();
  idoption:any
  sous_option:any

  validationForm: FormGroup;

  submitted: boolean = false;
  
  constructor(public formBuilder: FormBuilder,private modalService: NgbModal, private optionservice:OptionService, private route: ActivatedRoute ,private router:Router , private sousoptionservice:SousOptionService) { 
    this.validationForm = this.formBuilder.group({
      nom: ['', Validators.required]
    });
  }

  breadCrumbItems: Array<{}>;

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Wind' }, { label: 'Update Option', active: true }];
    this.idoption = this.route.snapshot.paramMap.get('id')
    console.log(this.idoption)

    this.getoptionbyID();
    this.getallsous_optionByOption();
   
  }
  alert(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1100
    });
  }
  getoptionbyID(){
    this.optionservice.getoptionbyID(this.idoption).subscribe(
      response=>{
        this.option =response;
        console.log(response)
        
      },
      err=>{
        console.log(err)
      }
    )
  }
  getallsous_optionByOption(){
    this.sousoptionservice.getAllsou_optionByIdOption(this.idoption).subscribe(
      response=>{
        this.sous_option =response;
        console.log("bara mrgl",response)
        
      },
      err=>{
        console.log(err)
      }
    )
  }

  updateoption(){
    this.optionservice.updateoption(this.option , this.idoption).subscribe(
      responce=>{
        console.log(responce)
        this.router.navigate(['/option']); 
        this.alert();
      },
      err=>{
        console.log(err)
      }
    )
  }
  openModal(content: any) {
    const modalRef = this.modalService.open(content, { centered: true });

    modalRef.result.then(
      (result) => {
        if (result === 'close click') {
          this.modalCloseClick();
        }
      },
      (reason) => {
        // Handle modal dismissal (if needed)
      }
    );
  }


    addSousOption() {
    this.submitted = true;
    if (this.validationForm.valid) {
      this.sousoptionservice.savesous_option(this.sous_optionn, this.idoption).subscribe(
        responce => {
          this.ngOnInit();
          this.modalService.dismissAll();
          this.sous_optionn = new SousOption();
          console.log(responce);
          this.submitted = false;
          this.validationForm.reset();
          this.alert();
        },
        err => {
          console.log(err);
        }
      );
    } else {
      console.log("Form is invalid. Please fill in all required fields.");
    }
  }
  
  
  confirm(id:any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
        
          this.sousoptionservice.deletesous_option(id).subscribe(
              
            responce=>{
              console.log(responce)
              this.ngOnInit();
              
            },
            err=>{
              console.log(err)
            }
          )
        
        Swal.fire('Deleted!', 'Sous_Option has been deleted.', 'success');
        
      }
      
    });
  }

  modalCloseClick() {
    this.submitted = false;
    this.validationForm.reset();
  }
}




