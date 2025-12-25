import { CommentsService } from './../../../core/services/comments.service';
import { Component, inject, input, output } from '@angular/core';
import { CommentCreator, CommentOfPost } from '../../../core/interfaces/response-of-post.interface';
import { DatePipe } from '@angular/common';
import { UserData, UserService } from '../../../core/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoaderService } from '../../../core/services/loader.service';

@Component({
  selector: 'app-comment-card',
  imports: [DatePipe , ReactiveFormsModule],
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.css',
})
export class CommentCardComponent {

comment = input.required<CommentOfPost>(); 
_userService = inject(UserService);
commentCliked = output<string>();
_loaderService = inject(LoaderService);
userData !: UserData;
isShow  = false;
commentContent = new FormControl('' , [Validators.required])
_commentService = inject(CommentsService);
tostar  = inject(ToastrService);
ngOnInit(): void {
  this._userService.getUserData().subscribe({
    next:(res)=>{
      this.userData = res.user;
    }
  })
}




deleteComment(commentId:string){
this._loaderService.isLoading.set(true);
this._commentService.deleteComment(commentId).subscribe({
next : (res)=>{
this.tostar.success('Comment is Deleted');
this.isShow = false;
console.log(res);
this._loaderService.isLoading.set(false);
console.log("Comment Creator : ",this.comment().commentCreator);
},
error:(err)=>{
console.log(commentId);
console.log(err);
this.isShow = false;
this.tostar.error('Please Try Again');
this._loaderService.isLoading.set(false);
}
})
}




updateComment(commentId : string , content : string){
if(this.commentContent.valid){
this._commentService.updateComment(commentId , content).subscribe({
next : (res)=>{
this.tostar.success('Comment Is Updated');
this.isShow = false;
this.commentContent.reset();
this._loaderService.isLoading.set(false);
},
error:(err)=>{
this.tostar.error('Please Try Again');
this._loaderService.isLoading.set(false);
}
})

}

}

}
