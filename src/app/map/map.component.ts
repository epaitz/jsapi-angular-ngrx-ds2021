import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppState } from '../app.state';
import { selectRouterState, selectSidenavOpened } from './map.selectors';
import * as MapActions from './map.actions';
import { RouterService } from '../shared/services/router.service';
import { RouteMetadata } from '../shared/models/route-metadata';

@Component({
    selector: 'app-map-component',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {

    public isXs = false;
    public isSm = false;
    public mode: string;
    public routeDataLabel: string;
    public routerConfig: RouteMetadata[];
    public sidenavOpened$: Observable<boolean>;

    private routeChildUrl: string;
    private ngUnsubscribe: Subject<any> = new Subject();

    constructor(
        private store: Store<AppState>,
        private mediaObserver: MediaObserver,
        private routerService: RouterService) { }

    ngOnInit(): void {

        this.routerConfig = this.routerService.getRouterConfigMetadata();

        this.sidenavOpened$ = this.store.select(selectSidenavOpened);

        this.store.select(selectRouterState)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((state) => {
                this.routeChildUrl = state.state.url;
            });

        this.mediaObserver.asObservable()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(() => {
                this.isXs = this.mediaObserver.isActive('xs');
                this.isSm = this.mediaObserver.isActive('sm');
                if (this.isXs || this.isSm) {
                    this.mode = 'over';
                    this.store.dispatch(MapActions.SidenavClose({path: this.routeChildUrl}));
                } else {
                    this.mode = 'side';
                    this.store.dispatch(MapActions.SidenavOpen({path: this.routeChildUrl}));
                }
            });
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    sidenavToggle(path: string): void {
        this.store.dispatch(MapActions.SidenavToggle({path: path}));
    }

    sidenavClose(): void {
        this.store.dispatch(MapActions.SidenavClose({path: this.routeChildUrl}));
    }
}
