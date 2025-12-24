import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { AuthserviceService } from '../../auth/authservice.service';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent {
route = inject(Router);
private _authService = inject(AuthserviceService);
isLoading = false;
private tostarService = inject(ToastrService);
cookie = inject(CookieService); 
tostar = inject(ToastrService);
forgetPasswordForm = new FormGroup({
password : new FormControl('' , [Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
newPassword : new FormControl('' , [Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
})



handleforgetPasswordForm(){
if(this.forgetPasswordForm.invalid){
this.forgetPasswordForm.markAllAsTouched();
return;
}


if(!this.forgetPasswordForm.invalid) {
this.isLoading = true ;
this._authService.resetPassword(this.forgetPasswordForm.value).subscribe(({
next : (res)=>{
console.log(res);
this.tostar.success('Password Changed');
this.route.navigateByUrl('/auth/login');
this.cookie.set('token' , res.token);
this.isLoading = false;
},

error : (error)=>{
this.tostar.error(error);
this.isLoading = false ;
}



}))


}


}

}
