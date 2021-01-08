## Creating an adaptive user interface

The header and map components have navigation elements that will adjust as the width of the browser changes. This was done using the [Angular Flex Layout](https://github.com/angular/flex-layout). Let’s start by looking at the [header.component.html](https://github.com/epaitz/jsapi-angular-ngrx-ds2021/blob/master/src/app/header/header.component.html). 

The root element in the header component template is an Angular Material Toolbar with one toolbar row.

    <mat-toolbar color="primary">
        <mat-toolbar-row>

        </mat-toolbar-row>
    </mat-toolbar>

The next element in the toolbar row is a normal HTML button that uses the Angular Material mat-button directive and additional Flex Layout directives. 

      <button mat-button [matMenuTriggerFor]="headerMenu" fxShow="true" fxHide.gt-sm>
        <mat-icon>menu</mat-icon>
      </button>

The button has the [fxShow](https://github.com/angular/flex-layout/wiki/fxShow-API) and the [fxHide](https://github.com/angular/flex-layout/wiki/fxHide-API) directives added. This means the above element will be shown by default and ONLY hidden on viewport sizes greater than `sm` medaiQuery ranges. The Material Menu is tied to the button and will contain router elements for the root and one level of children. If you have a more complicated set of children routes, then you will have to modify this menu.

The next elements are the title and a spacer. 

    <span style="flex: 1 1 auto"></span>
    <div fxShow="true" fxHide.lt-md>
      
The style of the span could have been replaced with `fxFlex=”1 1 auto”` do be consistent with using the Flex Layout directives. 

The last element is a DIV that contains a button for each root level route, a button for the username, and a menu that is displayed when the user name is clicked. 

    <div fxShow="true" fxHide.lt-md>
    </div>

This DIV also uses the [fxShow](https://github.com/angular/flex-layout/wiki/fxShow-API) and the [fxHide](https://github.com/angular/flex-layout/wiki/fxHide-API) directives. This means the above element will be shown by default and ONLY hidden on viewport sizes less than `md` medaiQuery ranges.

Next lets take a look at the map.component.html template. 

The root element is a DIV that use the Flex Layout directives [fxLayout](https://github.com/angular/flex-layout/wiki/fxLayout-API) and [fxFill](https://github.com/angular/flex-layout/wiki/fxFlexFill-API).

    <div fxLayout="row" fxFill>
  
These two directives have nothing to do with the adaptive UI but are a kind of short-hand syntax when using the CSS Flexbox and other CSS.

The next element is my vertical toolbar which has several input bindings and an output event that do not effect the adaptive UI.

    <app-toolbar (sidenavToggle)="sidenavToggle($event)" [routerConfig]="routerConfig" orientation="vertical" routePath="map" settingsPath="settings" fxShow="true" fxHide.lt-md></app-toolbar>
    
The toolbar does use the [fxShow](https://github.com/angular/flex-layout/wiki/fxShow-API) and the [fxHide](https://github.com/angular/flex-layout/wiki/fxHide-API) directives. This means the above element will be shown by default and ONLY hidden on viewport sizes less than `md` medaiQuery ranges.

Next is the [Angular Material Sidenav component](https://material.angular.io/components/sidenav/overview). Its behavior changes as the browser width changes by changing is `mode` property and by dynamically adding a CSS class I called `is-xs`. 

    <mat-sidenav #drawer [opened]="(sidenavOpened$ | async)" [mode]="mode" [class.is-xs]="isXs === true">
    </mat-sidenav>
    
The mode and is-xs values are updated from the [map.component.ts](https://github.com/epaitz/jsapi-angular-ngrx-ds2021/blob/d14253c0bf6bc9b1c283d340b5c10ed910ff0132/src/app/map/map.component.ts#L49) by watching for media changes using the [MediaObserver](https://github.com/angular/flex-layout/wiki/MediaObserver) from the Angular Flex-Layout. 

The final DIV uses the fxLayout and fxFill directives and is just a wrapper for the app-map-view-component.














