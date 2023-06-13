import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListClientComponent } from './list-client/list-client.component';
import { ListFournisseurComponent } from './list-fournisseur/list-fournisseur.component';
import { ListCommandeClientComponent } from './list-commande-client/list-commande-client.component';
import { ListCommandeFournisseurComponent } from './list-commande-fournisseur/list-commande-fournisseur.component';
import { AddCommandeClientComponent } from './add-commande-client/add-commande-client.component';
import { AddCommandeFournisseurComponent } from './add-commande-fournisseur/add-commande-fournisseur.component';
import { HistoriqueComponent } from './historique/historique.component';


const routes: Routes = [
  {path :'client' , component:ListClientComponent },
  {path :'founisseur' , component:ListFournisseurComponent },
  {path :'listcommandeclient' , component:ListCommandeClientComponent },
  {path :'listcommandefounisseur' , component:ListCommandeFournisseurComponent },
  {path : 'addCommandeClient', component:AddCommandeClientComponent},
  {path : 'addCommandefounisseur', component:AddCommandeFournisseurComponent},
  {path : 'historique' , component:HistoriqueComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientFounisseurRoutingModule { }
