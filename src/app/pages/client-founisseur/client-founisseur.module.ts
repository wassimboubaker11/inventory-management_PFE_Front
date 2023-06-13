import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { ClientFounisseurRoutingModule } from './client-founisseur-routing.module';
import { ListClientComponent } from './list-client/list-client.component';
import { ListFournisseurComponent } from './list-fournisseur/list-fournisseur.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAccordionModule, NgbNavModule, NgbTypeaheadModule, NgbPaginationModule, NgbTooltipModule, NgbCollapseModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ArchwizardModule } from 'angular-archwizard';
import { Ng5SliderModule } from 'ng5-slider';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { ListCommandeClientComponent } from './list-commande-client/list-commande-client.component';
import { ListCommandeFournisseurComponent } from './list-commande-fournisseur/list-commande-fournisseur.component';
import { AddCommandeClientComponent } from './add-commande-client/add-commande-client.component';
import { AddCommandeFournisseurComponent } from './add-commande-fournisseur/add-commande-fournisseur.component';
import { HistoriqueComponent } from './historique/historique.component';


@NgModule({
  declarations: [ListClientComponent, ListFournisseurComponent, ListCommandeClientComponent, ListCommandeFournisseurComponent, AddCommandeClientComponent, AddCommandeFournisseurComponent, HistoriqueComponent],
  imports: [
    CommonModule,
    ClientFounisseurRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule,
    ArchwizardModule,
    NgbAccordionModule,
    NgbNavModule,
    NgbTypeaheadModule,
    NgbPaginationModule,
    NgbTooltipModule,
    NgbCollapseModule,
    Ng5SliderModule,
    NgbModalModule,
    NgSelectModule,
    
    
  ]
})
export class ClientFounisseurModule { }
