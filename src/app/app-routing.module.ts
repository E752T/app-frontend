import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MessageComponentModule } from './message/message.module';

import { AuthGuard } from './auth-guard.service';

const routes: Routes = [
  //{ path: '', redirectTo: 'login', pathMatch: 'full' }, // Reindirizza alla pagina di login
  {
    path: '',
    canActivate: [AuthGuard],
    //redirectTo: 'login',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule), // Importa il modulo della home
  },
  {
    path: 'login',
    pathMatch: 'full',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule), // Importa il modulo del login
  },
  {
    path: 'messages',
    component: MessageComponentModule,
    children: [{ path: ':id', component: MessageComponentModule }],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
