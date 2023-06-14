import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Gestionaire } from 'src/app/core/models/gestionaire';
import { Option } from 'src/app/core/models/option';
import { GestionaireService } from 'src/app/core/services/gestionaire.service';
import { OptionService } from 'src/app/core/services/option.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit {
  
  breadCrumbItems: Array<{}>;

  option:Option= new Option();
  
  options:any
  validationForm: FormGroup;

  constructor(private modalService: NgbModal, private optionservice:OptionService,public formBuilder: FormBuilder ) { 
    this.validationForm = this.formBuilder.group({ // Initialize validationForm with form controls and validators
    nom: ['', Validators.required],
    
  });}

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Nazox' }, { label: 'Option', active: true }];
    this.getalloption();

    
  }

   /**
   * Modal Open
   * @param content modal content
   */
  openModal(content: any) {
    this.modalService.open(content, { centered: true });
  }
  saveOption(){
    if (this.validationForm.valid) {
    this.optionservice.saveoption(this.option).subscribe(
      responce=>{
        console.log(responce)
        this.ngOnInit();
        this.modalService.dismissAll();
        this.validationForm.reset();
      },
      err=>{console.log(err)}
    )
  } else {
    // Handle form validation errors or display a message to the user
    // For example:
    console.log("Form is invalid. Please fill in all required fields.");
  }
  }

  getalloption(){
    this.optionservice.getalloption().subscribe(
      responce=>{
        this.options=responce;
        console.log(responce)
        this.option= new Option();
      },
      err=>{console.log(err)}
    )
  }



  confirm(idoption:any) {
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
        
        this.optionservice.deleteoption(idoption).subscribe(
          responce=>{
            
            console.log(responce)
            this.ngOnInit();
          },
          err=>{console.log(err)}
        )
        
        Swal.fire('Deleted!', 'Depot has been deleted.', 'success');
        
      }
      
    });

}





}
