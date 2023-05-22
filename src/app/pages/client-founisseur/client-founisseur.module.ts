import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientFounisseurRoutingModule } from './client-founisseur-routing.module';
import { ListClientComponent } from './list-client/list-client.component';
import { ListFournisseurComponent } from './list-fournisseur/list-fournisseur.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAccordionModule, NgbNavModule, NgbTypeaheadModule, NgbPaginationModule, NgbTooltipModule, NgbCollapseModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ArchwizardModule } from 'angular-archwizard';
import { Ng5SliderModule } from 'ng5-slider';
import { UiModule } from 'src/app/shared/ui/ui.module';


@NgModule({
  declarations: [ListClientComponent, ListFournisseurComponent],
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
    NgbModalModule
  ]
})
export class ClientFounisseurModule { }
