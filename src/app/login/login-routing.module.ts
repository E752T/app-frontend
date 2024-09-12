import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPage } from './login.page';
//import { AuthGuardService } from '../guards/auth.guard'; // Assicurati di avere un AuthGuard

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: LoginPage,
    //canActivate: [AuthGuardService], // Aggiungi il guardiano di autenticazione
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
