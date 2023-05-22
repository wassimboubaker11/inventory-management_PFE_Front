import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListClientComponent } from './list-client/list-client.component';
import { ListFournisseurComponent } from './list-fournisseur/list-fournisseur.component';


const routes: Routes = [
  {path :'client' , component:ListClientComponent },
  {path :'founisseur' , component:ListFournisseurComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientFounisseurRoutingModule { }
