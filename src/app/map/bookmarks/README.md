## Bookmarks

The Bookmark model class

## BookmarksActionTypes

An enumeration of bookmarks action types for NgRx

## Bookmarks Actions

A set of NgRx Actions created with the createAction helper method.

## Bookmarks State

The Bookmarks State model class

## Bookmarks Component 

The Angular Component associated with the /bookmarks route. This component will initialize a serviceStatus$ and bookmarks$ observable from the NgRx Store and dispatch the GetBookmarks action on ngOnInit(). This component will also dispatch ReloadBookmarks from the refresh() method and dispatch NavigationRequest from the zoomTo() method. 

## Bookmarks Effects

The NgRx Effects for anything related to bookmarks. The first effect will listen to the GetBookmarks action and use the BookmarksService to get the Bookmarks array from the server and finally dispatch the GetBookmarksCompleted action. 

This effect also uses withLatestFrom to check if the bookmarks are already in the state and uses that array instead of calling BookmarksService.getBookmarks() which would make an unnecessary call to the server. 

This effect will also not dispatch GetBookmarksCompleted if the MapService is still fetching bookmarks from the server. If the server is slow in returning the bookmarks array, or the network is slow, we do not want to make a second call to the server if the first call is not finished yet. The way I came up with to detect this was to track, in the Bookmarks State, how many times a call to getBookmarks() has been made. This integer is stored in the BookmarksState.bookmarkCalls property. If the bookmarkCalls integer is > 1 then we know that this is not the first call and will dispatch the "no operation" action called GetBookmarksNoOp. This Action is not part of the Bookmarks Reducer so the state is not altered if this action is dispatched. If the bookmarksState.bookmarks is not null or undefined then we dispatch GetBookmarksCompleted without needing to call the server. Finally if this is the first time the Effect is intercepting the GetBookmarks Action we need to call getBookmarks() on the BookmarksServer to get the bookmarks from the server and dispatch the GetBookmarksCompleted action. The Bookmarks Reducer will reset the bookmarkCalls integer back to 1 on success or error of GetBookmarksCompleted and on ReloadBookmarks. 

## Bookmarks Reducer

The NgRx Reducer for the BookmarksState.
