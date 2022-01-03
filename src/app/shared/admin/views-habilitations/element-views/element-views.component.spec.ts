import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ElementViewsComponent } from './element-views.component';

describe('ElementViewsComponent', () => {
  let component: ElementViewsComponent;
  let fixture: ComponentFixture<ElementViewsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementViewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
