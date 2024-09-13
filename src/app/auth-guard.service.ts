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
    // Check if the user is authenticated
    if (token_JWT_success === 'true') {
      this.router.navigate(['/']);
      console.log('token_JWT_success = ', token_JWT_success);
      alert('ACCESS GRANTED');
      return true;
    } else {
      this.router.navigate(['/login']);
      console.log('token_JWT_success = ', token_JWT_success);
      alert('ACCESS DENIED');
      return false;
    }
  }
}
