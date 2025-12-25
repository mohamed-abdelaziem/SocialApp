import { CookieService } from 'ngx-cookie-service';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface commentData {
post : string ,
conent : string
}

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
private http = inject(HttpClient);
private cookie = inject(CookieService);
getAllComments(postId : string):Observable<any>{
return this.http.get<any>(`https://linked-posts.routemisr.com/posts/${postId}/comments`);
}


createComment({post , content} : {post : string , content : string}):Observable<any>{
return this.http.post<any>(`https://linked-posts.routemisr.com/comments`, {post,content});
}



deleteComment(commentId : string):Observable<any>{
return this.http.delete<any>(`https://linked-posts.routemisr.com/comments/${commentId}`)
}


updateComment(commentId : string ,content : string):Observable<any>{
return this.http.put<any>(`https://linked-posts.routemisr.com/comments/${commentId}`,{content});
}

}
