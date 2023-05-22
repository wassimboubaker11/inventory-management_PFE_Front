import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import bsCustomFileInput from 'bs-custom-file-input';
import { Article } from 'src/app/core/models/article';
import { ArticleService } from 'src/app/core/services/article.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { DepotService } from 'src/app/core/services/depot.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {

article:Article =new Article();

picture:any;

articleForm: FormGroup;

depot:any

depotId:any

category:any
categoryId:any

selectedPicture: any;
  
breadCrumbItems: Array<{}>;

constructor( private articleservice:ArticleService , private formBuilder: FormBuilder, private router: Router , private depotservice:DepotService, private categoryservice:CategoryService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Nazox' }, { label: 'Kanban Board', active: true }];

    bsCustomFileInput.init();


    this.getalldepot();
    this.getallcategory();


    this.articleForm = this.formBuilder.group({
      nom: ['', Validators.required],
      ref_article: ['', Validators.required],
      num_serie: ['', Validators.required],
      code_barre: ['', Validators.required],
      marque: ['', Validators.required],
      prixachat: ['', Validators.required],
      prixvente: ['', Validators.required],
      quantite: ['', Validators.required],
      description: ['', Validators.required],
      picture: ['', Validators.required],
      status: ['', Validators.required],
      depot : ['', Validators.required],

    });

    
}
onCategoryChange(event): void {
  this.categoryId = event.target.value;
  console.log('Selected category ID:', this.categoryId);
}

onDepotChange(event): void {
  this.depotId = event.target.value;
  console.log('Selected depot ID:', this.depotId);
}
savearticle(){
  let formData = new FormData()
  
  formData.append('article', JSON.stringify(this.article));
  formData.append('picture' , this.picture)
  this.articleservice.savearticle(formData , this.depotId , this.categoryId).subscribe(
    responce=>{
      console.log(responce)
      this.router.navigate(['/kanban-board']); 
      
    },
    err=>{
      console.log(err)
      
    }
  )
}
setArticleStatus(status: boolean) {
  this.article.status = status;
}

selectpicture(e:any){
  this.picture = e.target.files[0];
  const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.selectedPicture = e.target.result;
      
    };
    reader.readAsDataURL(file);
  console.log(this.picture)
}  

cancel(){
  this.router.navigate(['/kanban-board']); 
}

getalldepot(){
  this.depotservice.getalldepot().subscribe(
    responce=>{
      this.depot=responce
      console.log(responce)
    },
    err=>{
      console.log(err)
    }
  )
}
getallcategory(){
  this.categoryservice.getAllcategory().subscribe(
    responce=>{
      this.category=responce
      console.log(responce)
    },
    err=>{
      console.log(err)
    }
  )
}
}
