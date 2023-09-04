import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import bsCustomFileInput from 'bs-custom-file-input';
import { Article } from 'src/app/core/models/article';
import { ArticleService } from 'src/app/core/services/article.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {

  article:Article = new Article();

  picture:any= {};

  articleForm: FormGroup;

  id:any;

  breadCrumbItems: Array<{}>;

  constructor(private router:Router , private formBuilder: FormBuilder, private act:ActivatedRoute , private articleservice:ArticleService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Wind' }, { label: 'Edit Article', active: true }];

    bsCustomFileInput.init();

    this.id = this.act.snapshot.paramMap.get('id')
    console.log(this.id)

   

    this.articleservice.getarticlebyid(this.id).subscribe(
      responce=>{
        this.article = responce;
        console.log(responce)
       this.picture = this.article.picture
        this.articleForm.patchValue({
          status: this.article.status
        });
        const fileInput = <HTMLInputElement>document.getElementById('picture');
        fileInput.value = null;

      },
      err=>{
        console.log(err)
      }
    )
  
    

    


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

    });


  }

  cancel(){
    this.router.navigate(['/kanban-board']);
  }

  setArticleStatus(status: boolean) {
    this.article.status = status;
  }

  selectpicture(e:any){
    this.picture = e.target.files[0];
    console.log(this.picture)
  } 

  
  updatearticle(){
    const formData = new FormData();
    formData.append('article', JSON.stringify(this.article));
    formData.append('picture' , this.picture)

    this.articleservice.updatearticle(this.id , formData).subscribe(
      responce=>{
        console.log(responce)
        this.router.navigate(['/kanban-board']);
        },

      
      err=>{
        console.log(err)
      }
    )
  }

}
