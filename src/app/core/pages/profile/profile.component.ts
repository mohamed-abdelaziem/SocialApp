import { Post } from './../../interfaces/response-of-post.interface';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';
import { UserData, UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { PostCardComponent } from "../../../shared/components/post-card/post-card.component";

@Component({
  selector: 'app-profile',
  imports: [RouterLink, DatePipe, PostCardComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
private _cookieService = inject(CookieService);
private route = inject(Router);
private _userService = inject(UserService);
user !: UserData ;
posts !: Post[];
private tostar = inject(ToastrService);
modelIsShow : boolean = false;
imageFile !: File | null;
fileName !: string;
myDataOfImage !: FormData;
isLoadin : boolean = false ;
userId !: string ;
ngOnInit(): void {
  this._userService.getUserData().subscribe({
    next : (res)=>{
      this.user = res.user;
      this.userId = this.user._id;
      this.tostar.success('Welcome To Profile Page');
    },
    error : (err)=>{
      this.tostar.error("Can't Get Your Data");
    }


  })
}


logOut(){
this._cookieService.delete('token');
this.route.navigate(['/auth/login'])
}



foundFile(event : Event){
const file = (event.target as HTMLInputElement).files;
if(file){
this.imageFile = file[0];
this.fileName = file[0].name;
const dataOfImage = new FormData();

dataOfImage.append('photo' , this.imageFile);
console.log(dataOfImage)
this.myDataOfImage = dataOfImage;
}else{
return;
}



}




uploadImage(){
if(this.fileName){

this.isLoadin = true ;
this._userService.uploadImageProfile(this.myDataOfImage).subscribe({
next : (res)=>{
console.log(res);
this.isLoadin = false ;
},

error : (err)=>{
this.isLoadin = false;
}

})
}



}



showUserPosts(){
this._userService.getUserPost(this.userId,2).subscribe({
next : (res)=>{
this.posts = res.posts;
console.log(this.posts);
}

})
}


}


