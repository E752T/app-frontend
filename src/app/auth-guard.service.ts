import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  GuardResult,
  MaybeAsync,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    
  ): MaybeAsync<GuardResult> {

    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  private checkToken(): boolean {
    // Logica per verificare il token JWT
    // Restituisci true se il token è valido, altrimenti false
    return false; // Modifica questa logica in base alle tue necessità
  }
}
