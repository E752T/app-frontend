import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { DettagliCartaPage } from '../details/details.component';

// Definizione delle rotte per la navigazione
const routes: Routes = [
  {
    path: '',
    component: HomePage, // Pagina principale
  },
  
  {
    path: 'details/:id',
    component: DettagliCartaPage, // Pagina dei dettagli
  },
  {
    path: '**', // Rotta di fallback per gestire percorsi non definiti
    redirectTo: '', // Reindirizza alla home page
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
