import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { MapFactory } from '../../map/map.factory';
import { Subject } from 'rxjs';
import { MapViewProperties } from '../models/map-view-properties';
import { fromJSON } from '@arcgis/core/geometry/support/jsonUtils';
import MapView from '@arcgis/core/views/MapView';
import Extent from '@arcgis/core/geometry/Extent';
import { selectMapViewPropertiesExtent } from 'src/app/map/map.selectors';
import { debounceTime, filter } from 'rxjs/operators';
import * as MapActions from '../../map/map.actions';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {

    private mapView: MapView;
    private mapViewPropertiesSubject: Subject<MapViewProperties>;
    private dispatchTriggeredByMap = false;

    constructor(private store: Store<AppState>, private mapFactory: MapFactory) {
        this.mapFactory.getMapView()
            .subscribe((mapView: MapView) => {
                this.mapView = mapView;
                this.initializeWatch();
            });

        this.store.select(selectMapViewPropertiesExtent)
            .pipe(filter(state => state != null))
            .subscribe((extent: any) => {
                this.navigateTargetFromDispatch(extent);
            });

        this.mapViewPropertiesSubject = new Subject();
        this.mapViewPropertiesSubject
            .pipe(debounceTime(150))
            .subscribe((mapViewProperties: MapViewProperties) => {
                console.log(JSON.stringify(mapViewProperties, null, '\t'));
                this.dispatchMapAction(MapActions.UpdateMapViewProperties({mapViewProperties: mapViewProperties}));
                this.dispatchTriggeredByMap = false;
            });
    }

    public navigateTargetFromDispatch(target: any): void {
        if (this.mapView == null) { return; }
        if (this.dispatchTriggeredByMap) { return; }
        this.goTo(target);
    }

    public goTo(target: any): void {
        if (this.mapView == null) { return; }
        if (target.hasOwnProperty('zoom')) {
            this.mapView.goTo(target);
        } else {
            this.mapView.goTo(fromJSON(target), {duration: 2000});
        }
    }

    private initializeWatch(): void {
        this.mapView.watch('extent', (extent: Extent) => {
            this.mapViewPropertiesSubject.next({
                center: extent.center,
                zoom: this.mapView.zoom,
                extent: extent
            });
        });
    }

    private dispatchMapAction(action: Action): void {
        this.dispatchTriggeredByMap = true;
        try {
            this.store.dispatch(action);
        } finally {
            this.dispatchTriggeredByMap = false;
        }
    }
}
