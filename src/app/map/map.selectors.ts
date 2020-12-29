import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { MapState } from './map.state';

export const selectMapState = (state: AppState) => state.mapState;

export const selectWebMapStatus = createSelector(
    selectMapState,
    (state: MapState) => {
        return state?.status;
    }
);

export const selectWebMap = createSelector(
    selectMapState,
    (state: MapState) => {
        return state?.webMap;
    }
);

export const selectMapViewPropertiesExtent = createSelector(
    selectMapState,
    (state: MapState) => {
        return state?.mapViewProperties?.extent;
    }
);

export const selectSidenavOpened = createSelector(
    selectMapState,
    (state: MapState) => {
        return state?.sidenav?.opened;
    }
);
