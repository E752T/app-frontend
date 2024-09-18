import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MessageComponent } from './message/message.component'; // Importa il componente specifico
import { AuthGuard } from './auth-guard.service';
import { NotFoundPageModule } from './not-found/not-found.module'; // Importa il componente specifico

const routes: Routes = [
  {
    path: 'login',
    pathMatch: 'full',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule), // Importa il modulo del login
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule), // Importa il modulo della home
  },
  {
    path: 'messages',
    component: MessageComponent,
    children: [{ path: ':id', component: MessageComponent }], // Rotta figlia per i messaggi
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
