import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
return this.http.get<ResponseOfUser>(`https://linked-posts.routemisr.com/users/profile-data`)
}

uploadImageProfile(photo : FormData):Observable<any>{
return this.http.put<any>(`https://linked-posts.routemisr.com/users/upload-photo` , photo);
}

getUserPost(userId : string , limit ?: number):Observable<any>{
return this.http.get<any>(`https://linked-posts.routemisr.com/users/${userId}/posts?limit=${limit}`);
}



}
