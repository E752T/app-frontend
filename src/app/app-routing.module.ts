import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPageModule } from './login/login.module';
import { HomePageModule } from './home/home.module';
import { AuthGuard } from './auth-guard.service';

// Definizione di un array di rotte, utilizzando il tipo Routes fornito da Angular
const routes: Routes = [
  // Rotta principale: se il percorso è vuoto, reindirizza alla pagina di login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Rotta per la home: carica il modulo della pagina home in modo lazy
  {
    path: '',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule), // Importa il modulo della home
  },

  // Rotta per la pagina di login: carica il modulo della pagina di login in modo lazy
  {
    path: 'login',
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
