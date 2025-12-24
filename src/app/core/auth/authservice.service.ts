import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthserviceService {
  
private http = inject(HttpClient);
cookie = inject(CookieService);

register({name  , email , password , rePassword , dateOfBirth , gender}: any) : Observable<{message : string}>{
return this.http.post<{message : string}>(`https://linked-posts.routemisr.com/users/signup` , {name  , email , password , rePassword , dateOfBirth , gender})
}


login({email , password} : any):Observable<{message : string , token : string}>{
return this.http.post<{message : string , token : string}>(`https://linked-posts.routemisr.com/users/signin`,{email , password} )
}


resetPassword({password , newPassword}:any):Observable<any>{
return this.http.patch<any>(`https://linked-posts.routemisr.com/users/change-password` , {password,newPassword} , {headers : 
{
token : this.cookie.get('token')
}
});
}


}
