import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ProvenancesComponent } from './provenance.component';

@NgModule({
  declarations: [ProvenancesComponent],
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  exports: [ProvenancesComponent],
})
export class ProvenanceModule { }
