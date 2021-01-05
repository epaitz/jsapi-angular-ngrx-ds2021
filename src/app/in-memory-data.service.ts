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
            },
            {
                id: '5',
                name: 'Windsor Castle',
                extent: {
                    spatialReference: {
                        latestWkid: 3857,
                        wkid: 102100
                    },
                    xmin: -67610.72121511001,
                    ymin: 6706739.909635874,
                    xmax: -66701.83717573332,
                    ymax: 6707862.578488718
                  }
            },
            {
                id: '6',
                name: 'Taj Mahal',
                extent: {
                    spatialReference: {
                        latestWkid: 3857,
                        wkid: 102100
                    },
                    xmin: 8687093.89033436,
                    ymin: 3144335.978792,
                    xmax: 8688234.474115707,
                    ymax: 3145720.205600985
                  }
            },
            {
                id: '7',
                name: 'Buckingham Palace',
                extent: {
                    spatialReference: {
                        latestWkid: 3857,
                        wkid: 102100
                    },
                    xmin: -16277.84390548297,
                    ymin: 6709784.378336319,
                    xmax: -15137.260124136397,
                    ymax: 6711168.605145304
                  }
            },
            {
                id: '8',
                name: 'Hoover Dam',
                extent: {
                    spatialReference: {
                        latestWkid: 3857,
                        wkid: 102100
                    },
                    xmin: -12773689.858014941,
                    ymin: 4301219.77087626,
                    xmax: -12771408.690451995,
                    ymax: 4303988.224494536
                  }
            },
            {
                id: '9',
                name: 'Golden Gate Bridge',
                extent: {
                    spatialReference: {
                        latestWkid: 3857,
                        wkid: 102100
                    },
                    xmin: -13636267.594747687,
                    ymin: 4551143.453573501,
                    xmax: -13631705.259621793,
                    ymax: 4556680.3608100545
                  }
            },
            {
                id: '10',
                name: 'Burj Khalifa',
                extent: {
                    spatialReference: {
                        latestWkid: 3857,
                        wkid: 102100
                    },
                    xmin: 6151916.178940228,
                    ymin: 2898591.7962207696,
                    xmax: 6154197.346503175,
                    ymax: 2901360.2498390465
                  }
            },
            {
                id: '11',
                name: 'United States Capitol',
                extent: {
                    spatialReference: {
                        latestWkid: 3857,
                        wkid: 102100
                    },
                    xmin: -8573951.502900934,
                    ymin: 4704732.808105457,
                    xmax: -8571636.89413811,
                    ymax: 4707064.137468216
                  }
            },
            {
                id: '12',
                name: 'Mount Rushmore',
                extent: {
                    spatialReference: {
                        latestWkid: 3857,
                        wkid: 102100
                    },
                    xmin: -11517805.59671855,
                    ymin: 5445507.165204986,
                    xmax: -11515490.987955727,
                    ymax: 5447838.494567745
                  }
            },
            {
                id: '13',
                name: 'Louvre Museum',
                extent: {
                    spatialReference: {
                        latestWkid: 3857,
                        wkid: 102100
                    },
                    xmin: 258814.60783697452,
                    ymin: 6250035.458354502,
                    xmax: 261129.216599796,
                    ymax: 6252366.787717261
                  }
            },
            {
                id: '14',
                name: 'Notre-Dame Cathedrale',
                extent: {
                    spatialReference: {
                        latestWkid: 3857,
                        wkid: 102100
                    },
                    xmin: 261308.36588480198,
                    ymin: 6249616.846191733,
                    xmax: 261887.01807557142,
                    ymax: 6250199.678532488
                  }
            },
            {
                id: '15',
                name: 'Pantheon',
                extent: {
                    spatialReference: {
                        latestWkid: 3857,
                        wkid: 102100
                    },
                    xmin: 260908.26581485878,
                    ymin: 6248516.869581529,
                    xmax: 261486.91800562822,
                    ymax: 6249099.7019222835
                  }
            }
        ];
        return {
            webmap,
            bookmarks
        };
    }
}
