/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MetasAndamentoComponent } from './metas-andamento.component';

describe('MetasAndamentoComponent', () => {
  let component: MetasAndamentoComponent;
  let fixture: ComponentFixture<MetasAndamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetasAndamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetasAndamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
