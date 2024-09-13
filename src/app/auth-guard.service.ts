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
    console.log('canActivate | Check if the user is authenticated');
    console.log('canActivate | token_JWT_success = ', token_JWT_success);

    // Check if the user is authenticated
    if (token_JWT_success === 'true') {
      console.log('token_JWT_success = ', token_JWT_success);
      alert('ACCESS GRANTED');
      this.router.navigate(['/']);
      return true;
    } else {
      console.log('token_JWT_success = ', token_JWT_success);
      alert('ACCESS DENIED');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
