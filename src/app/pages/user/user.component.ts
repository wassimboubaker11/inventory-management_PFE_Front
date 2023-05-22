import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AdminService } from 'src/app/core/services/admin.service';
import { GestionaireService } from 'src/app/core/services/gestionaire.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

 
  breadCrumbItems: Array<{}>;
  user:any;
  id:any;
  admin:any;

  

 constructor(private gestionservice:GestionaireService ,private modalService: NgbModal , private adminservice:AdminService) { }


  ngOnInit(): void {
    
    this.breadCrumbItems = [{ label: 'Nazox' }, { label: 'User', active: true }];

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

  activeadmin(idg:any , gestionaire:any){
    this.gestionservice.activegestionaire(idg , gestionaire).subscribe(
      responce=>{
        console.log(responce)
        this.ngOnInit();
      },
      err=>{
          console.log(err);
      }
    )
  }

 
}
