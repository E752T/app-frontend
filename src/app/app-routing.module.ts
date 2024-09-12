import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePageModule } from './home/home.module';
import { AuthGuard } from './auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Reindirizza alla pagina di login
  {
    path: 'login', // Manteniamo questa rotta per la pagina di login
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule), // Carica il modulo della pagina di login
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule), // Carica il modulo della home
    canActivate: [AuthGuard], // Protegge la rotta della home
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
