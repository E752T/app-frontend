import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonModal } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { MessageComponentModule } from '../message/message.module';
import { AuthorsModule } from '../authors/authors.module';
import { CategoriesModule } from '../categories/categories.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessageComponentModule,
    HomePageRoutingModule,
    AuthorsModule,
    CategoriesModule,
  ],
  declarations: [HomePage],
  providers: [IonModal, AuthorsModule, CategoriesModule],
})
export class HomePageModule {}
