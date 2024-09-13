import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  token_JWT_success = true; ////////////////////////////////

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Check if the user is authenticated
    if (this.token_JWT_success == true) {
      this.router.navigate(['/']);
      alert('ACCESS GRANTED');
      return true;
    } else {
      this.router.navigate(['/login']);
      alert('ACCESS DENIED');
      return false;
    }
  }
}
