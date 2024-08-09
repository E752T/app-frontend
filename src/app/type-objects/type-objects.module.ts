import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { TypeObjectComponent } from './type-objects.component';

@NgModule({
  declarations: [TypeObjectComponent],
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  exports: [TypeObjectComponent],
})
export class TypeObjectModule {}
