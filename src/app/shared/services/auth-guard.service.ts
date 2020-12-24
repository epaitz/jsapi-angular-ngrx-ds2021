import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, Observer } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    
    constructor(private router: Router) { }

    public hasAccess(route: Route | ActivatedRouteSnapshot): boolean {
        if (route instanceof ActivatedRouteSnapshot) {
            return !(route.routeConfig.path === 'admin');
        } else {
            return !(route.path === 'admin');
        }   
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        let hasAccess = this.hasAccess(route);
        console.log(hasAccess)
        if (hasAccess === false) {
            return this.router.createUrlTree(['/home']);
        }
    }

    // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    //     return new Observable((observer: Observer<boolean>) => {
    //         let hasAccess = this.hasAccess(route);
    //         if (hasAccess === false) { this.router.navigateByUrl('/home'); }
    //         observer.next(hasAccess);
    //     });
    // }

}