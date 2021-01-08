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



