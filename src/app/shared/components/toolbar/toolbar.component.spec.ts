import { CUSTOM_ELEMENTS_SCHEMA, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { of } from 'rxjs';
import { RouterService } from '../../services/router.service';
import { SidenavService } from '../../services/sidenav.service';
import { ToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
    let toolbarComponent: ToolbarComponent;
    let componentFixture: ComponentFixture<ToolbarComponent>;
    let mockElementRef: any;
    let mockRouterService: any;
    let mockSidenavService: any;

    beforeEach(async () => {

        mockElementRef = jasmine.createSpyObj('mockElementRef', ['']);
        mockRouterService = jasmine.createSpyObj('mockRouterService', ['getRouterConfigMetadata']);
        mockSidenavService = jasmine.createSpyObj('mockSidenavService', ['']);

        await TestBed.configureTestingModule({
            declarations: [
                ToolbarComponent
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ],
            providers: [
                { provide: ElementRef, useValue: mockElementRef },
                { provide: RouterService, useValue: mockRouterService },
                { provide: SidenavService, useValue: mockSidenavService }
            ],
            imports: [
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
            { path: 'home' },
            {
                path: 'map',
                children: [
                    {path: 'search', label: 'Search', icon: 'search', fullPath: 'map/search'},
                    {path: 'settings', label: 'Settings', icon: 'settings', fullPath: 'map/settings'},
                ]
            },
            { path: 'tools' }
        ];
        mockRouterService.getRouterConfigMetadata.and.returnValue(routerConfigMetadata);

        toolbarComponent.routePath = 'map';
        toolbarComponent.settingsPath = 'settings';

        // Call the method under test
        componentFixture.detectChanges();

        const expectedButtons = [{id: 0, path: 'map/search', icon: 'search', label: 'Search', bottom: 48, visible: false}];
        expect(JSON.stringify(toolbarComponent.buttons)).toBe(JSON.stringify(expectedButtons));

        const expectedSettingsButton = {path: 'settings', icon: 'settings', label: 'Settings'};
        expect(JSON.stringify(toolbarComponent.settingsButton)).toBe(JSON.stringify(expectedSettingsButton));
    });

    it('ngOnInit_shouldInitializeButtonsEmpty_givenRouterConfigWithNoChildren', () => {

        const routerConfigMetadata = [
            { path: 'home' },
            { path: 'map', },
            { path: 'tools' }
        ];
        mockRouterService.getRouterConfigMetadata.and.returnValue(routerConfigMetadata);

        toolbarComponent.routePath = 'map';
        toolbarComponent.settingsPath = 'settings';

        // Call the method under test
        componentFixture.detectChanges();

        const expectedButtons = [];
        expect(JSON.stringify(toolbarComponent.buttons)).toBe(JSON.stringify(expectedButtons));
    });
});
