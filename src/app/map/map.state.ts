import { MapViewProperties } from '../shared/models/map-view-properties';
import { ServiceStatus } from '../shared/models/service-status';
import { WebMapDocument } from '../shared/models/webmap-document';

export interface MapState {
    status: ServiceStatus;
    webMap?: WebMapDocument;
    mapViewProperties?: MapViewProperties;
    sidenav?: {
        opened: boolean,
        path: string
    };
}
