import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { debounceTime, finalize, retry, timer } from 'rxjs';


export const handleLoadingInterceptor: HttpInterceptorFn = (req, next) => {
  const _loaderService = inject(LoaderService);





  
  
 return next(req).pipe()
};
