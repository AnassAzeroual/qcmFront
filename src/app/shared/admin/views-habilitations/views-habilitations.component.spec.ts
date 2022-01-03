import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ViewsHabilitationsComponent } from './views-habilitations.component';

describe('ViewsHabilitationsComponent', () => {
  let component: ViewsHabilitationsComponent;
  let fixture: ComponentFixture<ViewsHabilitationsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewsHabilitationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewsHabilitationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
