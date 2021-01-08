## Creating an adaptive user interface

The header and map components have navigation elements that will adjust as the width of the browser changes. This was done using the [Angular Flex Layout](https://github.com/angular/flex-layout). Let’s start by looking at the [header.component.html](https://github.com/epaitz/jsapi-angular-ngrx-ds2021/blob/master/src/app/header/header.component.html). 

The root element in the header component template is an Angular Material Toolbar with one toolbar row.

    <mat-toolbar color="primary">
        <mat-toolbar-row>

        </mat-toolbar-row>
    </mat-toolbar>

The next elements in the toolbar row are a button, which is the hamburger menu button, and a Material Menu. This button and menu are normal HTML and Angular Material elements, but they have additional directives added. 

      <button mat-button [matMenuTriggerFor]="headerMenu" fxShow="true" fxHide.gt-sm>
        <mat-icon>menu</mat-icon>
      </button>

The button has the [fxShow](https://github.com/angular/flex-layout/wiki/fxShow-API) adn the [fxHide](https://github.com/angular/flex-layout/wiki/fxHide-API) directives added. This means the the above element will be shown by default and ONLY hiden on viewport sizes greater than mobile.
