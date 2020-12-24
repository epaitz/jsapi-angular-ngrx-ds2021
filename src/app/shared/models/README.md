## Models

MapViewProperties

The MapViewProperties class is used to track the property changes to the MapView. This object is stored in the NgRx State.

RestResponse

The RestResponse class is used for a REST API response that uses an object with properties like data, error, and others. Some REST APIs will return a root object that contains a data property that holds the actual response. Other properties like error and size may be included. Currently the RestResponse class only contains a data and error properties. It is used by the HttpClientService in this application.

RouteMetadata

The RouteMetadata class is used by the RouterService which will transform the router config array to an array of RouteMetadata. This was done because currently in Angular static routes and lazy loaded routes are defined differently in the Angular Router. Any parts of the application that need router data can use the RouterService.getRouterConfigMetadata() which will return a consistent object model. In the future if the application is reconfigured to use lazy loaded routes then the RouterService can be updated but still return the same object array. That way any dependent parts of the application do not need to change.

ServiceStatus

The ServiceStatus class is a simple model used to describe the status of a service or any long running process. It contains a type property of type ServiceStatusTypes and an optional error object. 

ServiceStatusTypes

Status type enumeration used by the ServiceStatus model. 

WebMapDocument

This class us used so hold the JSON representation of a WebMap from a REST API. The JSAPI WebMap is created from this class. 
