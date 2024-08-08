import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonModal } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { MessageComponentModule } from '../message/message.module';
import { AuthorsModule } from '../authors/authors.module';
import { CategoriesModule } from '../categories/categories.module';
import { EditorsModule } from '../editors/editors.module';
import { ShopkeepersModule } from '../shopkeepers/shopkeepers.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessageComponentModule,
    HomePageRoutingModule,
    AuthorsModule,
    CategoriesModule,
    EditorsModule,
    ShopkeepersModule,
    HttpClientModule,
  ],
  declarations: [HomePage],
  providers: [
    IonModal,
    AuthorsModule,
    CategoriesModule,
    ShopkeepersModule,
    EditorsModule,
  ],
})
export class HomePageModule {}
