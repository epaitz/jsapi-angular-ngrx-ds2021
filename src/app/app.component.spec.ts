import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    let appComponent: AppComponent;
    let componentFixture: ComponentFixture<AppComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
        imports: [
            RouterTestingModule
        ],
        declarations: [
            AppComponent
        ],
        schemas: [
            CUSTOM_ELEMENTS_SCHEMA
        ]
        }).compileComponents();
    });

    beforeEach(() => {
        componentFixture = TestBed.createComponent(AppComponent);
        appComponent = componentFixture.componentInstance;
    });

    it('should create the app', () => {
        expect(appComponent).toBeTruthy();
    });

    // it('should have as title \'jsapi-angular-ngrx-ds2021\'', () => {
    // expect(appComponent.title).toEqual('jsapi-angular-ngrx-ds2021');
    // });
});
