/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CommencerQcmComponent } from './CommencerQcm.component';

describe('CommencerQcmComponent', () => {
  let component: CommencerQcmComponent;
  let fixture: ComponentFixture<CommencerQcmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommencerQcmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommencerQcmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
