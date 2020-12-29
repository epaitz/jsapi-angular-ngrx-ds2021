import { createAction, props } from "@ngrx/store";
import { Bookmark } from "./bookmark";
import { BookmarksActionTypes } from "./bookmarks-actions-types";

// export const GetBookmarks = createAction(BookmarksActionTypes.GetBookmarks);
export const GetBookmarks = createAction(BookmarksActionTypes.GetBookmarks, (reload: boolean = false) => ({reload: reload}));
export const GetBookmarksCompleted = createAction(BookmarksActionTypes.GetBookmarksCompleted, props<{bookmarks: Bookmark[]}>()); 
export const GetBookmarksError = createAction(BookmarksActionTypes.GetBookmarksError);


// export const login = createAction('[Logger] Info', (message: string = 'Dispatching an action') => ({ payload: { message }}));
