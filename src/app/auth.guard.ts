import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { AuthServices } from 'src/services/auth.service';

const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const isAuth = (new AuthServices()).isAuthenticated()
  if (!isAuth) {
    inject(Router).navigate(['/auth']);
  }
  return isAuth
};

const authGuardLogin: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const isAuth = (new AuthServices()).isAuthenticated()
  if (isAuth) {
    inject(Router).navigate(['/dashboard']);
  }
  return true
};

export {
  authGuard,
  authGuardLogin
}