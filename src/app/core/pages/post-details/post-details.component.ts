import { UserData } from './../../services/user.service';
import { Component, inject, input, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommentOfPost, Post } from '../../interfaces/response-of-post.interface';
import { CommentsService } from '../../services/comments.service';
import { FlowbiteService } from '../../services/flowbite.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentCardComponent } from '../../../shared/components/comment-card/comment-card.component';
import { DatePipe } from '@angular/common';
import { PostsService } from '../../services/posts.service';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-post-details',
  imports: [RouterLink , CommentCardComponent,DatePipe , ReactiveFormsModule],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css',
})
export class PostDetailsComponent {

post !: Post;
comments !: CommentOfPost[];
private _commentsService = inject(CommentsService);
private flowbiteService = inject(FlowbiteService)
commentContent = new FormControl("" , Validators.required);
private activteRoute = inject(ActivatedRoute);
private _postService = inject(PostsService);
imageFile !: File | null ;
postContent = new FormControl(``, [Validators.required]);
myData !: FormData;
_userService = inject(UserService);
userData !: UserData;
tostar = inject(ToastrService);
isShow : boolean = false;
_loaderService = inject(LoaderService);
ngOnInit(): void {
this.activteRoute.paramMap.subscribe((params)=>{
const id = params.get('id');
console.log(id);
this._loaderService.isLoading.set(true);
this._postService.getSinglePost(id!).subscribe({
next : (res)=>{
this.post = res.post;
this._loaderService.isLoading.set(false);
}
})
})
this._loaderService.isLoading.set(true);
  this._userService.getUserData().subscribe({
    next:(res)=>{
      this.userData = res.user;
      this._loaderService.isLoading.set(false);
    }
  })


}


  showComments(postId : string){
    this._loaderService.isLoading.set(true);
      this._commentsService.getAllComments(postId).subscribe(({
      next : (res)=>{
        this.comments = res.comments;
        this._loaderService.isLoading.set(false);
      },
      error : (err)=>{
        console.log(err);
        this._loaderService.isLoading.set(false);
      }


    }))
  }







 
 
  
  createComment({post , content} : {post : string , content : string}){
    this._loaderService.isLoading.set(true);
    this._commentsService.createComment({post,content}).subscribe({
      next : (res)=>{
        console.log(res);
        this.comments = res.comments;
        this._loaderService.isLoading.set(false);
      },
      error : (err)=>{
        console.log(err);
        this._loaderService.isLoading.set(false);
        
      }
    })

 
  }



FoundImageFile(event : Event){
const image = (event.target as HTMLInputElement);
if(image){
if(image.files){
this.imageFile = image?.files[0];
console.log(this.imageFile);
}

}

}


updatePosT(){
if(this.imageFile?.name && this.postContent.valid){
const data = new FormData();
data.append('body' , this.postContent.value!);
data.append('image' , this.imageFile!);
this._loaderService.isLoading.set(true);
this._postService.updatePost(data,this.post.id).subscribe({
next:(res)=>{
this.tostar.success('Post Updated');
this.postContent.reset();
this.isShow = false;
},
error:(err)=>{
this.tostar.error('Please Try Again');
this._loaderService.isLoading.set(false);
this.isShow = false;
}
})


}else{
this.postContent.markAllAsTouched();
}


}



deletePost(postId : string){
this._loaderService.isLoading.set(true);
this._postService.deletePost(postId).subscribe({
next : (res)=>{
this.tostar.success('Post is Deleted Success');
this._loaderService.isLoading.set(false);
},
error:(err)=>{
this.tostar.error('You Are Not Allowed To Do That');
this._loaderService.isLoading.set(false);
}
})

}


}
