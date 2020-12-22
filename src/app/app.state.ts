import { RouterReducerState } from "@ngrx/router-store";

export interface AppState {
    readonly router: RouterReducerState;
}
