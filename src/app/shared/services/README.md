# Shared Services

## AuthGuardService

The AuthGuardService is just an example of how to guard a route. The service is currently hard-coded to hide the admin route but can be expanded to compare data from a user object to data in the route data property. The hasAccess() method is exposed as public because it is leveraged by the RouterService which it uses to filter out routes the current user does not have access to. If the logic to guard a route is in the hadAccess() method then it can be used by the AuthGuardService and leveraged by the RouterService to hide navigation elements the current user does not have access to.

## BaseService

The BaseService class currently only contains an updateStatus() method used to update a Subject of type ServiceStatus. This was done so the method did not have to be reapeated in any service that had a ServiceStatus.

## HttpClientService

The HttpClientService is used to centralize methods for all of the HTTP verbs (i.e. GET, POST, PUT, and DELETE). Currenlty only the GET verb has been added to this service. This service also supports the RestResponse model. The naming convention is getIt(), postIt(), putIt(), and deleteIt() are for HTTP calls with a REST API that supports the RestResponse style. The get(), post(), put(), and delete() are for HTTP calls with a REST API that does not support the RestRespons style. 

## NavigationService

The NavigationService is primarily used to keep the Map and MapView in sync with the NgRx State. This is similar to how the RouterStore works for NgRx. The RouterStore is used to keep the Angular Router configuration in sync with the NgRx State. The difference is that NgRx recommends using the Angular Router to navigate by calling navigateByUrl() but to navigate the Map and MapView you dispatch the NavigationRequest action. 

Another approach that would be similar to how the NgRx RouterStore works would be to get a reference to the MapView by using MapFactor.getWebMap() and then call webMap.goTo() for navigation. Then we can remove the NavigtionRequest action. I am not sure I like this approach because there will be other map requirements like drawing for example which could also follow the action approach by creating a DrawRequest action. These actions would not need to be written to the state but just intercepted by the Effect.

## RouterService

The RouterService provides two public methods called getRouterConfigMetadata() and updateRedirectTo(). 

The updateRedirectTo() method will process the router.config into an array of RouteMetadata. If the project is reconfigured to use lazy loaded routes the processRoutes() method can be modified to parse the routes into an array of RouteMetadata so that any components using the RouterService do not have to change. 

The updateRedirectTo() method will subscribe to the Angular Router events and watch for when NavigationEnd is fired. It will check if the route has children by looking for the '/' character and then find the base route. For example, if the route last navigated was /map/bookmarks then it will get a reference to the Route object for /map and alter its default redirect child route to /map/bookmarks. This is done so that if the user navigates away from /map to /tools or /home and then navigates back to /map that it will automatically redirect to /map/bookmarks vs. whatever was the default redirect child of /map which is /map/search. This helps with the user experience of navigating to the route the user was at the last time they were navigated to the /map route. This logic would have to be reconfigured if there are more than one generation of child routes.
