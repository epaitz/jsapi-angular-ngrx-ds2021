import WebMap from '@arcgis/core/WebMap';
import { MapViewProperties } from '../shared/models/map-view-properties';
import { ServiceStatus } from '../shared/models/service-status';

export interface MapState {
    status: ServiceStatus;
    webMap?: WebMap;
    mapViewProperties?: MapViewProperties;
    sidenav?: {
        opened: boolean,
        path: string
    };
}
