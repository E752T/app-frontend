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
}
