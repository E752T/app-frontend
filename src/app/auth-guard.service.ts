import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { DataService } from './services/data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  public token_JWT: string | null;
  public user_role: string | null;
  public username: string | null = localStorage.getItem('username');
  public body_login: any;

  constructor(private dataService: DataService, private router: Router) {
    this.token_JWT = this.dataService.getTokenJWT();
    this.user_role = this.dataService.getUserRole();
    this.username = this.dataService.getUsername();
    this.body_login = this.dataService.getBodyLogin();
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log('canActivate token ', this.dataService.getTokenJWTsuccess());

    if (this.dataService.getTokenJWTsuccess()) {
      return true;
    } else {
      alert('Accesso Negato: Credenziali Errate');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
