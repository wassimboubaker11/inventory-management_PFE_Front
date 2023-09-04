import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Article } from 'src/app/core/models/article';
import { ClientFournisseur } from 'src/app/core/models/client-fournisseur';
import { ArticleService } from 'src/app/core/services/article.service';
import { ClientFournisseurService } from 'src/app/core/services/client-fournisseur.service';
import { CommandeService } from 'src/app/core/services/commande.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-commande-fournisseur',
  templateUrl: './add-commande-fournisseur.component.html',
  styleUrls: ['./add-commande-fournisseur.component.scss']
})
export class AddCommandeFournisseurComponent implements OnInit {

  article:any
  
  commandeForm: FormGroup;
  idfournisseur:any
  nomcommande:any
  articles:Article[]= [];

  selectedarticles:Article[] = [];  

  totalPrices: number[] = [];
  totalPriceAll: number = 0;

  selectedArticless: Article[] = [];
  quantities: number[] = [];

  fournisseurs:ClientFournisseur[]=[];

// bread crumb items
breadCrumbItems: Array<{}>;


  constructor(private fournisseurservice:ClientFournisseurService, private router: Router,private fb: FormBuilder, private http: HttpClient, private commande:CommandeService, private articleservice:ArticleService) {
    this.breadCrumbItems = [{ label: 'Wind' }, { label: 'Add Order', active: true }];
    this.commandeForm = this.fb.group({orderItems: this.fb.array([this.createOrderItemForm()]),
    });
   }

  ngOnInit(): void {
    this.getAllarticle();
    this.getallFournisseur();
  }
  alert(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    });
  }

    
  getAllarticle(){
    this.articleservice.getallarticle().subscribe(
      responce=>{
        this.articles=responce
        console.log(responce)
        
      },
      err=>{
        console.log(err)
      }
    )
    }
  getArticlebyid(e) {
    console.log(e.target.value);
    const selectedArticleId = Number(e.target.value);
    const orderItems = this.commandeForm.get('orderItems') as FormArray;
    const selectedArticle = this.articles.find(a => a.idarticle === selectedArticleId);
    console.log("irawe7",selectedArticle)
    if (selectedArticle) {
      this.articles = this.articles.filter(a => a.idarticle !== selectedArticleId);
      console.log("mrgl",this.articles)
      this.selectedarticles.push(selectedArticle);
      

      console.log('ohhh',this.selectedarticles)
    }
    this.selectedArticless=this.selectedarticles
    console.log("ahmed",this.selectedArticless)
    
    console.log(this.selectedarticles)

  }

  removeArticle(article: Article) {
    const index = this.selectedarticles.indexOf(article);
    if (index !== -1) {
      this.selectedarticles.splice(index, 1); 
      this.articles.push(article); 
      this.totalPrices.splice(index, 1); 
    }
  }


 
  calculateTotalPriceAll() {
    this.totalPriceAll = this.totalPrices.reduce((total, price) => total + price, 0);
  }



saveCommande(): void {
  const orderItems: any[] = [];

  for (let i = 0; i < this.selectedArticless.length; i++) {
    const article = this.selectedArticless[i];
    const quantity = this.quantities[i];
    orderItems.push({
      articleId: article.idarticle,
      quantity: quantity
    });

    
  }
  console.log("hibba", orderItems)
    this.commande.addcommandefournisseur(this.idfournisseur,this.nomcommande,orderItems).subscribe(
      responce => {
        console.log("Commande saved successfully.");
        // Reset the selected articles and quantities
        this.selectedArticless = [];
        this.quantities = [];
        this.router.navigate(['/tier/listcommandefounisseur']); 
        this.alert();
      },
      error => {
        console.log("Error saving commande:", error);
        this.selectedArticless = [];
        this.quantities = [];
        this.router.navigate(['/tier/listcommandefounisseur']); 
        this.alert();
      }
    );

}

updateTotalPrice(index: number) {
  const article = this.selectedArticless[index];
  const quantity = this.quantities[index];
  const totalPrice = article.prixachat * quantity;
  this.totalPrices[index] = totalPrice; // Update the total price at the corresponding index
  this.calculateTotalPriceAll();
}



  createOrderItemForm(): FormGroup {
    return this.fb.group({
      articleId: [null, Validators.required],
      quantity: [null, Validators.required],

    });
    
}



getallFournisseur(){
  this.fournisseurservice.getAllFournisseur().subscribe(
    responce=>{
      this.fournisseurs=responce
      console.log(responce)
    },
    err=>{
      console.log(err)
    }
  )
}
getIDclient(id:any){
this.idfournisseur=id
console.log("idfournisseur", id)
}

}
