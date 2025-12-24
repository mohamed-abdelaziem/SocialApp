import { AuthserviceService } from './../../auth/authservice.service';
import { Component, inject } from '@angular/core';
import { NavbarComponent } from "../../../shared/components/navbar/navbar.component";
import { Router, RouterOutlet } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-main-layout',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {
private cookie = inject(CookieService);
private route = inject(Router);
private _authService = inject(AuthserviceService);
constructor(){

}
}
