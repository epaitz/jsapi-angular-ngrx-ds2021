import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaObserver } from '@angular/flex-layout';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { of, ReplaySubject } from 'rxjs';
import { SidenavService } from '../shared/services/sidenav.service';
import { MapComponent } from './map.component';
import { cold, hot } from 'jasmine-marbles';

describe('MapComponent', () => {
    let mapComponent: MapComponent;
    let componentFixture: ComponentFixture<MapComponent>;
    let mockSidenavService: any;
    let mockMediaObserver: any;
    let mockActivatedRoute: any;
    let mockRouter: any;

    const eventsSubject = new ReplaySubject<any>(1);
    mockRouter = {...mockRouter, events: eventsSubject.asObservable() };

    beforeEach(() => {

        mockSidenavService = jasmine.createSpyObj('mockSidenavService', ['getSidenavOpened', 'close', 'open']);
        mockMediaObserver = jasmine.createSpyObj('mockMediaObserver', ['asObservable', 'isActive']);
        mockActivatedRoute = jasmine.createSpyObj('mockActivatedRoute', [''], { snapshot: null });
        mockRouter = jasmine.createSpyObj('mockRouter', [''], { events: of({}) });

        TestBed.configureTestingModule({
            declarations: [
                MapComponent
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ],
            providers: [
                { provide: SidenavService, useValue: mockSidenavService },
                { provide: MediaObserver, useValue: mockMediaObserver },
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
                { provide: Router, useValue: mockRouter }
            ]
        })
        .compileComponents();

        componentFixture = TestBed.createComponent(MapComponent);
        mapComponent = componentFixture.componentInstance;
    });

    it('ngOnInit_shouldSetRouteDataLabel_givenActivatedRoute', () => {

        // Setup a response for the events property on mockRouter
        const event = new NavigationEnd(0, '', '');
        (Object.getOwnPropertyDescriptor(mockRouter, 'events').get as any)
            .and.returnValue(of(event));

        // Setup a response for the snapshot property on mockActivatedRoute
        const snapshot = {routeConfig: {path: 'map'}, firstChild: {routeConfig: {path: 'search'}, data: {label: 'Search'}}};
        (Object.getOwnPropertyDescriptor(mockActivatedRoute, 'snapshot').get as any)
            .and.returnValue(snapshot);

        // Setup a response for asObservable and isActive on mockMediaObserver
        mockMediaObserver.asObservable.and.returnValue(of({}));
        mockMediaObserver.isActive.and.returnValue(true);

        // Call the method under test
        componentFixture.detectChanges();

        expect(mapComponent.routeDataLabel).toBe('Search');
        /* tslint:disable:no-string-literal */
        expect(mapComponent['routeChildPath']).toBe('/map/search');
        /* tslint:enable:no-string-literal */
    });

    it('ngOnInit_shouldSetModeOver_givenMediaObserverIsActiveTrue', () => {

        // Setup a response for the events property on mockRouter
        const event = new NavigationEnd(0, '', '');
        (Object.getOwnPropertyDescriptor(mockRouter, 'events').get as any)
            .and.returnValue(of(event));

        // Setup a response for the snapshot property on mockActivatedRoute
        const snapshot = {routeConfig: {path: 'map'}, firstChild: {routeConfig: {path: 'search'}, data: {label: 'Search'}}};
        (Object.getOwnPropertyDescriptor(mockActivatedRoute, 'snapshot').get as any)
            .and.returnValue(snapshot);

        // Setup a response for asObservable and isActive on mockMediaObserver
        mockMediaObserver.asObservable.and.returnValue(of({}));
        mockMediaObserver.isActive.and.returnValue(true);

        // mockMediaObserver.asObservable.and.returnValue(of({}));
        // mockMediaObserver.isActive.and.callFake((value) => {
        //     return value === 'xs' || value === 'sm';
        // });

        // Call the method under test
        componentFixture.detectChanges();

        expect(mapComponent.mode).toBe('over');
        expect(mockSidenavService.close).toHaveBeenCalledTimes(1);
        expect(mockSidenavService.open).toHaveBeenCalledTimes(0);
    });

    it('ngOnInit_shouldSetModeSide_givenMediaObserverIsActiveFalse', () => {

        // Setup a response for the events property on mockRouter
        const event = new NavigationEnd(0, '', '');
        (Object.getOwnPropertyDescriptor(mockRouter, 'events').get as any)
            .and.returnValue(of(event));

        // Setup a response for the snapshot property on mockActivatedRoute
        const snapshot = {routeConfig: {path: 'map'}, firstChild: {routeConfig: {path: 'search'}, data: {label: 'Search'}}};
        (Object.getOwnPropertyDescriptor(mockActivatedRoute, 'snapshot').get as any)
            .and.returnValue(snapshot);

        // Setup a response for asObservable and isActive on mockMediaObserver
        mockMediaObserver.asObservable.and.returnValue(of({}));
        mockMediaObserver.isActive.and.returnValue(false);

        // mockMediaObserver.asObservable.and.returnValue(of({}));
        // mockMediaObserver.isActive.and.callFake((value) => {
        //     return value === 'xs' || value === 'sm';
        // });

        // Call the method under test
        componentFixture.detectChanges();

        expect(mapComponent.mode).toBe('side');
        expect(mockSidenavService.close).toHaveBeenCalledTimes(0);
        expect(mockSidenavService.open).toHaveBeenCalledTimes(1);
    });

    it('ngOnInit_shouldGetSidenaveOpened()', () => {

        // Setup a response for the events property on mockRouter
        const event = new NavigationEnd(0, '', '');
        (Object.getOwnPropertyDescriptor(mockRouter, 'events').get as any)
            .and.returnValue(of(event));

        // Setup a response for the snapshot property on mockActivatedRoute
        const snapshot = {routeConfig: {path: 'map'}, firstChild: {routeConfig: {path: 'search'}, data: {label: 'Search'}}};
        (Object.getOwnPropertyDescriptor(mockActivatedRoute, 'snapshot').get as any)
            .and.returnValue(snapshot);

        // Setup a response for asObservable and isActive on mockMediaObserver
        mockMediaObserver.asObservable.and.returnValue(of({}));
        mockMediaObserver.isActive.and.returnValue(false);

        const sidenavOpened = true;
        mockSidenavService.getSidenavOpened.and.returnValue(of(sidenavOpened));

        // Call the method under test
        componentFixture.detectChanges();

        // Expect the sidenavOpened$ be an Observable of true (hot and cold both work)
        expect(mapComponent.sidenavOpened$).toBeObservable(cold('(a|)', {a: true}));
        expect(mapComponent.sidenavOpened$).toBeObservable(hot('(a|)', {a: true}));
    });

    it('sidenavClose_shouldSidenaveServiceClose', () => {

        // Setup a response for the events property on mockRouter
        const event = new NavigationEnd(0, '', '');
        (Object.getOwnPropertyDescriptor(mockRouter, 'events').get as any)
            .and.returnValue(of(event));

        // Setup a response for the snapshot property on mockActivatedRoute
        const snapshot = {routeConfig: {path: 'map'}, firstChild: {routeConfig: {path: 'search'}, data: {label: 'Search'}}};
        (Object.getOwnPropertyDescriptor(mockActivatedRoute, 'snapshot').get as any)
            .and.returnValue(snapshot);

        // Setup a response for asObservable and isActive on mockMediaObserver
        mockMediaObserver.asObservable.and.returnValue(of({}));
        mockMediaObserver.isActive.and.returnValue(false);

        const sidenavOpened = true;
        mockSidenavService.getSidenavOpened.and.returnValue(of(sidenavOpened));

        // Start component life-cycle
        componentFixture.detectChanges();

        // Call the method under test
        mapComponent.sidenavClose();

        expect(mockSidenavService.close).toHaveBeenCalledTimes(1);
        expect(mockSidenavService.close).toHaveBeenCalledWith('/map/search');
    });
});
