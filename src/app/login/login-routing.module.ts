import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPage } from './login.page';
import { HomePage } from '../home/home.page';
//import { AuthGuardService } from '../guards/auth.guard'; // Assicurati di avere un AuthGuard

// Definizione di un array di rotte, utilizzando il tipo Routes fornito da Angular
const routes: Routes = [
  // Rotta principale: se l'URL è vuoto, reindirizza alla pagina di login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Rotta per la pagina di login: quando l'URL è '/login', carica il componente LoginPage
  { path: 'login', component: LoginPage },

  // Rotta per la pagina principale: quando l'URL è '/home', carica il componente HomePage
  { path: 'home', component: HomePage }, // Assicurati di avere un componente HomePage
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
