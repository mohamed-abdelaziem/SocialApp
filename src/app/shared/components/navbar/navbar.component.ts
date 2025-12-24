import { TimeLineComponent } from './../../../core/pages/time-line/time-line.component';
import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { ResponseOfUser, UserData, UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {

_userService = inject(UserService);
userDate !: UserData;


ngOnInit(): void {
  this._userService.getUserData().subscribe({
    next:(res)=>{
      this.userDate = res.user;
    }
  })
}


}
