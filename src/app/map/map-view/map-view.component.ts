import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
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

    constructor(
        private store: Store<AppState>,
        private mapFactory: MapFactory) { }

    ngOnInit(): void {

        this.serviceStatus$ = this.store.select(selectWebMapStatus);

        this.store.select(selectWebMap)
            .pipe(filter(webMap => webMap != null))
            .subscribe((webMap) => {
                this.mapFactory.initializeMapView(this.elementRef, webMap);
            });

        this.store.dispatch(MapActions.GetWebMap());
    }

    ngOnDestroy(): void {
        this.mapFactory.removeMapViewContainer(this.elementRef);
    }

    refresh(): void {

    }
}
