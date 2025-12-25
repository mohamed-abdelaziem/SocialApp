import { Component, inject, OnInit } from '@angular/core';
import { PostCardComponent } from "../../../shared/components/post-card/post-card.component";
import { PostsService } from '../../services/posts.service';
import { Post } from '../../interfaces/response-of-post.interface';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ResponseOfUser, UserService } from '../../services/user.service';
import { LoaderService } from '../../services/loader.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-time-line',
  imports: [PostCardComponent , ReactiveFormsModule],
  templateUrl: './time-line.component.html',
  styleUrl: './time-line.component.css',
})
export class TimeLineComponent implements OnInit {
private _postService = inject(PostsService);
posts : Post[] = [];
isShow : boolean = false;
fileName !: File | null ;
_userService = inject(UserService);
userDate !: ResponseOfUser;
postContent = new FormControl('' , [Validators.required])
postsOfUser !:Post[];
private _loaderService = inject(LoaderService);
private tostar = inject(ToastrService);


ngOnInit():void{
this._loaderService.isLoading.set(true);
this._userService.getUserData().subscribe({
next : (res)=>{
this.userDate = res;
console.log(this.userDate);
this._loaderService.isLoading.set(false);
this._userService.getUserPost(this.userDate.user._id,20).subscribe({
next : (res)=>{
this.postsOfUser = res.posts;
},
error: (err)=>{
this._loaderService.isLoading.set(false);
console.log(err);
}

})
}


})







this._postService.getAllPosts().subscribe(({
next : (res)=>{
this.posts.push(...this.postsOfUser,...res.posts);
console.log(res);
this._loaderService.isLoading.set(false);
},
error:(err)=>{
console.log(err);
this._loaderService.isLoading.set(false);
}


}))




}


foundFileName(event : Event){
const fileImage = (event.target as HTMLInputElement) 
if(fileImage){
if(fileImage.files){
this.fileName = fileImage.files[0];
}
}
}





createPost(){
if(this.fileName?.name && this.postContent.valid){
const data = new FormData();
data.append('body' , this.postContent.value!);
console.log(this.postContent.value);
console.log(this.fileName);
data.append('image' , this.fileName);
this._loaderService.isLoading.set(true);
this._postService.createPost(data).subscribe({
next : (res)=>{
this.tostar.success('Post Created Success');
this._loaderService.isLoading.set(false);
},
error : (err)=>{
this._loaderService.isLoading.set(false);
this.tostar.error('Please Try Again');
}

})
}else{
this.postContent.markAsTouched();
}

}





}
