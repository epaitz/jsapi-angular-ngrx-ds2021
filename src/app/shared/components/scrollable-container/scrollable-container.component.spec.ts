import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollableContainerComponent } from './scrollable-container.component';

describe('ScrollableContainerComponent', () => {
  let component: ScrollableContainerComponent;
  let fixture: ComponentFixture<ScrollableContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrollableContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollableContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
