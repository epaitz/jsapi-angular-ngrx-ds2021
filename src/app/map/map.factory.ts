import { Injectable, ElementRef, Renderer2, RendererFactory2 } from '@angular/core';
import MapView from '@arcgis/core/views/MapView';
import WebMap from '@arcgis/core/WebMap';
import { Observable, ReplaySubject } from 'rxjs';
import { WebMapDocument } from '../shared/models/webmap-document';

@Injectable({
    providedIn: 'root',
})
export class MapFactory {

    private webMap: WebMap;
    private mapView: MapView;
    private renderer: Renderer2;
    private mapViewContainer: HTMLDivElement;
    private mapViewSubject: ReplaySubject<MapView>;

    constructor(private rendererFactory: RendererFactory2) {
        this.mapViewSubject = new ReplaySubject<MapView>(1);
    }

    public getMapView(): Observable<MapView> {
        return this.mapViewSubject.asObservable();
    }

    public initializeMapView(elementRef: ElementRef, webMapDocument: WebMapDocument): MapView {
        this.createMapViewContainer(elementRef);
        this.createWebMap(webMapDocument);
        this.createMapView();
        this.mapViewSubject.next(this.mapView);
        return this.mapView;
    }

    private createMapViewContainer(elementRef: ElementRef): void {
        if (elementRef == null) { return; }
        if (this.mapViewContainer == null) {
            this.mapViewContainer = document.createElement('div');
            this.mapViewContainer.style.cssText = 'height: 100%';
        }
        this.initializeRenderer();
        this.renderer.appendChild(elementRef.nativeElement, this.mapViewContainer);
    }

    private createWebMap(webMapDocument: WebMapDocument): void {
        if (this.webMap == null) {

            // The JSON from NgRx is immutable the WebMap.fromJSON() validates the JSON
            // and removes whitespace so we are uisng parse/stringify to make a clone.
            // This should be fixed in a future version of the JSAPI.
            this.webMap = WebMap.fromJSON(JSON.parse(JSON.stringify(webMapDocument)));
        }
    }

    private createMapView(): void {
        if (this.mapView == null) {
            this.mapView = new MapView(
                {
                    container: this.mapViewContainer,
                    map: this.webMap
                }
            );
        }
    }

    private initializeRenderer(): void {
        if (this.renderer == null) {
            this.renderer = this.rendererFactory.createRenderer(null, null);
        }
    }

    public removeMapViewContainer(elementRef: ElementRef): void {
        this.initializeRenderer();
        this.renderer.removeChild(elementRef.nativeElement, this.mapViewContainer);
    }
}
