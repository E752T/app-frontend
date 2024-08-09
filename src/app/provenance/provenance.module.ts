import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ProvenanceComponent } from './provenance.component';

@NgModule({
  declarations: [ProvenanceComponent],
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  exports: [ProvenanceComponent],
})
export class ProvenanceModule { }
