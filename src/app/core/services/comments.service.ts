import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../src/environments/environment';

interface commentData {
post : string ,
conent : string
}

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
private http = inject(HttpClient);

getAllComments(postId : string):Observable<any>{
return this.http.get<any>(`https://linked-posts.routemisr.com/posts/${postId}/comments`);
}


createComment({post , content} : {post : string , content : string}):Observable<any>{
return this.http.post<any>(`${environment.endPointOfComment}`, {post,content});
}



deleteComment(commentId : string){
return this.http.delete(`https://linked-posts.routemisr.com/comments/${commentId}`)
}


updateComment(commentId : string ,content : string):Observable<any>{
return this.http.put<any>(`https://linked-posts.routemisr.com/comments/${commentId}`,{content});
}

}
