import { inject, Injectable } from '@angular/core';
import {
  CanActivateFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Route,
} from '@angular/router';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router: Router = inject(Router);
  const protectedRoutes: string[] = ['/'];
  return protectedRoutes.includes(state.url) && !localStorage.getItem('token')
    ? router.navigate(['/login'])
    : true;

  // if (localStorage.getItem('token')) {
  //   console.log('Attivazione route per home ');

  //   return true;
  // } else {
  //   console.log('Errore: Attivazione route per home ');
  //   return false;
  // }
};
