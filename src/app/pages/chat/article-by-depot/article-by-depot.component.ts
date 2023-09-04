import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { ArticleService } from 'src/app/core/services/article.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-article-by-depot',
  templateUrl: './article-by-depot.component.html',
  styleUrls: ['./article-by-depot.component.scss']
})
export class ArticleByDepotComponent implements OnInit {
id:any
  image:any

  article:any;
 
  searchQuery: string = '';
 
  totalItems:any;
  currentPage = 1;
  pageSize = 5;
 
   // bread crumb items
   breadCrumbItems: Array<{}>;
 
   constructor(private modalService: NgbModal,private articleservice : ArticleService , config: NgbPaginationConfig, private act:ActivatedRoute) {  config.size = 'sm';
   config.boundaryLinks = true;
   config.maxSize = 10;}
 
   ngOnInit(): void {
    this.id = this.act.snapshot.paramMap.get('id')
     this.breadCrumbItems = [{ label: 'Wind' }, { label: 'Products', active: true }];
     this.getallarticlebyiddepot();
     
   }
   searchDepots() {
     if (this.searchQuery) {
       this.article = this.article.filter((depot) => {
         return (
           depot.nom?.toLowerCase().includes(this.searchQuery.toLowerCase())  ||
           depot.ref_article?.toString().includes(this.searchQuery.toLowerCase()) ||
           depot.num_serie?.toLowerCase().includes(this.searchQuery.toLowerCase())
         );
       });
     } else {
       this.ngOnInit();
     }
   }

   getallarticlebyiddepot(){
    this.articleservice.getallarticlebyiddepot(this.id).subscribe(
      responce=>{
        this.article=responce
        this.image=responce.picture
         this.totalItems = responce.length;
        console.log(responce)
      },
      err=>{
        console.log(err)
      }
    )
   }
 
  
  //  getallarticle(){
  //    this.articleservice.getallarticle().subscribe(
  //      responce=>{
  //        this.article =responce
  //        console.log(responce)
  //        this.image=responce.picture
  //        this.totalItems = responce.length;
 
  //      },
  //      err=>{
  //        console.log(err)
  //      }
  //    )
  //  }
 
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
         
           this.articleservice.deletearticle(id).subscribe(
               
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
