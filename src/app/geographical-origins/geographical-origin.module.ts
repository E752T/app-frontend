import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { GeographicalOriginComponent } from './geographical-origins.component';

@NgModule({
  declarations: [GeographicalOriginComponent],
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  exports: [GeographicalOriginComponent],
})
export class GeographicalOriginModule {}
