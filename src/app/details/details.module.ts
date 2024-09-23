import { NgModule, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DetailsComponent } from './details.component';
import { DatabaseObject } from '../services/interfaces.service';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [DetailsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Aggiungi questa riga
})
export class DetailsModule {}
