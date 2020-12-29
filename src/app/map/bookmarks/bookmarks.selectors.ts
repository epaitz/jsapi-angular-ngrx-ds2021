import { createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';

export const bookmarksStateSelector = createSelector(
    (state: AppState) => { return state.bookmarksState; },
    (state) => { return state; }
)

export const bookmarksStatusSelector = createSelector(
    (state: AppState) => { return state.bookmarksState.status; },
    (status) => { return status; }
)

export const bookmarksSelector = createSelector(
    (state: AppState) => { return state.bookmarksState.bookmarks; },
    (bookmarks) => { return bookmarks; }
)