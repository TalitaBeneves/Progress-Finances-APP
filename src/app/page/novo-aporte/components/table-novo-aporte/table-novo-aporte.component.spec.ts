/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TableNovoAporteComponent } from './table-novo-aporte.component';

describe('TableNovoAporteComponent', () => {
  let component: TableNovoAporteComponent;
  let fixture: ComponentFixture<TableNovoAporteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableNovoAporteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableNovoAporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
