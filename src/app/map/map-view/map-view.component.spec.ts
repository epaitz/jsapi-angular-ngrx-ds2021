import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapFactory } from '../map.factory';
import { MapViewComponent } from './map-view.component';
import { cold, hot } from 'jasmine-marbles';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MapActionTypes } from '../map.action.types';

describe('MapViewComponent', () => {
    let mapViewComponent: MapViewComponent;
    let componentFixture: ComponentFixture<MapViewComponent>;
    let mockStore: any;
    let mockMapFactory: any;

    const initialState = { };

    beforeEach(async () => {
        mockMapFactory = jasmine.createSpyObj('mockMapFactory', ['initializeMapView', 'removeMapViewContainer']);

        await TestBed.configureTestingModule({
            declarations: [
                MapViewComponent
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ],
            providers: [
                provideMockStore({ initialState }),
                { provide: MapFactory, useValue: mockMapFactory }
            ]
        })
        .compileComponents();

        mockStore = TestBed.inject(MockStore);
    });

    beforeEach(() => {
        componentFixture = TestBed.createComponent(MapViewComponent);
        mapViewComponent = componentFixture.componentInstance;
    });

    it ('ngOnInit_shouldInitializeServiceStatus', () => {

        // Define the app state in the store
        mockStore.setState({ mapState: { status: { type: 'loading'}}});

        // Call the method under test
        componentFixture.detectChanges();

        const expected = cold('(a)', { a: { type: 'loading' } });
        expect(mapViewComponent.serviceStatus$).toBeObservable(expected);
    });

    it ('ngOnInit_shouldDispatchGetWebMap_andCallInitializeMapView_givenWebMap', () => {

        spyOn(mockStore, 'dispatch').and.callThrough();

        // Define the app state in the store
        mockStore.setState({ mapState: { webMap: {}}});

        // Call the method under test
        componentFixture.detectChanges();

        expect(mockMapFactory.initializeMapView).toHaveBeenCalledTimes(1);
        expect(mockStore.dispatch).toHaveBeenCalledWith({ type: MapActionTypes.GetWebMap });
    });

    it ('ngOnInit_shouldNotDispatchGetWebMap_andCallInitializeMapView_givenNullWebMap', () => {

        spyOn(mockStore, 'dispatch').and.callThrough();

        // Define the app state in the store
        mockStore.setState({ mapState: { webMap: null}});

        // Call the method under test
        componentFixture.detectChanges();

        expect(mockMapFactory.initializeMapView).toHaveBeenCalledTimes(0);
        expect(mockStore.dispatch).toHaveBeenCalledWith({ type: MapActionTypes.GetWebMap });
    });

    it('refresh_should_given', () => {

        spyOn(mockStore, 'dispatch').and.callThrough();

        // Call the method under test
        mapViewComponent.refresh();

        expect(mockStore.dispatch).toHaveBeenCalledWith({ type: MapActionTypes.GetWebMap });
    });

    it('ngOnDestroy_shouldCallRemoveMapViewContainer', () => {

        // Initialize the component
        componentFixture.detectChanges();

        // Call the method under test
        componentFixture.destroy();

        expect(mockMapFactory.removeMapViewContainer).toHaveBeenCalledTimes(1);
    });

    it('ngOnDestroy_shouldUnsubscribe', () => {

        /* tslint:disable:no-string-literal */
        spyOn(mapViewComponent['ngUnsubscribe'], 'next').and.callThrough();
        spyOn(mapViewComponent['ngUnsubscribe'], 'complete').and.callThrough();
        /* tslint:enable:no-string-literal */

        // Initialize the component
        componentFixture.detectChanges();

        // Call the method under test
        componentFixture.destroy();

        /* tslint:disable:no-string-literal */
        expect(mapViewComponent['ngUnsubscribe'].next).toHaveBeenCalledTimes(1);
        expect(mapViewComponent['ngUnsubscribe'].complete).toHaveBeenCalledTimes(1);
        /* tslint:enable:no-string-literal */
    });
});
