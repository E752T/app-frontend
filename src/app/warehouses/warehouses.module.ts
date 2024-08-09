import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { WarehouseComponent } from './warehouses.component';

@NgModule({
  declarations: [WarehouseComponent],
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  exports: [WarehouseComponent],
})
export class WarehousetModule {}
