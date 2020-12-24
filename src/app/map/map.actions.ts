import { createAction, props } from '@ngrx/store';
import { MapActionTypes } from './map.action.types';
import { MapViewProperties } from '../shared/models/map-view-properties';
import { WebMapDocument } from '../shared/models/webmap-document';

export const GetWebMap = createAction(MapActionTypes.GetWebMap);
export const GetWebMapCompleted = createAction(MapActionTypes.GetWebMapCompleted, props<{webMapDocument: WebMapDocument}>());
export const GetWebMapError = createAction(MapActionTypes.GetWebMapError, props<{error: any}>());

export const UpdateMapViewProperties = createAction(
    MapActionTypes.UpdateMapViewProperties,
    props<{mapViewProperties: MapViewProperties}>()
);

export const SidenavToggle = createAction(MapActionTypes.SidenavToggle, props<{path: string}>());
export const SidenavOpen = createAction(MapActionTypes.SidenavOpen, props<{path: string}>());
export const SidenavClose = createAction(MapActionTypes.SidenavClose, props<{path: string}>());


// Add bookmarksactions.ts
// Add GetBookmarks, GetBookmarksCompleted, RefreshBookmarks (or ReloadBookmarks)