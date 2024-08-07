import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { G } from './geographical-origins.component';

@NgModule({
  declarations: [EditorsComponent],
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  exports: [EditorsComponent],
})
export class GeographicalOriginModule { }
