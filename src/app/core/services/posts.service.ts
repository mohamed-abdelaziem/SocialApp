import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseOfPost } from '../interfaces/response-of-post.interface';
import { AuthserviceService } from '../auth/authservice.service';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
 private http = inject(HttpClient);
 cookie = inject(CookieService);
 _authService = inject(AuthserviceService);
 
  getAllPosts():Observable<ResponseOfPost>{
   return this.http.get<ResponseOfPost>(`${environment.endPointOfPosts}` , {headers : {toekn : this.cookie.get('token')}});
  }


  createPost(data : FormData):Observable<any>{
    return this.http.post<any>(`${environment.endPointOfPosts}`, data);
  }

  getSinglePost(postId : string):Observable<any>{
    return this.http.get<any>(`${environment.endPointOfPosts}/${postId}`);
  }


  updatePost(data : FormData , postId : string):Observable<any>{
  return  this.http.put<any>(`${environment.endPointOfPosts}/${postId}` , data);
  }


  deletePost(postId:string):Observable<any>{
    return this.http.delete(`${environment.endPointOfPosts}/${postId}`);
  }

}

