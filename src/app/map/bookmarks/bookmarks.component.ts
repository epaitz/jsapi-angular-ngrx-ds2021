import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { ServiceStatus } from 'src/app/shared/models/service-status';
import { Bookmark } from './bookmark';
import * as BookmarksActions from './bookmarks-actions';
import * as MapActions from '../map.actions';
import { bookmarksSelector, bookmarksStatusSelector } from './bookmarks.selectors';

@Component({
    selector: 'app-bookmarks',
    templateUrl: './bookmarks.component.html',
    styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {

    public name: string;
    public status$: Observable<ServiceStatus>;
    public bookmarks$: Observable<Bookmark[]>;
    
    constructor(private store: Store<AppState>) { }

    ngOnInit(): void {
        this.status$ = this.store.select(bookmarksStatusSelector);
        this.bookmarks$ = this.store.select(bookmarksSelector);
        this.store.dispatch(BookmarksActions.GetBookmarks());
    }

    refresh() {

    }

    addBookmark() {
        
    }

    zoomTo(extent: any) {
        this.store.dispatch(MapActions.NavigationRequest({target: extent}))
      }

    deleteBookmark() {

    }
}
