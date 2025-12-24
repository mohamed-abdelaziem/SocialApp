import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthserviceService } from '../auth/authservice.service';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const _authService = inject(AuthserviceService);
  const cookie = inject(CookieService);

  if(!!cookie.get('token') == true){
   return true;
  }else {
    return false ;
  }

};
