## Bookmarks

The BookmarksComponent is tied to the /bookmarks route and is used to demonstrate how you can use an NgRx action to navigate the map. 

## Map Contents

The MapContentsComponetn is tied to the /contents route and is currently empty but can be used to display the layers currently on the map.

## Map View

The MapViewComponent, is a sub-component to the MapComponent, and is where the ESRI MapView is added to the DOM. It uses the MapFactory and the MapService to get the WebMap JSON and initialize the Map and MapView objects. 

## Notifications

The NotificationsComponent is tied to the /notifications route and is currently empty. 

## Search

The SearchComponent is tied to the /search route and is currently empty.

## Settings

The SettingsComponent is tied to the /settings route and is currently empty.

## Map Component

The MapComponent is the component tied to the /map route and contains the Toolbar, Sidenav, and MapView components. 

## Map Factory

The MapFactory is a service that is responsible for managing the WebMap and the MapView. This service will accept a WebMap JSON object and a DIV element. When initialized a new DIV element will be created and appended to the input DIV element. The WebMap will use the internally created DIV element so that it can be removed from the DOM when the component is being destroyed. If the DIV used to create the MapView is removed from the DOM when the component is being destroyed the MapView will not be destroyed and its state will remain in memory. When the component is recreated the MapFactory will know not to generate a new DIV and MapView. It will append the previously created DIV (which is attached to the MapView) back to the DOM and the map will display in the state it was before the component was destroyed. I did consider merging the Map Factory into the Map Service but for now I wanted to keep the creation of the Map and Map View separate from other Map related code like fetching the WebMap JSON.

## Map Service

The MapService is an Angular Service used to talk to a REST API (or Portal) to fetch the WebMap JSON.
