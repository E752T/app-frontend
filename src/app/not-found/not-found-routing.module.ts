import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundPage } from './not-found.page'; // Assicurati di importare il componente corretto

const routes: Routes = [
  {
    path: '',
    component: NotFoundPage, // Usa il componente NotFoundPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotFoundPageRoutingModule {}
