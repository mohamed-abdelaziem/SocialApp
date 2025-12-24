import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';


// main routes
export const routes: Routes = [
{
path : "",
redirectTo : "/main",
pathMatch : "full"
}
,


{
path :"main",
canActivate:[authGuard] ,
loadComponent : ()=>import("../app/core/layouts/main-layout/main-layout.component").then(file=>file.MainLayoutComponent),
title : "Home",
children : [
{path : "" ,canActivate:[authGuard] ,loadComponent : ()=>import("../app/core/pages/time-line/time-line.component").then(file=>file.TimeLineComponent) , title : "Home"},
{path : "profile" , canActivate:[authGuard] , loadComponent : ()=>import("../app/core/pages/profile/profile.component").then(file=>file.ProfileComponent) , title : "Profile"},
{path : "post-details/:id" , canActivate:[authGuard] , loadComponent : ()=>import("../app/core/pages/post-details/post-details.component").then(file=>file.PostDetailsComponent) , title : "Post Details"}
]
}

,



{
path :"auth",
loadComponent : ()=>import("../app/core/layouts/auth-layout/auth-layout.component").then(file=>file.AuthLayoutComponent),
title : "Auth",
children : [
{path : "login" ,loadComponent : ()=>import("../app/core/pages/login/login.component").then(file=>file.LoginComponent) , title : "Login"},
{path : "register" , loadComponent : ()=>import("../app/core/pages/register/register.component").then(file=>file.RegisterComponent) , title : "Register"},
{path : "forget-password" , loadComponent : ()=>import("../app/core/pages/forget-password/forget-password.component").then(file=>file.ForgetPasswordComponent) , title : "Foregt Password"},
]
}

,
{
path : "**",
loadComponent : ()=>import("../app/core/pages/not-found/not-found.component").then(file=>file.NotFoundComponent),
title : "Not Found"
}




];
