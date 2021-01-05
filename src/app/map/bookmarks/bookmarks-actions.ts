import { createAction, props } from '@ngrx/store';
import { Bookmark } from './bookmark';
import { BookmarksActionTypes } from './bookmarks-actions-types';

export const GetBookmarks = createAction(BookmarksActionTypes.GetBookmarks);
export const GetBookmarksCompleted = createAction(BookmarksActionTypes.GetBookmarksCompleted, props<{bookmarks: Bookmark[]}>());
export const GetBookmarksError = createAction(BookmarksActionTypes.GetBookmarksError, props<{error: any}>());
export const GetBookmarksNoOp = createAction(BookmarksActionTypes.GetBookmarksNoOp);
export const ReloadBookmarks = createAction(BookmarksActionTypes.ReloadBookmarks);
