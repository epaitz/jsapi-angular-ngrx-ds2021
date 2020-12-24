import { ServiceStatus } from '../shared/models/service-status';
import { ServiceStatusTypes } from '../shared/models/service-status.types';
import { MapService } from './map.service';
import { of } from 'rxjs';

describe('MapService', () => {

    let mapService: MapService;
    let mockHttpService: any;

    beforeEach(() => {
        mockHttpService = jasmine.createSpyObj('mockHttpService', ['get']);
        mapService = new MapService(mockHttpService);
    });

    it('getWebMap_shouldReturnWebMap', (done) => {

        const webMap = {};
        mockHttpService.get.and.returnValue(of(webMap));

        mapService
            .getWebMap()
            .subscribe((x) => {
                expect(JSON.stringify(webMap)).toBe(JSON.stringify(x));
                done();
            });
    });
});
