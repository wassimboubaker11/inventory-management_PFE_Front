import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import bsCustomFileInput from 'bs-custom-file-input';
import { ClientFournisseur } from 'src/app/core/models/client-fournisseur';
import { ClientFournisseurService } from 'src/app/core/services/client-fournisseur.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss']
})
export class ListClientComponent implements OnInit {
clients:any

client:ClientFournisseur=new ClientFournisseur();
id:any
photo:any

selectedPicture: any;

breadCrumbItems: Array<{}>;

  constructor(private modalService: NgbModal, private clienttfournisseurservice:ClientFournisseurService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Nazox' }, { label: 'Clients', active: true }];
    bsCustomFileInput.init();
    this.getAllClient();
  }
    /**
   * Modal Open
   * @param content modal content
   */
    openModal(content: any) {
      this.client=new ClientFournisseur;
      this.selectedPicture = null;
      this.modalService.open(content, { centered: true });
    }

  getAllClient(){
    this.clienttfournisseurservice.getAllClient().subscribe(
      responce=>{
        this.clients=responce
        this.client=new ClientFournisseur();
        console.log(responce)
      },
      err=>{
        console.log(err)
      }
    )
  }
 
  openModall(contentt:any , idclient:any){
    this.modalService.open(contentt, { centered: true });
    this.id=idclient;
    this.clienttfournisseurservice.getGetClient_FournisseurbyID(this.id).subscribe(
      responce=>{
        this.client=responce
        this.photo=responce.photo
        console.log(responce)
      },
      err=>{
        console.log(err)
      }
    )
    
  }

  choosecontry(event): void {
    this.client.country = event.target.value;
    console.log('Selected Country ID:', this.client.country);
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

  

  saveClient(){
    let formData = new FormData()

    formData.append('client', JSON.stringify(this.client));
    formData.append('photo' , this.photo)
    this.clienttfournisseurservice.saveClient(formData).subscribe(
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
        
          this.clienttfournisseurservice.deleteclient(id).subscribe(
              
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

UpdateClient(){
  const formData = new FormData();
  formData.append('client', JSON.stringify(this.client));
  formData.append('photo' , this.photo)
  this.clienttfournisseurservice.updateClient(this.id , formData).subscribe(
              
    responce=>{
      console.log(responce)
      this.ngOnInit();
      this.modalService.dismissAll();
      this.client=new ClientFournisseur();
    },
    err=>{
      console.log(err)
    }
  )
}
}
