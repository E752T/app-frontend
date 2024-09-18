import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundPage } from './not-found.page';
import { NotFoundPageModule } from './not-found.module';

const routes: Routes = [
  {
    path: '/not-found',
    component: NotFoundPageModule,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotFoundPageRoutingModule {}
