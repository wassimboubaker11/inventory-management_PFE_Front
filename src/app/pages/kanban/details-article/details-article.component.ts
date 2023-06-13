import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Variant } from 'src/app/core/models/variant';

import { ArticleService } from 'src/app/core/services/article.service';
import { OptionService } from 'src/app/core/services/option.service';
import { VariantService } from 'src/app/core/services/variant.service';

@Component({
  selector: 'app-details-article',
  templateUrl: './details-article.component.html',
  styleUrls: ['./details-article.component.scss']
})
export class DetailsArticleComponent implements OnInit {
quantity:any
maxQuantity: number;
  article:any

  idarticle:any

  breadCrumbItems: Array<{}>;

  option:any

  picture:any

  nomvariant:any

 variant:Variant = new Variant();
 @Input() variants: any[];

  selectedSubOptions: number[] = [];

  constructor(private variantservice:VariantService,private optionservice:OptionService,private modalService: NgbModal,private router:Router , private formBuilder: FormBuilder,private articleservice : ArticleService , private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Nazox' }, { label: 'Details', active: true }];

    this.idarticle = this.route.snapshot.params['id'];
     console.log(this.idarticle);
    
     this.getarticlebyid();
     this.getvariantbyidarticle();

  }



  getarticlebyid(){
    
    this.articleservice.getarticlebyid(this.idarticle).subscribe(
      responce=>{
        this.article=responce
        console.log(responce)
      },
      err=>{
        console.log(err)
      }
    )
  }

  calculateMaxQuantity() {
    const totalQuantity = this.variants.reduce((total, variant) => total + variant.quantity, 0);
    this.maxQuantity = this.article.quantite - totalQuantity;
  }

  openModal(content: any) {
    this.calculateMaxQuantity();
    this.getAlloption();
    this.modalService.open(content, { centered: true });
    this.quantity=null;
    this.selectedSubOptions = [];
    this.nomvariant=null;
  }

  getAlloption(){
    this.optionservice.getalloption().subscribe(
      responce=>{
        this.option=responce
        console.log(responce)
        this.variant=new Variant;
      },
      err=>{
        console.log(err)
      }
    )
  }

  savevariant(){
    const request = { sousOptions: this.selectedSubOptions , quantity:this.quantity , nom:this.nomvariant };
    this.variantservice.addvariant(request,this.idarticle).subscribe(
      responce=>{
        this.variant=responce
       
        console.log(responce)
        this.ngOnInit();
        this.modalService.dismissAll();
        this.quantity=null;
        this.selectedSubOptions = [];
        this.nomvariant=null;
      },
      err=>{
        console.log(err)
      }
    )

    
  }


  isSelectedSubOption(option: any, subOption: any): boolean {
    return this.selectedSubOptions[option.idoption] === subOption.idsousoption;
  }
  
  toggleSubOption(option: any, subOption: any): void {
    this.selectedSubOptions[option.idoption] = subOption.idsousoption;
  }

  getvariantbyidarticle(){
    this.variantservice.getvariantbyidarticle(this.idarticle).subscribe(
      responce=>{
        this.variants=responce
        console.log(responce)
      },
      err=>{
        console.log(err)
      }
    )
  }
}

  // toggleSubOption(subOptionId: number): void {
  //   const index = this.selectedSubOptions.indexOf(subOptionId);
  //   if (index === -1) {
  //     // Add sub-option to selected list
  //     this.selectedSubOptions.push(subOptionId);
  //     console.log(this.selectedSubOptions)
  //   } else {
  //     // Remove sub-option from selected list
  //     this.selectedSubOptions.splice(index, 1);
  //     console.log(this.selectedSubOptions)
  //   }
  // }


//   getUniqueOptions(sousOptions: any[]): any[] {
//   const options: any[] = [];
//   for (const sousOption of sousOptions) {
//     const option = options.find(opt => opt.option.idoption === sousOption.option.idoption);
//     if (!option) {
//       options.push({
//         option: sousOption.option
//       });
//     }
//   }
//   return options;
// }

// getRowCount(sousOptions: any[], option: any): number {
//   return sousOptions.filter(subOption => subOption.option.idoption === option.option.idoption).length;
// }

// getSubOptionText(sousOptions: any[], option: any): string {
//   const subOptions = sousOptions.filter(subOption => subOption.option.idoption === option.option.idoption);
//   return subOptions.map(subOption => subOption.nom).join(', ');
// }

  





