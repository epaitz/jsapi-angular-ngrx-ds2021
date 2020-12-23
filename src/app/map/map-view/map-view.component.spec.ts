import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MapFactory } from '../map.factory';
import { MapService } from '../map.service';
import { MapViewComponent } from './map-view.component';

describe('MapViewComponent', () => {
    let mapViewComponent: MapViewComponent;
    let componentFixture: ComponentFixture<MapViewComponent>;
    let mockMapService: any;
    let mockMapFactory: any;

    beforeEach(async () => {
        mockMapService = jasmine.createSpyObj('mockMapService', ['getWebMapStatus', 'getWebMap', 'initializeWebMap']);
        mockMapFactory = jasmine.createSpyObj('mockMapFactory', ['initializeMapView', 'removeMapViewContainer']);

        await TestBed.configureTestingModule({
            declarations: [
                MapViewComponent
            ],
                schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ],
            providers: [
                { provide: MapService, useValue: mockMapService },
                { provide: MapFactory, useValue: mockMapFactory }
            ]
        })
        .compileComponents();
    });

    beforeEach(() => {
        componentFixture = TestBed.createComponent(MapViewComponent);
        mapViewComponent = componentFixture.componentInstance;
    });

    it('ngOnInit_shouldInitializeWebMap', () => {

        const serviceStatus = {};
        mockMapService.getWebMapStatus.and.returnValue(of(serviceStatus));

        const webMap = {};
        mockMapService.getWebMap.and.returnValue(of(webMap));

        componentFixture.detectChanges();

        expect(mockMapFactory.initializeMapView).toHaveBeenCalledTimes(1);
        expect(mockMapService.initializeWebMap).toHaveBeenCalledTimes(1);
    });
});
