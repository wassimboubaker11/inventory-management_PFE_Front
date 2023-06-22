import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/core/models/category';
import { CategoryService } from 'src/app/core/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  id:any
  categorys:any
category:Category=new Category();
  // bread crumb items
  breadCrumbItems: Array<{}>;

  validationForm: FormGroup;

  submitted: boolean = false;

  constructor(private categoryservice:CategoryService,private modalService: NgbModal,public formBuilder: FormBuilder ) { 
    this.validationForm = this.formBuilder.group({ // Initialize validationForm with form controls and validators
      nom: ['', Validators.required],
      
    });
  
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Nazox' }, { label: 'Catégorie', active: true }];
    this.getallcategory();
  }

     /**
   * Modal Open
   * @param content modal content
   */
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

    openModall(content: any , idcategory:any) {
      this.modalService.open(content, { centered: true });
      this.id = idcategory
      this.categoryservice.getcategorybyid(this.id).subscribe(
        responce=>{
          this.category=responce
          console.log(responce)
        },
        err=>{
          console.log(err)
        }
      )
    }



  getallcategory(){
    this.categoryservice.getAllcategory().subscribe(
      responce=>{
        this.categorys=responce
        console.log(responce)
      },
      err=>{
        console.log(err)
      })
     }
     savecategory(){
      this.submitted = true;
      if (this.validationForm.valid) {
      this.categoryservice.addcategory(this.category).subscribe(
        responce=>{
          console.log(responce)
          this.ngOnInit();
        this.modalService.dismissAll();
        this.category=new Category();
        this.validationForm.reset();
        
        this.submitted = false;
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
     modalCloseClick() {
      this.submitted = false;
      this.validationForm.reset();
    }

     updateCategory(){
      this.categoryservice.updatedecategory(this.category , this.id).subscribe(
        responce=>{
          console.log(responce)
          this.ngOnInit();
          this.modalService.dismissAll();
          this.category=new Category();
        },
        err=>{
          console.log(err)
        })}

     confirm(idcategory:any) {
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
          
          this.categoryservice.deletecategorybyid(idcategory).subscribe(
            responce=>{
              
              console.log(responce)
              this.ngOnInit();
            },
            err=>{console.log(err)}
          )
          
          Swal.fire('Deleted!', 'Depot has been deleted.', 'success');
          
        }
        
      });
}}
