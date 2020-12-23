import { RouterReducerState } from '@ngrx/router-store';
import { MapState } from './map/map.state';

export interface AppState {
    readonly mapState: MapState;
    readonly router: RouterReducerState;
}
