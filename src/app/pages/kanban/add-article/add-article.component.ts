import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import bsCustomFileInput from 'bs-custom-file-input';
import { Article } from 'src/app/core/models/article';
import { ArticleService } from 'src/app/core/services/article.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { DepotService } from 'src/app/core/services/depot.service';
import Swal from 'sweetalert2';

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

submitted: boolean = false;

constructor( private articleservice:ArticleService , private formBuilder: FormBuilder, private router: Router , private depotservice:DepotService, private categoryservice:CategoryService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Wind' }, { label: 'Add Product', active: true }];

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
      depot : ['', Validators.required],
      category : ['', Validators.required],

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
alert(){
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Your work has been saved',
    showConfirmButton: false,
    timer: 1300
  });
}
savearticle(){
  this.submitted = true;
    if (this.articleForm.valid) {
  let formData = new FormData()
  
  formData.append('article', JSON.stringify(this.article));
  formData.append('picture' , this.picture)
  this.articleservice.savearticle(formData , this.depotId , this.categoryId).subscribe(
    responce=>{
      console.log(responce)
      this.articleForm.reset();
      this.router.navigate(['/kanban-board']); 
      this.alert();
      
    },
    err=>{
      console.log(err)
      
    }
  )
} else {
  // Handle form validation errors or display a message to the user
  // For example:
  console.log("Form is invalid. Please fill in all required fields.");
}
}
// setArticleStatus(status: boolean) {
//   this.article.status = status;
// }



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
