import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SidenavService } from '../shared/services/sidenav.service';

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
    public sidenavOpened$: Observable<boolean>;

    private routeChildPath: string;
    private ngUnsubscribe: Subject<any> = new Subject();

    constructor(
        private sidenavService: SidenavService,
        private mediaObserver: MediaObserver,
        private activatedRoute: ActivatedRoute,
        private router: Router) { }

    ngOnInit(): void {

        this.updateRouteDataLabel();
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd ))
            .subscribe(() => {
                this.updateRouteDataLabel();
            });

        this.sidenavOpened$ = this.sidenavService.getSidenavOpened();
        this.mediaObserver.asObservable()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(() => {
                this.isXs = this.mediaObserver.isActive('xs');
                this.isSm = this.mediaObserver.isActive('sm');
                if (this.isXs || this.isSm) {
                    this.mode = 'over';
                    this.sidenavService.close(this.routeChildPath);
                } else {
                    this.mode = 'side';
                    this.sidenavService.open(this.routeChildPath);
                }
            });
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    sidenavClose(): void {
        this.sidenavService.close(this.routeChildPath);
    }

    private updateRouteDataLabel(): void {
        const snapshot = this.activatedRoute.snapshot;
        this.routeChildPath = '/' + snapshot.routeConfig.path + '/' + snapshot.firstChild.routeConfig.path;
        this.routeDataLabel = snapshot.firstChild.data.label;
    }
}
