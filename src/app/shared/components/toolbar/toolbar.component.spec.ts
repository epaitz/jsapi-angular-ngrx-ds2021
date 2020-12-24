import { CUSTOM_ELEMENTS_SCHEMA, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { RouterTestingModule } from '@angular/router/testing';
import { RouteMetadata } from '../../models/route-metadata';
import { ToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
    let toolbarComponent: ToolbarComponent;
    let componentFixture: ComponentFixture<ToolbarComponent>;
    let mockElementRef: any;

    beforeEach(async () => {

        mockElementRef = jasmine.createSpyObj('mockElementRef', ['']);

        await TestBed.configureTestingModule({
            declarations: [
                ToolbarComponent
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ],
            providers: [
                { provide: ElementRef, useValue: mockElementRef }
            ],
            imports: [
                RouterTestingModule,
                MatMenuModule
            ]
        })
        .compileComponents();
    });

    beforeEach(() => {
        componentFixture = TestBed.createComponent(ToolbarComponent);
        toolbarComponent = componentFixture.componentInstance;
    });

    it('ngOnInit_shouldNotInitializeButtons_givenNullOrUndefinedRoutePath', () => {

        // Call the method under test
        componentFixture.detectChanges();

        expect(toolbarComponent.buttons == null).toBe(true);
    });

    it('ngOnInit_shouldInitializeButtons_givenRouterConfigWithChildren', () => {

        const routerConfigMetadata = [
            new RouteMetadata('Home', 'home', 'home'),
            new RouteMetadata('Map', 'map', 'map', null, [
                new RouteMetadata('Search', 'search', 'map/search', 'search'),
                new RouteMetadata('Settings', 'settings', 'map/settings', 'settings')
            ]),
        ];

        toolbarComponent.routePath = 'map';
        toolbarComponent.settingsPath = 'settings';
        toolbarComponent.routerConfig = routerConfigMetadata;

        // Call the method under test
        componentFixture.detectChanges();

        const expectedButtons = [{id: 0, path: 'map/search', icon: 'search', label: 'Search', bottom: 48, visible: false}];
        expect(JSON.stringify(toolbarComponent.buttons)).toBe(JSON.stringify(expectedButtons));

        const expectedSettingsButton = {path: 'settings', icon: 'settings', label: 'Settings'};
        expect(JSON.stringify(toolbarComponent.settingsButton)).toBe(JSON.stringify(expectedSettingsButton));
    });

    it('ngOnInit_shouldInitializeButtonsEmpty_givenRouterConfigWithNoChildren', () => {

        const routerConfigMetadata = [
            new RouteMetadata('Home', 'home', 'home'),
            new RouteMetadata('Map', 'map', 'map'),
            new RouteMetadata('Tools', 'tools', 'tools')
        ];

        toolbarComponent.routePath = 'map';
        toolbarComponent.settingsPath = 'settings';
        toolbarComponent.routerConfig = routerConfigMetadata;

        // Call the method under test
        componentFixture.detectChanges();

        const expectedButtons = [];
        expect(JSON.stringify(toolbarComponent.buttons)).toBe(JSON.stringify(expectedButtons));
    });

    it('onSidenavToggle_should_given', () => {

        spyOn(toolbarComponent.sidenavToggle, 'emit').and.callThrough();

        const path = 'map';

        // Call the method under test
        toolbarComponent.onSidenavToggle(path);

        expect(toolbarComponent.sidenavToggle.emit).toHaveBeenCalledTimes(1);
        expect(toolbarComponent.sidenavToggle.emit).toHaveBeenCalledWith(path);
    });
});
