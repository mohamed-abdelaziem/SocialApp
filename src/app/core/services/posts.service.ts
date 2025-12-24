import { CookieService } from 'ngx-cookie-service';
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
   return this.http.get<ResponseOfPost>(`https://linked-posts.routemisr.com/posts` , {headers : {toekn : this.cookie.get('token')}});
  }


  createPost(data : FormData):Observable<any>{
    return this.http.post<any>(`https://linked-posts.routemisr.com/posts`, data);
  }

  getSinglePost(postId : string):Observable<any>{
    return this.http.get<any>(`https://linked-posts.routemisr.com/posts/${postId}`);
  }


  updatePost(data : FormData , postId : string):Observable<any>{
  return  this.http.put<any>(`https://linked-posts.routemisr.com/posts/${postId}` , data);
  }


  deletePost(postId:string):Observable<any>{
    return this.http.delete(`https://linked-posts.routemisr.com/posts/${postId}`);
  }

}

