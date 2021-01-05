import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { BookmarksActionTypes } from './bookmarks-actions-types';
import { BookmarksComponent } from './bookmarks.component';
import { cold, hot } from 'jasmine-marbles';
import { FormsModule } from '@angular/forms';
import { MapActionTypes } from '../map.action.types';

describe('BookmarksComponent', () => {
    let bookmarksComponent: BookmarksComponent;
    let componentFixture: ComponentFixture<BookmarksComponent>;
    let mockStore: any;

    const initialState = { };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                BookmarksComponent
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ],
            imports: [
                FormsModule
            ],
            providers: [
                provideMockStore({ initialState })
            ]
        })
        .compileComponents();

        mockStore = TestBed.inject(MockStore);
    });

    beforeEach(() => {
        componentFixture = TestBed.createComponent(BookmarksComponent);
        bookmarksComponent = componentFixture.componentInstance;

    });

    it('ngOnInit_shouldDispatchBookmarksActions.GetBookmarks', () => {

        spyOn(mockStore, 'dispatch').and.callThrough();

        // Call the method under test
        componentFixture.detectChanges();

        expect(mockStore.dispatch).toHaveBeenCalledOnceWith({ type: BookmarksActionTypes.GetBookmarks });
    });

    it('ngOnInit_shouldInitializeStatusObservable', () => {

        mockStore.setState({bookmarksState: { status: { type: 'loading'}}});

        // Call the method under test
        componentFixture.detectChanges();

        const expected = cold('(a)', { a: { type: 'loading' } });
        expect(bookmarksComponent.serviceStatus$).toBeObservable(expected);
    });

    it('ngOnInit_shouldInitializeBookmarksObservable', () => {

        mockStore.setState({bookmarksState: { bookmarks: []}});

        // Call the method under test
        componentFixture.detectChanges();

        const expected = cold('(a)', { a: [] });
        expect(bookmarksComponent.bookmarks$).toBeObservable(expected);
    });

    it('refresh_shouldDispatchBookmarksActions.ReloadBookmarks', () => {

        spyOn(mockStore, 'dispatch').and.callThrough();

        // Call the method under test
        bookmarksComponent.refresh();

        expect(mockStore.dispatch).toHaveBeenCalledOnceWith({ type: BookmarksActionTypes.ReloadBookmarks });
    });

    it('zoomTo_shouldDispatchMapActions.NavigationRequest', () => {

        spyOn(mockStore, 'dispatch').and.callThrough();

        const extent = {};

        // Call the method under test
        bookmarksComponent.zoomTo(extent);

        expect(mockStore.dispatch).toHaveBeenCalledOnceWith({ type: MapActionTypes.NavigationRequest, target: extent });
    });
});
