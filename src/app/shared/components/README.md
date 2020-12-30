## Scrollable Container Component

The Scrollable Container Component can be used to display a vertical scrollbar for content like lists as needed. This component could be expanded to support both vertical and horizontal scrolling. 

## Status Container Component

The Status Container Component can be used to display various status states for any part of the application. The component works with the ServiceStatus model that currently has an enumeration of 'loading', 'content', 'empty', and 'error'. The component has a default input message and an output refresh event. The refresh event can be used to retry the operation that is in an error state. When the state is set to 'loading' the Status Container will display the Angular Material Progress Spinner and a message. If the state is set to 'error' an error icon will be displayed with the generic message 'An error has occurred' and a Material Accordion can be expanded to show the error details. In the 'content' state the component will simply just show the content that is being wrapped.

This component, and the ServiceStauts model, can be expanded to support other states or Template inputs can be added for each state so that the status template can be changed as needed. The 'empty' state is currently not implemented.

## Toolbar Component

The Toolbar Component is a vertical toolbar based on the Angular Material Toolbar. In this project its currently used as the vertical toolbar on the Map Component. It will generate navigation icons for children of the route specified by the routePath input variable. If the children of that route contain a data object that define properties like icon and label, then a button will be generated. If the vertical space is not enough to display all the buttons an overflow menu will appear. If the settingsPath is defined, then the child route path matching the settingsPath will be displayed at the bottom.
