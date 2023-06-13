import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VariantComponent } from './services/variant/variant.component';
import { OrderItemComponent } from './models/order-item/order-item.component';

@NgModule({
  declarations: [VariantComponent, OrderItemComponent],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
