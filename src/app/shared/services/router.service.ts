import { Injectable } from '@angular/core';
import { NavigationEnd, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RouteMetadata } from '../models/route-metadata';
import { AuthGuardService } from './auth-guard.service';

@Injectable({
    providedIn: 'root'
})
export class RouterService {

    private eventsSubscription: Subscription;

    constructor(
        private router: Router,
        private authGuardService: AuthGuardService) {
    }

    getRouterConfigMetadata(): RouteMetadata[] {
        return this.processRoutes(null, this.router.config);
    }

    updateRedirectTo(): void {
        if (this.eventsSubscription != null) { return; }

        this.eventsSubscription = this.router.events
            .subscribe((event) => {
                if (event instanceof NavigationEnd) {
                    const lastIndex = event.url.lastIndexOf('/');
                    if (lastIndex > 0) {
                        const baseUrl = event.url.substring(1, lastIndex);
                        const baseRoute = this.getBaseRoute(baseUrl);
                        this.updateRedirectToForRoute(baseRoute, event.url);
                    }
                }
            });
    }

    private processRoutes(parent: Route, routes: Route[]): RouteMetadata[] {
        if (routes == null) { return null; }

        return routes
            .filter((route: Route) => {
                return route.data != null;
            })
            .filter((route: Route) => {
                return (route.canActivate == null ? true : this.authGuardService.hasAccess(route));
            })
            .map((route: Route) => {
                return new RouteMetadata(
                    route.data.label,
                    route.path,
                    (parent != null ? '/' + parent.path + '/' + route.path : route.path),
                    route.data.icon,
                    this.processRoutes(route, route.children)
                );
            });
    }

    private getBaseRoute(baseUrl: string): Route {
        return this.router.config
            .find((route) => {
                return route.path.toLowerCase() === baseUrl.toLowerCase();
            });
    }

    private updateRedirectToForRoute(route: Route, url: string): void {
        if (route == null) { return; }
        const childRoute = route.children
            .find((x) => {
                return x.path === '' && x.redirectTo != null;
            });
        if (childRoute != null) {
            childRoute.redirectTo = url;
        }
    }
}
