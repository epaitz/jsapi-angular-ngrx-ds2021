import { Action, createReducer, on } from '@ngrx/store';
import { MapViewProperties } from '../shared/models/map-view-properties';
import { ServiceStatus } from '../shared/models/service-status';
import { ServiceStatusTypes } from '../shared/models/service-status.types';
import * as MapActions from './map.actions';
import { MapState } from './map.state';

const initialState: MapState = {
    status: new ServiceStatus(ServiceStatusTypes.content)
};

export function mapReducer(state = initialState, action: Action): MapState {
    return reducer(state, action);
}

const reducer = createReducer(
    initialState,
    on(MapActions.GetWebMap, (state, action) => {
        return updateServiceStatus(state, ServiceStatusTypes.loading);
    }),
    on(MapActions.GetWebMapCompleted, (state, action) => {
        return addWebMapToState(state, action.webMapDocument);
    }),
    on(MapActions.UpdateMapViewProperties, (state, action) => {
        return updateMapViewProperties(state, action.mapViewProperties);
    }),
    on(MapActions.SidenavToggle, (state, action) => {
        return sidenavUpdateOpened(state, action.path);
    }),
    on(MapActions.SidenavOpen, (state, action) => {
        return sidenavUpdateOpened(state, action.path, true);
    }),
    on(MapActions.SidenavClose, (state, action) => {
        return sidenavUpdateOpened(state, action.path, false);
    }),
);

function updateServiceStatus(state: MapState, type: ServiceStatusTypes, error?: any): MapState {
    return { ...state, status: new ServiceStatus(type, error) };
}

function addWebMapToState(state: MapState, webMap: any): MapState {
    return {
        ...state,
        status: new ServiceStatus(ServiceStatusTypes.content),
        webMap: webMap
    };
}

function updateMapViewProperties(state: MapState, mapViewProperties: MapViewProperties): MapState {
    return {
        ...state,
        mapViewProperties: {
            ...state.mapViewProperties,
            ...mapViewProperties
        }
    };
}

// function updateMapViewProperties(state: MapState, mapViewProperties: MapViewProperties): MapState {
//     const {drawRequest, navigationRequest, ...stateWithoutRequest} = {
//         ...state,
//         mapViewProperties: {
//             ...state.mapViewProperties,
//             ...mapViewProperties
//         }
//     };
//     return stateWithoutRequest;
// }

function sidenavUpdateOpened(state: MapState, path: string, opened?: boolean): MapState {
    return {
        ...state,
        sidenav: {
            opened: (opened == null ? !state.sidenav.opened : opened),
            path: path
        }
    };
}
