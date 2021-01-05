import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { AppState } from 'src/app/app.state';
import { Bookmark } from './bookmark';
import { BookmarksActionTypes } from './bookmarks-actions-types';
import { BookmarksService } from './bookmarks.service';
import * as BookmarksActions from './bookmarks-actions';
import { selectBookmarks, selectBookmarksState } from './bookmarks.selectors';
import { of } from 'rxjs';
import { BookmarksState } from './bookmarks-state';

@Injectable()
export class BookmarksEffects {

    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private bookmarksService: BookmarksService) {
    }

    getBookmarks$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(BookmarksActionTypes.GetBookmarks),
            withLatestFrom(this.store.select(selectBookmarksState),
                (action: Action, bookmarksState: BookmarksState) => {
                    return bookmarksState;
                }
            ),
            mergeMap((bookmarksState: BookmarksState) => {

                if (bookmarksState.bookmarkCalls > 1) {
                    return [BookmarksActions.GetBookmarksNoOp()];
                }

                if (bookmarksState.bookmarks != null) {
                    return [BookmarksActions.GetBookmarksCompleted({bookmarks: bookmarksState.bookmarks})];
                }

                return this.bookmarksService.getBookmarks()
                    .pipe(
                        map((bookmarks: Bookmark[]) => {
                            return BookmarksActions.GetBookmarksCompleted({bookmarks: bookmarks});
                        }),
                        catchError((error) => {
                            return of(BookmarksActions.GetBookmarksError({error: error}));
                        })
                    );

            })
        );
    });

    // getBookmarks$ = createEffect(() => {
    //     return this.actions$.pipe(
    //         ofType(BookmarksActionTypes.GetBookmarks),
    //         withLatestFrom(this.store.select(selectBookmarks),
    //             (action: Action, bookmarks: Bookmark[]) => {
    //                 return bookmarks;
    //             }
    //         ),
    //         mergeMap((bookmarks: Bookmark[]) => {
    //             if (bookmarks != null) { return [BookmarksActions.GetBookmarksCompleted({bookmarks: bookmarks})]; }
    //             return this.bookmarksService.getBookmarks()
    //                 .pipe(
    //                     map((x: Bookmark[]) => {
    //                         return BookmarksActions.GetBookmarksCompleted({bookmarks: x});
    //                     }),
    //                     catchError((error) => {
    //                         return of(BookmarksActions.GetBookmarksError({error: error}));
    //                     })
    //                 );
    //         })
    //     );
    // });

    reloadBookmarks$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(BookmarksActionTypes.ReloadBookmarks),
            mergeMap(() => {
                return this.bookmarksService.getBookmarks()
                    .pipe(
                        map((bookmarks: Bookmark[]) => {
                            return BookmarksActions.GetBookmarksCompleted({bookmarks: bookmarks});
                        })
                    );
            })
        );
    });

}
