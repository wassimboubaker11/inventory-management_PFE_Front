import { Component, OnInit, ViewChild ,} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';


import { AdminService } from 'src/app/core/services/admin.service';
import { Admin } from 'src/app/account/auth/signup/admin';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

/**
 * Calendar Component
 */
export class CalendarComponent implements OnInit {

  // bread crumb items

  breadCrumbItems: Array<{}>;

  admin:Admin;
  image:any;
  idadmin:any;

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder , private adminservice:AdminService) { }
  
  

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Nazox' }, { label: 'Calendar', active: true }];
    
    this.getalladmin();

    
  }

  getalladmin(){
      this.adminservice.getallAdmin().subscribe(
        responce=>{
          this.admin = responce
          console.log(responce)
          this.image=responce.logo
        },
        err=>{
          console.log(err)
        }
      )
  }

  activeadmin(id:any , admin:any ){

      this.adminservice.valideadmin(id , admin).subscribe(
        
      responce=>{
        console.log(responce)
        this.ngOnInit();
        
      },
      err=>{
        console.log(err)
      }
    )
  }

  deleteadmin(id:any){
    this.adminservice.deleteadmin(id).subscribe(
        
      responce=>{
        console.log(responce)
        this.ngOnInit();
        
      },
      err=>{
        console.log(err)
      }
    )
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
        
          this.adminservice.deleteadmin(id).subscribe(
              
            responce=>{
              console.log(responce)
              this.ngOnInit();
              
            },
            err=>{
              console.log(err)
            }
          )
        
        Swal.fire('Deleted!', 'company has been deleted.', 'success');
        
      }
      
    });
  }




   // getadminbyid(){
  //   this.adminservice.getadminbyid().subscribe(
  //     responce=>{
        
  //       console.log(responce)
  //     },
  //     err=>{
  //       console.log(err)
  //     }
  //   )
  // }
}

 

  


