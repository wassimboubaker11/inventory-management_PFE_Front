import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import Swal from 'sweetalert2';


import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Depot } from 'src/app/core/models/depot';

import { DepotService } from 'src/app/core/services/depot.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
/**
 * Chat component
 */
export class ChatComponent implements OnInit {

     searchQuery: string = '';

     currentPage = 1;

    depot:Depot=new Depot();

    depots:any

    id:any;

  // bread crumb items
  breadCrumbItems: Array<{}>;

  constructor(private modalService: NgbModal,public formBuilder: FormBuilder , private router:Router , private depotservice:DepotService) {
  }

  searchDepots() {
    if (this.searchQuery) {
      this.depots = this.depots.filter((depot) => {
        return (
          depot.nom?.toLowerCase().includes(this.searchQuery.toLowerCase())  ||
          depot.numero?.toString().includes(this.searchQuery) ||
          depot.adresse?.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      });
    } else {
      this.ngOnInit();
    }
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Nazox' }, { label: 'Chat', active: true }];
    this.getalldepot();
    };

    
    /**
   * Modal Open
   * @param content modal content
   */

    openModal(content: any) {
      this.modalService.open(content, { centered: true });
    }

    openModall(contentt: any , iddepot:any) {
      this.modalService.open(contentt, { centered: true });
      this.id = iddepot;
      this.depotservice.getdepotbyid(this.id).subscribe(
        responce=>{
          this.depot = responce;
          console.log(responce)
        },
        err=>{
          console.log(err)
        }
      )
    }

    saveDepot(){
      this.depotservice.adddepot(this.depot).subscribe(
        responce=>{
          console.log(responce)
          this.ngOnInit();
          this.modalService.dismissAll();
          this.depot=new Depot();
          
        },
        err=>{
          console.log(err)
        })
    }

    getalldepot(){
      this.depotservice.getalldepot().subscribe(
        responce=>{
          this.depots = responce;
          console.log(responce)
        },
        err=>{
          console.log(err)
        })
    }

    updateDepot(){
      this.depotservice.updatedepot(this.depot , this.id ).subscribe(
        responce=>{
          console.log(responce)
          this.ngOnInit();
          this.modalService.dismissAll();
          this.depot=new Depot();
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
          
            this.depotservice.deletedepot(id).subscribe(
                
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
