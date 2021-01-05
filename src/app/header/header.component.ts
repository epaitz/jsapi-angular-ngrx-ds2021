import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { RouteMetadata } from '../shared/models/route-metadata';
import { RouterService } from '../shared/services/router.service';
import * as MapActions from '../map/map.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    public routes: RouteMetadata[];

    constructor(
        private store: Store<AppState>,
        private routerService: RouterService) { }

    ngOnInit(): void {
        this.routes = this.routerService.getRouterConfigMetadata();
        this.routerService.updateRedirectTo();
    }

    sidenavOpen(path: string): void {
        this.store.dispatch(MapActions.SidenavOpen({path: path}));
    }
}
