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
    this.body_login = this.dataService.getBodyLogin();
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log('canActivate token ', this.dataService.getTokenJWTsuccess());

    if (this.dataService.getTokenJWTsuccess()) {
      // Modificato per confrontare con un booleano
      console.log('accesso eseguito');
      return true;
    } else {
      console.log(
        'accesso fallito | token_JWT_success = ',
        this.dataService.getTokenJWTsuccess()
      );
      alert('ACCESS DENIED');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
