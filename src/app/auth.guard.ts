import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServices } from 'src/services/auth.service';

const authGuard: CanActivateFn = () => {

  const isAuth: boolean = (new AuthServices()).isAuthenticated()
  const router = inject(Router);

  if(!isAuth) {   
    router.navigate(['/auth']);
  }

  return isAuth;
};

const authGuardLogin: CanActivateFn = () => {

  const isAuth: boolean = (new AuthServices()).isAuthenticated()
  const router = inject(Router);

  if(isAuth) {   
    router.navigate(['/dashboard']);
  }

  return true;
};

export {
  authGuard,
  authGuardLogin
}
