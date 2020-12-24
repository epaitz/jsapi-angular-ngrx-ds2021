import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaObserver } from '@angular/flex-layout';
import { MapComponent } from './map.component';
import { cold, hot } from 'jasmine-marbles';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { RouterService } from '../shared/services/router.service';
import { of } from 'rxjs';
import MapView from '@arcgis/core/views/MapView';
import { MapActionTypes } from './map.action.types';

describe('MapComponent', () => {
    let mapComponent: MapComponent;
    let componentFixture: ComponentFixture<MapComponent>;
    let mockMediaObserver: any;
    let mockRouterService: any;
    let mockStore: any;

    const initialState = { };

    beforeEach(async () => {
        mockMediaObserver = jasmine.createSpyObj('mockMediaObserver', ['asObservable', 'isActive']);
        mockRouterService = jasmine.createSpyObj('mockRouterService', ['getRouterConfigMetadata']);

        await TestBed.configureTestingModule({
            declarations: [
                MapComponent
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ],
            providers: [
                provideMockStore({ initialState }),
                { provide: MediaObserver, useValue: mockMediaObserver },
                { provide: RouterService, useValue: mockRouterService }
            ]
        })
        .compileComponents();

        mockStore = TestBed.inject(MockStore);
    });

    beforeEach(() => {
        componentFixture = TestBed.createComponent(MapComponent);
        mapComponent = componentFixture.componentInstance;
    });

    it('ngOnInit_shouldSetRouterConfig', () => {

        // Define the app state in the store
        mockStore.setState({ router: { state: { ulr: '/map/search'}}});

        // Setup a response for asObservable and isActive on mockMediaObserver
        mockMediaObserver.asObservable.and.returnValue(of({}));
        mockMediaObserver.isActive.and.returnValue(true);

        // Setup a response for getRouterConfigMetadata
        const routerConfig = [];
        mockRouterService.getRouterConfigMetadata.and.returnValue(routerConfig);

        // Call the method under test
        componentFixture.detectChanges();

        expect(JSON.stringify(mapComponent.routerConfig)).toBe(JSON.stringify(routerConfig));
    });

    it('ngOnInit_shouldSidenavOpened', () => {

        mockStore.setState(
            { 
                mapState: { 
                    sidenav: {
                        opened: true, 
                        path: '/map/search'
                    }
                }, 
                router: { 
                    state: { 
                        ulr: '/map/search'
                    }
                }
            });

        // Setup a response for asObservable and isActive on mockMediaObserver
        mockMediaObserver.asObservable.and.returnValue(of({}));
        mockMediaObserver.isActive.and.returnValue(true);

        // Setup a response for getRouterConfigMetadata
        const routerConfig = [];
        mockRouterService.getRouterConfigMetadata.and.returnValue(routerConfig);

        // Call the method under test
        componentFixture.detectChanges();

        const expected = cold('(a)', { a: true });
        expect(mapComponent.sidenavOpened$).toBeObservable(expected);
    });

    it('ngOnInit_shouldSetModeOver_andDispatchSidenavClose_givenMediaObserverIsActiveTrue', () => {

        spyOn(mockStore, 'dispatch').and.callThrough();

        // Define the app state in the store
        mockStore.setState({ router: { state: { url: '/map/search'}}});

        // Setup a response for asObservable and isActive on mockMediaObserver
        mockMediaObserver.asObservable.and.returnValue(of({}));
        mockMediaObserver.isActive.and.returnValue(true);

        // Setup a response for getRouterConfigMetadata
        const routerConfig = [];
        mockRouterService.getRouterConfigMetadata.and.returnValue(routerConfig);

        // Call the method under test
        componentFixture.detectChanges();

        expect(mapComponent.isXs).toBe(true);
        expect(mapComponent.isSm).toBe(true);
        expect(mapComponent.mode).toBe('over');
        expect(mockStore.dispatch).toHaveBeenCalledOnceWith({ type: MapActionTypes.SidenavClose, path: '/map/search' });
    });
    
    it('ngOnInit_shouldSetModeSide_andDispatchSidenavOpen_givenMediaObserverIsActiveFalse', () => {

        spyOn(mockStore, 'dispatch').and.callThrough();

        // Define the app state in the store
        mockStore.setState({ router: { state: { url: '/map/search'}}});

        // Setup a response for asObservable and isActive on mockMediaObserver
        mockMediaObserver.asObservable.and.returnValue(of({}));
        mockMediaObserver.isActive.and.returnValue(false);

        // Setup a response for getRouterConfigMetadata
        const routerConfig = [];
        mockRouterService.getRouterConfigMetadata.and.returnValue(routerConfig);

        // Call the method under test
        componentFixture.detectChanges();

        expect(mapComponent.isXs).toBe(false);
        expect(mapComponent.isSm).toBe(false);
        expect(mapComponent.mode).toBe('side');
        expect(mockStore.dispatch).toHaveBeenCalledOnceWith({ type: MapActionTypes.SidenavOpen, path: '/map/search' });
    });

    it('ngOnDestroy_shouldUnsubscribe', () => {

        // Define the app state in the store
        mockStore.setState({ router: { state: { ulr: '/map/search'}}});

        // Setup a response for asObservable and isActive on mockMediaObserver
        mockMediaObserver.asObservable.and.returnValue(of({}));
        mockMediaObserver.isActive.and.returnValue(true);

        // Setup a response for getRouterConfigMetadata
        const routerConfig = [];
        mockRouterService.getRouterConfigMetadata.and.returnValue(routerConfig);

        spyOn(mapComponent['ngUnsubscribe'], 'next').and.callThrough();
        spyOn(mapComponent['ngUnsubscribe'], 'complete').and.callThrough();

        // Initialize the component
        componentFixture.detectChanges();

        // Call the method under test
        componentFixture.destroy();

        expect(mapComponent['ngUnsubscribe'].next).toHaveBeenCalledTimes(1);
        expect(mapComponent['ngUnsubscribe'].complete).toHaveBeenCalledTimes(1);
    });

    it('sidenavToggle_shouldDispatchSidenavToggle', () => {

        spyOn(mockStore, 'dispatch').and.callThrough();

        const path = '/map/search';

        // Call the method under test
        mapComponent.sidenavToggle(path);

        expect(mockStore.dispatch).toHaveBeenCalledOnceWith({ type: MapActionTypes.SidenavToggle, path: '/map/search'})
    });

    it('sidenavClose_shouldDispatchSidenavClose', () => {

        // Define the app state in the store
        mockStore.setState({ router: { state: { url: '/map/search'}}});

        // Setup a response for asObservable and isActive on mockMediaObserver
        mockMediaObserver.asObservable.and.returnValue(of({}));
        mockMediaObserver.isActive.and.returnValue(false);

        // Setup a response for getRouterConfigMetadata
        const routerConfig = [];
        mockRouterService.getRouterConfigMetadata.and.returnValue(routerConfig);

        // Initlize the component
        componentFixture.detectChanges();

        // SpyOn dispatch after detectChanges (i.e. ngOnInit())
        spyOn(mockStore, 'dispatch').and.callThrough();

        // Call the method under test
        mapComponent.sidenavClose();

        expect(mockStore.dispatch).toHaveBeenCalledOnceWith({ type: MapActionTypes.SidenavClose, path: '/map/search'})
    });
});
