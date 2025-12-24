import { AbstractControl, FormControl, Validators ,  } from '@angular/forms';
import { Component, inject, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthserviceService } from '../../auth/authservice.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
tostarService = inject(ToastrService);
route  = inject(Router);
dateValue = '';
passwordConfirm = false;
isLoading = signal<boolean>(false)
  cookie = inject(CookieService)
private _authService = inject(AuthserviceService);
// register form controller 
registerForm = new FormGroup(
  {
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
    ]),
    rePassword: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required])
  },
  { validators: this.handleConfirmPassword }
);


handleConfirmPassword(group: AbstractControl) {
  const password = group.get('password')?.value;
  const rePassword = group.get('rePassword')?.value;

  if (password === rePassword) {
    return null; // ✅ مفيش Error
  } else {
    return { passwordMismatch: true }; // ❌ في Error
  }
}





handleregisterForm(){
this.passwordConfirm = this.registerForm.hasError('passwordMismatch') ;
console.log(this.registerForm.value);

if(this.registerForm.invalid && this.passwordConfirm){
console.log(this.registerForm)
this.registerForm.markAllAsTouched();
this.tostarService.error('Failed Register');
return;
}


if(!this.registerForm.invalid){
this.isLoading.set(true);
this._authService.register(this.registerForm?.value).subscribe((
  {

    next : (res)=>{
      console.log(res);
      this.tostarService.success('Success Register');
      this.isLoading.set(false);
      this.route.navigateByUrl('/auth/login');
    },

    error : (err)=>{
      console.log(err);
      this.tostarService.error('User Already Exist');
      this.isLoading.set(false);
      this.registerForm.markAllAsTouched();
    }

  }
))
}









  
}



getDateValue(event : Event){
this.dateValue = (event.target as HTMLInputElement).value;
}






}
