import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { AppState } from 'src/app/app.state';
import { Bookmark } from './bookmark';
import { BookmarksActionTypes } from './bookmarks-actions-types';
import { BookmarksService } from './bookmarks.service';
import * as BookmarksActions from './bookmarks-actions'

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
            mergeMap(() => {
                return this.bookmarksService.getBookmarks()
                    .pipe(
                        map((bookmarks: Bookmark[]) => {
                            return BookmarksActions.GetBookmarksCompleted({bookmarks: bookmarks});
                        })
                    )
            })
        );
    });
}