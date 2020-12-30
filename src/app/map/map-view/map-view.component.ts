import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { AppState } from 'src/app/app.state';
import { ServiceStatus } from 'src/app/shared/models/service-status';
import * as MapActions from '../map.actions';
import { MapFactory } from '../map.factory';
import { selectWebMap, selectWebMapStatus } from '../map.selectors';

@Component({
    selector: 'app-map-view-component',
    templateUrl: './map-view.component.html',
    styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit, OnDestroy {

    @ViewChild('mapViewDiv', { static: true }) private elementRef: ElementRef;

    public serviceStatus$: Observable<ServiceStatus>;

    private ngUnsubscribe: Subject<any> = new Subject();

    constructor(
        private store: Store<AppState>,
        private mapFactory: MapFactory) { }

    ngOnInit(): void {

        this.serviceStatus$ = this.store.pipe(select(selectWebMapStatus));

        this.store.select(selectWebMap)
            .pipe(filter(webMapDocument => webMapDocument != null))
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((webMapDocument) => {
                this.mapFactory.initializeMapView(this.elementRef, webMapDocument);
            });

        this.store.dispatch(MapActions.GetWebMap());
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
        this.mapFactory.removeMapViewContainer(this.elementRef);
    }

    refresh(): void {
        this.store.dispatch(MapActions.GetWebMap());
    }
}
