import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { AuthorsComponent } from './authors.component';

@NgModule({
  declarations: [AuthorsComponent],
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  exports: [AuthorsComponent],
})
export class AuthorsModule {}
