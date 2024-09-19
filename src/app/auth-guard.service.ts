import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { DataService } from './services/data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  public token_JWT_success: boolean;

  constructor(private router: Router, private dataService: DataService) {
    this.token_JWT_success = this.dataService.getTokenJWTsuccess();
  }

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
      console.log('token_JWT_success = ', this.token_JWT_success);
      alert('ACCESS DENIED');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
