import { Action, createReducer, on } from '@ngrx/store';
import { ServiceStatus } from 'src/app/shared/models/service-status';
import { ServiceStatusTypes } from 'src/app/shared/models/service-status.types';
import { BookmarksState } from './bookmarks-state';
import * as BookmarksActions from './bookmarks-actions';
import { Bookmark } from './bookmark';

const initialState: BookmarksState = {
    status: new ServiceStatus(ServiceStatusTypes.content),
    bookmarks: null,
    bookmarkCalls: 0
};

export function bookmarksReducer(state: BookmarksState = initialState, action: Action): BookmarksState {
    return bookmarksReducerFn(state, action);
}

const bookmarksReducerFn = createReducer(
    initialState,
    on(BookmarksActions.GetBookmarks, (state, action) => {
        return updateGetBookmarks(state);
    }),
    on(BookmarksActions.ReloadBookmarks, (state, action) => {
        return updateReloadBookmarks(state);
    }),
    on(BookmarksActions.GetBookmarksCompleted, (state, action) => {
        return addBookmarksToState(state, action.bookmarks);
    }),
    on(BookmarksActions.GetBookmarksError, (state, action) => {
        return updateServiceStatus(state, ServiceStatusTypes.error, action.error);
    })
);

function updateGetBookmarks(state: BookmarksState): BookmarksState {
    return {
        ...state,
        bookmarkCalls: state.bookmarkCalls + 1,
        status: new ServiceStatus(ServiceStatusTypes.loading)
    };
}

function updateReloadBookmarks(state: BookmarksState): BookmarksState {
    return {
        ...state,
        bookmarkCalls: 0,
        status: new ServiceStatus(ServiceStatusTypes.loading)
    };
}

function updateServiceStatus(state: BookmarksState, type: ServiceStatusTypes, error?: any): BookmarksState {
    return { ...state, status: new ServiceStatus(type, error)};
}

function addBookmarksToState(state: BookmarksState, bookmarks: Bookmark[]): BookmarksState {
    return {
        status: new ServiceStatus(ServiceStatusTypes.content),
        bookmarks: bookmarks.slice().sort(compareBookmarksFn),
        bookmarkCalls: 0
    };
}

function compareBookmarksFn(bookmark1: Bookmark, bookmark2: Bookmark): number {
    if (bookmark1.name < bookmark2.name) { return -1; }
    if (bookmark1.name > bookmark2.name) { return 1; }
    return 0;
}
