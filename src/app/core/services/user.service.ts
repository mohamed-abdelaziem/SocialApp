import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
export interface ResponseOfUser {
  message: string
  user: UserData
}

export interface UserData {
  _id: string
  name: string
  email: string
  dateOfBirth: string
  gender: string
  photo: string
  createdAt: string
}


@Injectable({
  providedIn: 'root',
})
export class UserService {
private http = inject(HttpClient); 
  
getUserData():Observable<ResponseOfUser>{
return this.http.get<ResponseOfUser>(`${environment.endPointOfUser}`)
}

uploadImageProfile(photo : FormData):Observable<any>{
return this.http.put<any>(`https://linked-posts.routemisr.com/users/upload-photo` , photo);
}

getUserPost(userId : string , limit ?: number):Observable<any>{
return this.http.get<any>(`https://linked-posts.routemisr.com/users/${userId}/posts?limit=${limit}`);
}



}
