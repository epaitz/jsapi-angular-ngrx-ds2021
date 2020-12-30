import { RouterReducerState } from '@ngrx/router-store';
import { createSelector } from '@ngrx/store';
import { AppState } from './app.state';

export const selectRouterState = (state: AppState) => state.router;

export const selectRouteUrl = createSelector(
    selectRouterState,
    (state: RouterReducerState) => {
        return state?.state?.url;
    }
);

export const selectRouteData = createSelector(
    selectRouterState,
    (state: RouterReducerState) => {
        /* tslint:disable:no-string-literal */
        return state?.state?.['data'];
        /* tslint:enable:no-string-literal */
    }
);

export const selectRouteDataLabel = createSelector(
    selectRouterState,
    (state: RouterReducerState) => {
        /* tslint:disable:no-string-literal */
        return state?.state?.['data'].label;
        /* tslint:enable:no-string-literal */
    }
);
