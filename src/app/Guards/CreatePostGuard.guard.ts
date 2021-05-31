import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Admin } from '../Pages/Admin/Admin.component';
import { Auth } from '../Services/Auth.service';

@Injectable()
export class CreatePostGuard implements CanActivate{

    constructor(private auth:Auth,private router:Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if (this.auth.isAdmin) {
             return true;
        } else{
             this.router.navigateByUrl('/');
             return false;
        }
    }

    canDeactivate(component:Admin,activatedRoute:ActivatedRouteSnapshot,state: RouterStateSnapshot,state2: RouterStateSnapshot):boolean | UrlTree | Observable<boolean>{
        if(component.isOpened){
            return window.confirm("Your data are not going to be saved. Do you want to leave the page?")
        }
        return true;
    }

}