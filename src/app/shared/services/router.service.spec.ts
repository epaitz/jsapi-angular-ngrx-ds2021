import { RouterService } from './router.service';
import { cold, hot } from 'jasmine-marbles';

describe('RouterService', () => {
    let routerService: RouterService;
    let mockRouter: any;
    let mockAuthGuardService: any;

    beforeEach(() => {
        mockRouter = jasmine.createSpyObj('mockRouter', [''], { config: [] });
        mockAuthGuardService = jasmine.createSpyObj('mockAuthGuardService', ['hasAccess']);
        routerService = new RouterService(mockRouter, mockAuthGuardService);
    });

    it('getRouterConfigMetadata_shouldInitializeRouterConfigMetadata', () => {

        mockAuthGuardService.hasAccess.and.returnValue(true);

        // Setup a response for the config property on mockRouter
        const config = [
            { path: 'home', data: { label: 'Home' }},
            { path: 'map', data: { label: 'Map', }, children: [
                    { path: 'search', data: { label: 'Search', icon: 'search' }}
                ]
            }
        ];
        (Object.getOwnPropertyDescriptor(mockRouter, 'config').get as any)
            .and.returnValue(config);

        // Call the method under test
        const routerConfigMetadata = routerService.getRouterConfigMetadata();

        const expectedRouteMetaData = [
            {label: 'Home', path: 'home', fullPath: 'home', children: null},
            {label: 'Map', path: 'map', fullPath: 'map', children: [
                    {label: 'Search', path: 'search', fullPath: '/map/search', icon: 'search', children: null}
                ]
            }
        ];

        expect(JSON.stringify(routerConfigMetadata)).toBe(JSON.stringify(expectedRouteMetaData));
    });
});
