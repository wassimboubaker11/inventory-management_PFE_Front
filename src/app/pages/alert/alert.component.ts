import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Alert } from 'src/app/core/models/alert';
import { AlertService } from 'src/app/core/services/alert.service';
import { ArticleService } from 'src/app/core/services/article.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  alert:Alert=new Alert();

  alerts:any

  articleOutAlert:any
idarticleselect:any
  breadCrumbItems: Array<{}>;
  constructor(private modalService: NgbModal, private alertservice:AlertService , private articleservice:ArticleService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Nazox' }, { label: 'Option', active: true }];
    this.getallalerts()
  }

     /**
   * Modal Open
   * @param content modal content
   */
     openModal(content: any) {
      this.modalService.open(content, { centered: true });
      this.getAllArticlewithOutAlert();
    }

    onArticleChange(event): void {
      this.idarticleselect = event.target.value;
      console.log('Selected depot ID:', this.idarticleselect);
    }

    getallalerts(){
      this.alertservice.getallalert().subscribe(
        response=>{
            this.alerts=response;
            console.log(response)
        },
        err=>{
          console.log(err)
        }
      )
    }
    getAllArticlewithOutAlert(){
      this.articleservice.getAllArticlewithOutAlert().subscribe(
        response=>{
            this.articleOutAlert=response;
            console.log(response)
        },
        err=>{
          console.log(err)
        }
      )
    }

    saveAlert(){
    this.alertservice.savealert(this.alert , this.idarticleselect).subscribe(
      response=>{
        this.ngOnInit();
          this.modalService.dismissAll();
          this.alert=new Alert();
          console.log(response)
      },
      err=>{
        console.log(err)
      }
    )
    }


    confirm(idalert:any) {
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
          
         
            this.alertservice.deletealertbyid(idalert).subscribe(
              response=>{
                console.log(response)
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
