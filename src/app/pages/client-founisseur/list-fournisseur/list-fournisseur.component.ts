import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import bsCustomFileInput from 'bs-custom-file-input';
import { ClientFournisseur } from 'src/app/core/models/client-fournisseur';
import { ClientFournisseurService } from 'src/app/core/services/client-fournisseur.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-fournisseur',
  templateUrl: './list-fournisseur.component.html',
  styleUrls: ['./list-fournisseur.component.scss']
})
export class ListFournisseurComponent implements OnInit {
 photo:any

selectedPicture: any;

id:any;

founisseurs:any

founisseur:ClientFournisseur=new ClientFournisseur();

breadCrumbItems: Array<{}>;

  constructor(private modalService: NgbModal, private clienttfournisseurservice:ClientFournisseurService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Nazox' }, { label: 'Clients', active: true }];
    bsCustomFileInput.init();
    this.getAllFournisseur()
  }

    /**
   * Modal Open
   * @param content modal content
   */
    openModal(content: any) {
      this.founisseur=new ClientFournisseur;
      this.selectedPicture = null;
      this.modalService.open(content, { centered: true });
    }

    getAllFournisseur(){
      this.clienttfournisseurservice.getAllFournisseur().subscribe(
        responce=>{
          this.founisseurs=responce
          this.founisseur=new ClientFournisseur();
          console.log(responce)
        },
        err=>{
          console.log(err)
        }
      )
    }

    openModall(contentt: any , idfournisseur:any) {
      this.selectedPicture = null;
      this.modalService.open(contentt, { centered: true });
      this.id=idfournisseur;
      this.clienttfournisseurservice.getGetClient_FournisseurbyID(this.id).subscribe(
        responce=>{
          this.founisseur=responce
          this.photo=responce.photo
          console.log(responce)
        },
        err=>{
          console.log(err)
        }
      )
    }

    choosecontry(event): void {
      this.founisseur.country = event.target.value;
      console.log('Selected depot ID:', this.founisseur.country);
    }

    
 


  selectpicture(e:any){
    this.photo = e.target.files[0];
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.selectedPicture = e.target.result;
      
    };
    reader.readAsDataURL(file);
    
    console.log(this.photo)
  } 


  saveFournisseur(){
    let formData = new FormData()

    formData.append('fournisseur', JSON.stringify(this.founisseur));
    formData.append('photo' , this.photo)
    this.clienttfournisseurservice.saveFounisseur(formData).subscribe(
      responce=>{
        this.ngOnInit()
        this.modalService.dismissAll();
        
        console.log(responce)
      },
      err=>{
        console.log(err)
      }
    )
  }

  UpdateFournisseur(){
    const formData = new FormData();
    formData.append('fournisseur', JSON.stringify(this.founisseur));
    formData.append('photo' , this.photo)
    this.clienttfournisseurservice.updateFournisseur(this.id , formData).subscribe(
              
      responce=>{
        console.log(responce)
        this.ngOnInit();
        this.modalService.dismissAll();
        this.founisseur=new ClientFournisseur();
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
        
          this.clienttfournisseurservice.deleteFounisseur(id).subscribe(
              
            responce=>{
              console.log(responce)
              this.ngOnInit();
              
            },
            err=>{
              console.log(err)
            }
          )
        
        Swal.fire('Deleted!', 'Depot has been deleted.', 'success');
        
      }
      
    });

}

}
