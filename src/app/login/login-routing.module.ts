import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPage } from './login.page';
import { HomePage } from '../home/home.page';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Reindirizza alla pagina di login
  { path: 'login', component: LoginPage }, // Rotta per la pagina di login
  { path: '', component: HomePage }, // Rotta per la pagina principale
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
