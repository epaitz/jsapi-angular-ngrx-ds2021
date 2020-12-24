import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusContainerComponent } from './status-container.component';

describe('StatusContainerComponent', () => {
    let statusContainerComponent: StatusContainerComponent;
    let componentFixture: ComponentFixture<StatusContainerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ StatusContainerComponent ]
        })
        .compileComponents();
    });

    beforeEach(() => {
        componentFixture = TestBed.createComponent(StatusContainerComponent);
        statusContainerComponent = componentFixture.componentInstance;
        componentFixture.detectChanges();
    });

    it('should create', () => {
        expect(statusContainerComponent).toBeTruthy();
    });

    it('onRefresh_should_given', () => {

        spyOn(statusContainerComponent.refresh, 'emit').and.callThrough();

        // Call the method under test
        statusContainerComponent.onRefresh();

        expect(statusContainerComponent.refresh.emit).toHaveBeenCalledTimes(1);
    });
});
