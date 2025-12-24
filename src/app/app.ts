import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { LoaderComponent } from "./shared/components/loader/loader.component";
import { CookieService } from 'ngx-cookie-service';
import { AuthserviceService } from './core/auth/authservice.service';
import { LoaderService } from './core/services/loader.service';
import { FlowbiteService } from './core/services/flowbite.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoaderComponent ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App{
  protected readonly title = signal('social');
  private cookie = inject(CookieService);
  private _authService = inject(AuthserviceService);
  _loaderService = inject(LoaderService);
  private route = inject(Router);
  private _flowBiteService = inject(FlowbiteService);


constructor(){
  console.log(!!this.cookie.get('token'))
    if(!!this.cookie.get('token') == true){
      // this.route.navigate(['/main'])
    }else{
      this.route.navigate(['/auth/login'])
    }

  

}
  ngOnInit(): void {
    initFlowbite();
  }

}
