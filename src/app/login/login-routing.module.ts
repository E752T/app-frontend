import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPage } from './login.page';
import { HomePage } from '../home/home.page';
import { AuthGuard } from '../auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Reindirizza alla pagina di login
  { path: '', component: LoginPage }, // Rotta per la pagina di login
  { path: '', canActivate: [AuthGuard], component: HomePage }, // Rotta per la pagina principale
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
