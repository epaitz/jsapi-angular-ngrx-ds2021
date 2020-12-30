import { createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';
import { BookmarksState } from './bookmarks-state';

export const selectBookmarksState = (state: AppState) => state.bookmarksState;

export const selectBookmarksStatus = createSelector(
    selectBookmarksState,
    (state: BookmarksState) => {
        return state?.status;
    }
);

export const selectBookmarks = createSelector (
    selectBookmarksState,
    (state: BookmarksState) => {
        return state?.bookmarks;
    }
);
