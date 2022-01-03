/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GestionQcmComponent } from './GestionQcm.component';

describe('GestionQcmComponent', () => {
  let component: GestionQcmComponent;
  let fixture: ComponentFixture<GestionQcmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionQcmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionQcmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
