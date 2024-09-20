import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { MessageComponent } from '../message/message.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  { path: 'details/:id', component: MessageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
