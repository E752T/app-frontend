import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { token_JWT_success } from './services/data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const result_JWT = localStorage.getItem('token_JWT_success');
    console.log('canActivate token ', result_JWT);

    if (result_JWT == 'true') {
      // Modificato per confrontare con un booleano
      console.log('token_JWT_success = ', result_JWT);
      return true;
    } else {
      console.log('token_JWT_success = ', token_JWT_success);
      alert('ACCESS DENIED');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
