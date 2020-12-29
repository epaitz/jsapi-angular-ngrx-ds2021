import { RouterReducerState } from '@ngrx/router-store';
import { BookmarksState } from './map/bookmarks/bookmarks-state';
import { MapState } from './map/map.state';

export interface AppState {
    readonly mapState: MapState;
    readonly bookmarksState: BookmarksState;
    readonly router: RouterReducerState;
}
