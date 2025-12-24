import { Component, inject, OnInit } from '@angular/core';
import { PostCardComponent } from "../../../shared/components/post-card/post-card.component";
import { PostsService } from '../../services/posts.service';
import { Post } from '../../interfaces/response-of-post.interface';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ResponseOfUser, UserService } from '../../services/user.service';

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




ngOnInit():void{


this._userService.getUserData().subscribe({
next : (res)=>{
this.userDate = res;
console.log(this.userDate);
this._userService.getUserPost(this.userDate.user._id,20).subscribe({
next : (res)=>{
this.postsOfUser = res.posts;
},
error: (err)=>{
console.log(err);
}

})
}


})







this._postService.getAllPosts().subscribe(({
next : (res)=>{
this.posts.push(...this.postsOfUser,...res.posts);
console.log(res);
},
error:(err)=>{
console.log(err);
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
this._postService.createPost(data).subscribe({
next : (res)=>{
console.log(res);

console.log('good');
},
error : (err)=>{
console.log('error');
}

})
}else{
this.postContent.markAsTouched();
}

}





}
