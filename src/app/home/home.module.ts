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
import { TypeObjectModule } from '../type-objects/type-objects.module';
import { GeographicalOriginModule } from '../geographical-origins/geographical-origin.module';
import { ProvenanceModule } from "../provenance/provenance.module";
import { WarehousetModule } from '../warehouses/warehouses.module';


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
    TypeObjectModule,
    HttpClientModule,
    GeographicalOriginModule,
    ProvenanceModule,
    WarehousetModule

],
  declarations: [HomePage],
  providers: [
    IonModal,
    AuthorsModule,
    CategoriesModule,
    ShopkeepersModule,
    EditorsModule,
    WarehousetModule,
  ],
})
export class HomePageModule {}
