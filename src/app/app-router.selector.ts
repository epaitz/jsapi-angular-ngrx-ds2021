import { RouterReducerState } from "@ngrx/router-store"
import { createSelector } from "@ngrx/store"
import { AppState } from "./app.state"

export const selectRouterState = (state: AppState) => state.router

export const selectRouteUrl = createSelector(
    selectRouterState,
    (state: RouterReducerState) => {
        return state?.state?.url
    }
);

export const selectRouteData = createSelector(
    selectRouterState,
    (state: RouterReducerState) => {
        return state?.state?.["data"]
    }
);

export const selectRouteDataLabel = createSelector(
    selectRouterState,
    (state: RouterReducerState) => {
        return state?.state?.["data"].label
    }
);
