import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
    providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

    constructor() { }

    createDb(): any {
        const webmap = {
            operationalLayers: [
                {
                    id: '1234567890',
                    layerType: 'ArcGISMapServiceLayer',
                    url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/PoolPermits/MapServer',
                    visibility: true,
                    opacity: 1,
                    title: 'Pool Permits'
                }
            ],
            baseMap: {
                baseMapLayers: [
                {
                    id: 'defaultBasemap',
                    layerType: 'ArcGISTiledMapServiceLayer',
                    url: 'http://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer',
                    visibility: true,
                    opacity: 1,
                    title: 'World Imagery'
                }
                ],
                title: 'World Imagery'
            },
            spatialReference: {
                wkid: 102100,
                latestWkid: 3857
            },
            initialState: {
                viewpoint: {
                    targetGeometry: {
                        xmin: -13075816.404716644,
                        ymin: 4014771.4695451558,
                        xmax: -13073005.679717692,
                        ymax: 4016869.786173813,
                        spatialReference: {
                            wkid: 102100,
                            latestWkid: 3857
                        }
                    }
                },
            },
            authoringApp: 'WebMapViewer',
            authoringAppVersion: '4.1',
            version: '2.4'
        };
        const bookmarks = [
            {
                id: '1',
                name: 'Stonehenge',
                extent: {
                    spatialReference: {
                        latestWkid: 3857,
                        wkid: 102100
                    },
                    xmin: -204464.48473945778,
                    ymin: 6652004.209942442,
                    xmax: -202118.82343389466,
                    ymax: 6653996.349992177
                }
            },
            {
                id: '2',
                name: 'Colosseum',
                extent: {
                    spatialReference: {
                        latestWkid: 3857,
                        wkid: 102100
                    },
                    xmin: 1389452.5122349507,
                    ymin: 5143550.030337398,
                    xmax: 1391798.1735405137,
                    ymax: 5145542.170387133
                }
            },
            {
                id: '3',
                name: 'Eiffel Tower',
                extent: {
                    spatialReference: {
                        latestWkid: 3857,
                        wkid: 102100
                    },
                    xmin: 254836.15629884042,
                    ymin: 6250370.866467227,
                    xmax: 256008.9869514921,
                    ymax: 6251366.936491984
                  }
            },
            {
                id: '4',
                name: 'Statue of Liberty',
                extent: {
                    spatialReference: {
                        latestWkid: 3857,
                        wkid: 102100
                    },
                    xmin: -8243167.852529133,
                    ymin: 4966081.014563843,
                    xmax: -8241995.02187648,
                    ymax: 4967077.084588599
                }
            }
        ];
        return {
            webmap,
            bookmarks
        };
    }
}

// 40.6892° N, 74.0445° W