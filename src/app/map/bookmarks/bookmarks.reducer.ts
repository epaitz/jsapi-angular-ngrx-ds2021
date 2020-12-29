import { Action, createReducer, on } from '@ngrx/store';
import { ServiceStatus } from 'src/app/shared/models/service-status';
import { ServiceStatusTypes } from 'src/app/shared/models/service-status.types';
import { BookmarksState } from './bookmarks-state';
import * as BookmarksActions from './bookmarks-actions';
import { Bookmark } from './bookmark';

const initialState: BookmarksState = {
    status: new ServiceStatus(ServiceStatusTypes.content),
    bookmarks: null
}

export function bookmarksReducer(state: BookmarksState = initialState, action: Action) {
    return bookmarksReducerFn(state, action);
}

const bookmarksReducerFn = createReducer(
    initialState,
    on(BookmarksActions.GetBookmarks, (state, action) => {
        return updateServiceStatus(state, ServiceStatusTypes.loading);
    }),
    on(BookmarksActions.GetBookmarksCompleted, (state, action) => {
        return addBookmarksToState(state, action.bookmarks);
    })
)

function updateServiceStatus(state: BookmarksState, type: ServiceStatusTypes, error?: any): BookmarksState {
    return { ...state, status: new ServiceStatus(type, error)}
}

function addBookmarksToState(state: BookmarksState, bookmarks: Bookmark[]): BookmarksState {
    return {
        ...state, 
        status: new ServiceStatus(ServiceStatusTypes.content), 
        bookmarks: bookmarks.slice().sort(compareBookmarksFn)
    }
}

function compareBookmarksFn (bookmark1: Bookmark, bookmark2: Bookmark) {
    if (bookmark1.name < bookmark2.name) { return -1; }
    if (bookmark1.name > bookmark2.name) { return 1; }
    return 0;
}