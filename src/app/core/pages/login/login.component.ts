import { CookieService } from 'ngx-cookie-service';
import { Component, effect, EffectCleanupRegisterFn, inject, signal } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms"
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthserviceService } from '../../auth/authservice.service';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

 route = inject(Router)
  cookie = inject(CookieService);
  tostar = inject(ToastrService);
  _authService = inject(AuthserviceService);
  isLoading = signal<boolean>(false);
// form controller

loginForm  = new FormGroup({
email : new FormControl('' , [Validators.required , Validators.email]),
password : new FormControl('' , [Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)])
})


// handle login form
handleLoginForm(){
console.log(this.loginForm.value);
if(this.loginForm.invalid){
this.loginForm.markAllAsTouched();
return;
}

this.isLoading.set(true);
this._authService.login(this.loginForm.value!).subscribe({
next : (res)=>{
this.isLoading.set(false);
this.cookie.set('token' , res.token);
this.route.navigate(['/main']);
this.tostar.success('Login Success');
},

error : (err)=>{
this.isLoading.set(false);
this.loginForm.markAllAsTouched();
this.tostar.error('Login Failed');
}

})





}
















}
