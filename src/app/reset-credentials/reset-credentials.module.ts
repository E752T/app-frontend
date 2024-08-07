import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResetCredentialsPageRoutingModule } from './reset-credentials-routing.module';

import { ResetCredentialsPage } from './reset-credentials.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResetCredentialsPageRoutingModule
  ],
  declarations: [ResetCredentialsPage]
})
export class ResetCredentialsPageModule {}
