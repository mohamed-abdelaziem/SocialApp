import { CommentsService } from './../../../core/services/comments.service';
import { Component, inject, input, output } from '@angular/core';
import { CommentCreator, CommentOfPost } from '../../../core/interfaces/response-of-post.interface';
import { DatePipe } from '@angular/common';
import { UserData, UserService } from '../../../core/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

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
this._commentService.deleteComment(commentId).subscribe({
next : (res)=>{
this.tostar.success('Comment is Deleted');
window.location.reload();
},
error:(err)=>{
this.tostar.error('Please Try Again')
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
console.log(res);
},
error:(err)=>{
this.tostar.error('Please Try Again');
window.location.reload();
}
})

}

}

}
