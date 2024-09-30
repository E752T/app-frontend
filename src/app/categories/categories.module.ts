import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [CategoriesComponent],
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  exports: [CategoriesComponent],
})
export class CategoriesModule {}
