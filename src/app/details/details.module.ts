import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DettagliCartaPage } from './details.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, // Assicurati che questo modulo sia importato
  ],
  declarations: [DettagliCartaPage],
})
export class DettagliCartaPageModule {}
