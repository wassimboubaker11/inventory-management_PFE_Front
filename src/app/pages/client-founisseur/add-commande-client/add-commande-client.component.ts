import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import { Article } from 'src/app/core/models/article';
import { ClientFournisseur } from 'src/app/core/models/client-fournisseur';
import { Variant } from 'src/app/core/models/variant';

import { ArticleService } from 'src/app/core/services/article.service';
import { ClientFournisseurService } from 'src/app/core/services/client-fournisseur.service';
import { CommandeService } from 'src/app/core/services/commande.service';
import { VariantService } from 'src/app/core/services/variant.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-commande-client',
  templateUrl: './add-commande-client.component.html',
  styleUrls: ['./add-commande-client.component.scss']
})
export class AddCommandeClientComponent implements OnInit {
  article:any
  
  commandeForm: FormGroup;
  idclient:any
  nomcommande:any
  articles:Article[]= [];

  selectedarticles:Article[] = [];  

  totalPrices: number[] = [];
  totalPriceAll: number = 0;

  selectedArticless: Article[] = [];
  quantities: number[] = [];
  
  clients:ClientFournisseur[]=[];

  selectedvariants: Variant[] = [];
  variants:any

  selectedArticleId:any

// bread crumb items
breadCrumbItems: Array<{}>;


  constructor(private clientservice:ClientFournisseurService, private router: Router,private fb: FormBuilder, private http: HttpClient, private commande:CommandeService, private articleservice:ArticleService,private variantservice:VariantService) {
    this.breadCrumbItems = [{ label: 'Wind' }, { label: 'Add Order', active: true }];
    this.commandeForm = this.fb.group({orderItems: this.fb.array([this.createOrderItemForm()]),
    });
   }

