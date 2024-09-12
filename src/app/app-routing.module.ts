import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePageModule } from './home/home.module';
import { AuthGuard } from './auth-guard.service';

// Definizione di un array di rotte, utilizzando il tipo Routes fornito da Angular
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Reindirizza alla pagina di login
  {
    path: 'login', // Manteniamo questa rotta per la pagina di login
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule), // Importa il modulo del login
  },

  // Rotta di fallback: se il percorso è vuoto, reindirizza nuovamente alla pagina di login
  {
    path: '',
    redirectTo: 'login', // Reindirizza alla pagina di login
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule), // Importa il modulo della home (questo sembra un duplicato)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
