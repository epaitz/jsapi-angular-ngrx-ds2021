import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { MapActionTypes } from '../map/map.action.types';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
    let headerComponent: HeaderComponent;
    let componentFixture: ComponentFixture<HeaderComponent>;
    let mockStore: any;
    let mockRouterService: any;

    beforeEach(async () => {

        mockStore = jasmine.createSpyObj('mockStore', ['dispatch']);
        mockRouterService = jasmine.createSpyObj('mockRouterService', ['getRouterConfigMetadata']);

        await TestBed.configureTestingModule({
            declarations: [
                HeaderComponent
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ],
            imports: [
                RouterTestingModule,
                MatToolbarModule,
                MatIconModule,
                MatMenuModule
            ],
            providers: [
                { provide: Store, useValue: mockStore },
                { provide: Store, useValue: mockStore }
            ]
        })
        .compileComponents();
    });

    beforeEach(() => {
        componentFixture = TestBed.createComponent(HeaderComponent);
        headerComponent = componentFixture.componentInstance;
    });

    it('ngOnInit_shouldInitializeRoutes_givenRouterServiceGetRouterConfigMetadata', () => {

        const routerConfigMetadata = [{label: 'Home', path: 'home'}];
        mockRouterService.getRouterConfigMetadata.and.returnValue(routerConfigMetadata);

        // Call the method under test
        componentFixture.detectChanges();

        expect(JSON.stringify(headerComponent.routes)).toBeTruthy(JSON.stringify(routerConfigMetadata));
    });

    it('sidenavOpen_should_given', () => {

        // Call the method under test
        headerComponent.sidenavOpen('home');

        expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
        expect(mockStore.dispatch).toHaveBeenCalledWith({path: 'home', type: MapActionTypes.SidenavOpen});
    });
});
