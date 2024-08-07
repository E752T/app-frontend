import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResetCredentialsPage } from './reset-credentials.page';

const routes: Routes = [
  {
    path: '',
    component: ResetCredentialsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResetCredentialsPageRoutingModule {}
