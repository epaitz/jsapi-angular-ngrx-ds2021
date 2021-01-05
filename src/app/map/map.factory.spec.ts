import { MapFactory } from './map.factory';
import config from '@arcgis/core/config.js';
import { WebMapDocument } from '../shared/models/webmap-document';

describe('MapFactory', () => {

    let mapFactory: MapFactory;
    let mockRendererFactory: any;

    beforeEach(() => {
        config.assetsPath = '/assets';
        mockRendererFactory = jasmine.createSpyObj('mockRendererFactory', ['createRenderer']);
        mapFactory = new MapFactory(mockRendererFactory);
    });

    it('initializeMapView_shouldReturnMapView', (done) => {

        const renderer = { appendChild(): void {} };
        mockRendererFactory.createRenderer.and.returnValue(renderer);

        spyOn(renderer, 'appendChild').and.callThrough();

        mapFactory
            .getMapView()
            .subscribe((mapView: any) => {
                expect(mapView != null).toBe(true);
                expect(renderer.appendChild).toHaveBeenCalledTimes(1);
                done();
            });

        const elementRef = { nativeElement: {}} as any;
        const webMapDocument = new WebMapDocument();

        // Call the method under test
        mapFactory.initializeMapView(elementRef, webMapDocument);
    });

    it('removeMapViewContainer_shouldCallRemoveChild_givenElementRef', () => {

        const renderer = { appendChild(): void {}, removeChild(): void {} };
        mockRendererFactory.createRenderer.and.returnValue(renderer);

        spyOn(renderer, 'removeChild').and.callThrough();

        const elementRef = { nativeElement: {}} as any;
        const webMapDocument = new WebMapDocument();

        mapFactory.initializeMapView(elementRef, webMapDocument);

        // Call the method under test
        mapFactory.removeMapViewContainer(elementRef);

        expect(renderer.removeChild).toHaveBeenCalledTimes(1);
    });
});