  ngOnInit(): void {
    this.getAllarticle();
    this.getallClient();
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

  getvariantsbyidarticle(id: any) {
    this.variantservice.getvariantbyidarticle(id).subscribe(
      response => {
        const articleVariants = response;
        console.log("All variants for the article:", articleVariants);
  
        // Filter out the variants that already exist in selectedvariants
        this.variants = articleVariants.filter(variant =>
          !this.selectedvariants.some(selectedVariant => selectedVariant.idvariant === variant.idvariant)
        );
  
        console.log("Filtered variants:", this.variants);
      },
      error => {
        console.log(error);
      }
    );
  }
  


  getAllarticle() {
    this.articleservice.getallarticle().subscribe(
      response => {
        
        this.articles = response.filter(article => article.quantite > 0 && article.variants.length > 0);
        console.log("ohhh",this.articles);
      },
      error => {
        console.log(error);
      }
    );
  }

  removeVariant(variant: Variant) {
    const variantIndex = this.selectedvariants.findIndex(v => v.idvariant === variant.idvariant);
    if (variantIndex > -1) {
      const removedVariant = this.selectedvariants.splice(variantIndex, 1)[0];
      this.variants.push(removedVariant);
    }
  }
    

  getArticlebyid(e) {
    console.log(e.target.value);
       
    const selectedArticleId = Number(e.target.value);
    this.selectedArticleId=selectedArticleId;

    this.getvariantsbyidarticle(selectedArticleId);
    const orderItems = this.commandeForm.get('orderItems') as FormArray;

    
   // const selectedArticle = this.articles.find(a => a.idarticle === selectedArticleId);
    //console.log("irawe7",selectedArticle)
   // if (selectedArticle) {
     // this.articles = this.articles.filter(a => a.idarticle !== selectedArticleId);
      //console.log("mrgl",this.articles)
     // this.selectedarticles.push(selectedArticle);
 

     // console.log('ohhh',this.selectedarticles)
    //}
    //this.selectedArticless=this.selectedarticles
    //console.log("ahmed",this.selectedArticless)
     // console.log(this.selectedarticles)

  }
  getvariantbyid(e) {
    console.log(e.target.value);
    const selectedVariantId = Number(e.target.value);
  
    const selectedVariantIndex = this.variants.findIndex(v => v.idvariant === selectedVariantId);
    if (selectedVariantIndex > -1) {
      const selectedVariant = this.variants[selectedVariantIndex];
  
      // Remove the selected variant from the variants array
      this.variants.splice(selectedVariantIndex, 1);
  
      // Add the selected variant to the list
      this.selectedvariants.push(selectedVariant);
      console.log("hadhi", this.selectedvariants);
  
      // Add the variant to the form array
      const orderItems = this.commandeForm.get('orderItems') as FormArray;
      //orderItems.push(this.createOrderItemForm(selectedVariant));
    }
  }
  

 





  createOrderItemForm(): FormGroup {
    return this.fb.group({
      articleId: [null, Validators.required],
      quantity: [null, Validators.required],

    });
    
}



getallClient(){
  this.clientservice.getAllClient().subscribe(
    responce=>{
      this.clients=responce
      console.log(responce)
    },
    err=>{
      console.log(err)
    }
  )
}
getIDclient(id:any){
this.idclient=id
console.log("idclient", id)
}

updateTotalPrice(index: number) {
  const variant = this.selectedvariants[index];
  const quantity = this.quantities[index];

  const totalPrice = variant.prixvente * quantity;
  this.totalPrices[index] = totalPrice; // Update the total price at the corresponding index
  this.calculateTotalPriceAll();


}

calculateTotalPriceAll() {
  this.totalPriceAll = this.totalPrices.reduce((total, price) => total + price, 0);
}

removeArticle(article: Article) {
  const index = this.selectedarticles.indexOf(article);
  if (index !== -1) {
    this.selectedarticles.splice(index, 1); 
    this.articles.push(article); 
    this.totalPrices.splice(index, 1); 
  }
}


saveCommande(): void {
  const orderItems: any[] = [];

  for (let i = 0; i < this.selectedvariants.length; i++) {
    const variant = this.selectedvariants[i];
    const quantity = this.quantities[i];
    orderItems.push({
      articleId: variant.idvariant, // Assuming you have a property called variantId
      quantity: quantity
    });
  }

  console.log("Order Items:", orderItems);

  this.commande.jareb(this.idclient, this.nomcommande, orderItems).subscribe(
    response => {
      console.log("Commande saved successfully.");
     //  Reset the selected variants and quantities
      this.selectedvariants = [];
      this.quantities = [];
      this.router.navigate(['/tier/listcommandeclient']);
      this.alert();
    },
    error => {
      console.log("Error saving commande:", error);
     this.selectedvariants = [];
      this.quantities = [];
      this.router.navigate(['/tier/listcommandeclient']);
      this.alert();
    }
  );
}





// saveCommande(): void {
// const orderItems: any[] = [];

// for (let i = 0; i < this.selectedArticless.length; i++) {
//   const article = this.selectedArticless[i];
//   const quantity = this.quantities[i];
//   orderItems.push({
//     articleId: article.idarticle,
//     quantity: quantity
//   });

  
// }
// console.log("hibba", orderItems)
//   this.commande.addcomandeclient(this.idclient,this.nomcommande,orderItems).subscribe(
//     responce => {
//       console.log("Commande saved successfully.");
//       // Reset the selected articles and quantities
//       this.selectedArticless = [];
//       this.quantities = [];
//       this.router.navigate(['/tier/listcommandeclient']); 
//     },
//     error => {
//       console.log("Error saving commande:", error);
//       this.selectedArticless = [];
//       this.quantities = [];
//       this.router.navigate(['/tier/listcommandeclient']); 
//     }
//   );

// }


  // getAllarticle(){
  //   this.articleservice.getallarticle().subscribe(
  //     responce=>{
  //       this.articles=responce
  //       console.log(responce)
        
  //     },
  //     err=>{
  //       console.log(err)
  //     }
  //   )
  //   }



}