import { Component, inject } from '@angular/core';
import { AuthserviceService } from '../../../core/auth/authservice.service';
import { LoaderService } from '../../../core/services/loader.service';


@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css',
})
export class LoaderComponent {
_authService = inject(AuthserviceService);
_loaderService = inject(LoaderService);
constructor(){

}



}

