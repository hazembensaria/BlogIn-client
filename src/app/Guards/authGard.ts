import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../Servecis/userService';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService:UserService,private  route:Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isLogedIn= this.userService.islogednow
    const isAdmin= this.userService.userRole
    console.log("is lgoed"+isLogedIn)
    if (!isLogedIn){
      this.route.navigate(["/"])
    }
    return isLogedIn;
  }

}
