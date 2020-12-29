## Bookmarks Component

The BookmarksComponent is tied to the /bookmarks route and is used to demonstrate how you can use an NgRx action to navigate the map. 

## Map Contents

The MapContentsComponetn is tied to the /contents route and is currently empty but can be used to display the layers currently on the map.

## Map View Component

The MapViewComponent, is a sub-component to the MapComponent, and is where the ESRI MapView is added to the DOM. It uses the MapFactory and the MapService to get the WebMap JSON and initialize the Map and MapView objects. 

## Notifications Component

The NotificationsComponent is tied to the /notifications route and is currently empty. 

## Search Component

The SearchComponent is tied to the /search route and is currently empty.

## Settings Component

The SettingsComponent is tied to the /settings route and is currently empty.

## Map Component

The MapComponent is the component tied to the /map route and contains the Toolbar, Sidenav, and MapView components. 

## Map Factory

The MapFactory is a service that will initialize the WebMap and MapView and store a reference to the DOM used to create the MapView so that is can be added and removed from the DOM so that the parent component (MapViewComponent) can be destroyed and recreated as the route is navigated. 

## Map Service

The MapService is an Angular Service used to talk to a REST API (or Portal) to fetch the WebMap JSON.
