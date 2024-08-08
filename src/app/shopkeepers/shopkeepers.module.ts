import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ShopkeepersComponent } from './shopkeepers.component';

@NgModule({
  declarations: [ShopkeepersComponent],
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  exports: [ShopkeepersComponent],
})
export class ShopkeepersModule {}
