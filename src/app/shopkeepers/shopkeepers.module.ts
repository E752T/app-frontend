import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ShopkeeperComponent } from './shopkeepers.component';

@NgModule({
  declarations: [ShopkeeperComponent],
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  exports: [ShopkeeperComponent],
})
export class AuthorsModule {}
