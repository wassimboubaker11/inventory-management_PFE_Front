import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Option } from 'src/app/core/models/option';
import { SousOption } from 'src/app/core/models/sous-option';
import { OptionService } from 'src/app/core/services/option.service';
import { SousOptionService } from 'src/app/core/services/sous-option.service';
import { VariantService } from 'src/app/core/services/variant.service';
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
  constructor(private modalService: NgbModal, private optionservice:OptionService, private route: ActivatedRoute ,private router:Router , private sousoptionservice:SousOptionService) { }

  breadCrumbItems: Array<{}>;

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Nazox' }, { label: 'Option', active: true }];
    this.idoption = this.route.snapshot.paramMap.get('id')
    console.log(this.idoption)

    this.getoptionbyID();
    this.getallsous_optionByOption();
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
      },
      err=>{
        console.log(err)
      }
    )
  }
  openModal(content: any) {
    this.modalService.open(content, { centered: true });
  }
  addSousOption(){
this.sousoptionservice.savesous_option(this.sous_optionn , this.idoption).subscribe(
  responce=>{
    this.ngOnInit();
    this.modalService.dismissAll();
    this.sous_optionn=new SousOption();
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
        
          this.sousoptionservice.deletesous_option(id).subscribe(
              
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
}




