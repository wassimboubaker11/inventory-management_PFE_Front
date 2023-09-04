import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Gestionaire } from 'src/app/core/models/gestionaire';

import { AdminService } from 'src/app/core/services/admin.service';
import { GestionaireService } from 'src/app/core/services/gestionaire.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  gestionaire:Gestionaire=new Gestionaire(); 
  breadCrumbItems: Array<{}>;
  user:any;
  id:any;
  admin:any;

  

 constructor(private gestionservice:GestionaireService ,private modalService: NgbModal , private adminservice:AdminService) { }


  ngOnInit(): void {
    
    this.breadCrumbItems = [{ label: 'Wind' }, { label: 'stock manager', active: true }];

      this.getadminbyemail(() => {
      this.getAllGestionairebyidadmin();
      });
    };

  getUserDATAFromToken(){
    let token = localStorage.getItem('token');
    if(token){
      let data = JSON.parse(window.atob(token.split('.')[1]))
      return data.sub;
    }
  }
  alert(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'compte activated and mail send',
      showConfirmButton: false,
      timer: 1300
    });
  }

  getadminbyemail(callback: () => void){
    this.admin = this.getUserDATAFromToken();
    this.adminservice.getadminbyemail(this.admin).subscribe(
      responce=>{
        this.admin=responce;
        this.id=this.admin.id;
        
        
        
        callback();
      },
      err=>{
          console.log(err);
      }
    )
    
  }

  getAllGestionairebyidadmin(){
    
    this.gestionservice.getAllGestionairebyidadmin(this.admin.id).subscribe(
      responce=>{
        this.user= responce;
        console.log(responce)
      },
      err=>{
          console.log(err);
      }
    )
  }

  

  openModal(content: any) {
    this.modalService.open(content, { centered: true });
  }

  activeadmin(idg: any, gestionaire: any) {
    if (gestionaire.valide) {
      this.gestionservice.activegestionaire(idg, gestionaire).subscribe(
        response => {
          console.log(response);
          this.ngOnInit();
          this.alert();
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.gestionservice.activegestionaire(idg, gestionaire).subscribe(
        response => {
          console.log(response);
          this.ngOnInit();
        },
        err => {
          console.log(err);
        }
      );
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
        
          this.gestionservice.deletegestionairebyid(id).subscribe(
              
            responce=>{
              console.log(responce)
              this.ngOnInit();
              
            },
            err=>{
              console.log(err)
            }
          )
        
        Swal.fire('Deleted!', 'User has been deleted.', 'success');
        
      }
      
    });
  }

   /**
   * Open extra large modal
   * @param exlargeModal extra large modal data
   */
   extraLarge(exlargeModal: any , idgestionaire:any) {
    this.modalService.open(exlargeModal, { size: 'xl' });
    this.gestionservice.getgestionaireById(idgestionaire).subscribe(
    
      responce=>{
        this.gestionaire=responce
        console.log("gestionaire",responce)
        this.ngOnInit();
        
      },
      err=>{
        console.log(err)
      }
    )
  }

 
}
