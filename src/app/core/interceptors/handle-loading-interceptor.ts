import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { debounceTime, finalize, retry, timer } from 'rxjs';


export const handleLoadingInterceptor: HttpInterceptorFn = (req, next) => {
  const _loaderService = inject(LoaderService);


    _loaderService.isLoading.set(true);


  
  
 return next(req).pipe(
    finalize(() => {
      // تأخير إخفاء اللودر 500ms
      timer(2000).subscribe(() => {
        _loaderService.hideLoader();
      });
    })
  );
};
