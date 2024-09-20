import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { DataService } from './services/data.service';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  public token_JWT: string | null;
  public user_role: string | null;
  public token_JWT_success: boolean | null;
  public username: string | null = localStorage.getItem('username');

  public body_login: {
    shopkeeper: string | null;
    email: string | null;
    password: string | null;
    username: string | null;
  } = {
    shopkeeper: '',
    email: '',
    password: '',
    username: '',
  };

  constructor(
    private modalCtrl: ModalController,
    private dataService: DataService,
    private router: Router
  ) {
    this.token_JWT = this.dataService.getTokenJWT();
    this.user_role = this.dataService.getUserRole();
    this.username = this.dataService.getUsername();
    this.token_JWT_success = this.dataService.getTokenJWTsuccess();
    this.body_login = this.dataService.getBodyLogin();
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
