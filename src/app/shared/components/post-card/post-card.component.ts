import { Component, inject, input, OnInit } from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { CommentCardComponent } from "../comment-card/comment-card.component";
import { DatePipe } from '@angular/common';
import { CommentsService } from '../../../core/services/comments.service';
import { Post } from '../../../core/interfaces/response-of-post.interface';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { PostsService } from '../../../core/services/posts.service';
import { UserData, UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-post-card',
  imports: [CommentCardComponent, DatePipe, ReactiveFormsModule, RouterLink],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css',
})
export class PostCardComponent  {
isShow : boolean = false;
post = input.required<Post>();
userData !: UserData;
comments : any;
private _commentsService = inject(CommentsService);
_postService = inject(PostsService);
commentContent = new FormControl("" , Validators.required);
tostar = inject(ToastrService);
imageFile !: File | null ;
postContent = new FormControl(``, [Validators.required]);
myData !: FormData;
_userService = inject(UserService);

ngOnInit(): void {
  this._userService.getUserData().subscribe({
    next:(res)=>{
      this.userData = res.user;
    }
  })
}

  showComments(postId : string){
      this._commentsService.getAllComments(postId).subscribe(({
      next : (res)=>{
        this.comments = res.comments
        console.log(res , "from show comment");
      },
      error : (err)=>{
        console.log(err , "from show comment");
      }


    }))
  }







 
 
  
  createComment({post , content} : {post : string , content : string}){
    this._commentsService.createComment({post,content}).subscribe({
      next : (res)=>{
        console.log(res);
        this.comments = res.comments;
        this._commentsService.getAllComments(post);
        this.tostar.success('Comment Is Created Success');
        this.commentContent.reset();
      },
      error : (err)=>{
       this.tostar.error('Please Try Again');
        
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
this._postService.updatePost(data,this.post().id).subscribe({
next:(res)=>{
this.tostar.success('Post Updated');
window.location.reload();
},
error:(err)=>{
this.tostar.error('Please Try Again');
}
})


}else{
this.postContent.markAllAsTouched();
}


}



deletePost(postId : string){
this._postService.deletePost(postId).subscribe({
next : (res)=>{
this.tostar.success('Post is Deleted Success');
window.location.reload();
},
error:(err)=>{
this.tostar.error('You Are Not Allowed To Do That');
}
})

}


}
