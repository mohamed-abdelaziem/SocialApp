import { CookieService } from 'ngx-cookie-service';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

export const headerWithTokenInterceptor: HttpInterceptorFn = (req, next) => {
const cookie = inject(CookieService);
req = req.clone({setHeaders:{
"token" : cookie.get('token') || ''
}});



  return next(req);
};
