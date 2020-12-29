## Shared Services

AuthGuardService

The AuthGuardService is just an example of how to guard a route. The service is currently hard-coded to hide the admin route but can be expanded to compare data from a user object to data in the route data property. The hasAccess() method is exposed as public because it is leveraged by the RouterService which it uses to filter out routes the current user does not have access to. If the logic to guard a route is in the hadAccess() method then it can be used by the AuthGuardService and leveraged by the RouterService to hide navigation elements the current user does not have access to.

BaseService

The BaseService class currently only contains an updateStatus() method used to update a Subject of type ServiceStatus. This was done so the method did not have to be reapeated in any service that had a ServiceStatus.

HttpClientService

The HttpClientService is used to centralize methods for all of the HTTP verbs (i.e. GET, POST, PUT, and DELETE). Currenlty only the GET verb has been added to this service. This service also supports the RestResponse model. The naming convention is getIt(), postIt(), putIt(), and deleteIt() are for HTTP calls with a REST API that supports the RestResponse style. The get(), post(), put(), and delete() are for HTTP calls with a REST API that does not support the RestRespons style. 

NavigationService

The NavigationService is primarily used to keep the Map and MapView in sync with the NgRx State. This is similar to how the StoreRouterConnectingModule works for NgRx. The StoreRouterConnectingModule is used to keep the Angular Router configuration in sync with the NgRx State. 

RouterService

The RouterService currently only processes the router.config into an array of RouteMetadata. If the project is reconfigured to use lazy loaded routes the processRoutes() method can be modified to parse the routes into an array of RouteMetadata so that any components using the RouterService do not have to change. 
