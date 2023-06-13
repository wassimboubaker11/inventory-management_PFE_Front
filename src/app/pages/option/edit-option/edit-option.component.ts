import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Option } from 'src/app/core/models/option';
import { OptionService } from 'src/app/core/services/option.service';

@Component({
  selector: 'app-edit-option',
  templateUrl: './edit-option.component.html',
  styleUrls: ['./edit-option.component.scss']
})
export class EditOptionComponent implements OnInit {
  option:Option=new Option();
  idoption:any
  constructor( private optionservice:OptionService, private route: ActivatedRoute ,private router:Router) { }

  breadCrumbItems: Array<{}>;

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Nazox' }, { label: 'Option', active: true }];
    this.idoption = this.route.snapshot.paramMap.get('id')
    console.log(this.idoption)

    this.getoptionbyID();
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
}




