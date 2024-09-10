import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPageModule } from './login/login.module';
import { HomePageModule } from './home/home.module';
import { authGuard } from './auth-guard.service';

const routes: Routes = [
  {
    path: '',
    title: 'home',
    redirectTo: 'login', // Reindirizza alla pagina di login
    pathMatch: 'full',
    component: HomePageModule,
    canActivate: [authGuard],
  },

  {
    path: 'login',
    title: 'login-page',
    component: LoginPageModule,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
