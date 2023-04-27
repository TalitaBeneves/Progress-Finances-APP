/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DialogMeusAtivosComponent } from './dialog-meus-ativos.component';

describe('DialogMeusAtivosComponent', () => {
  let component: DialogMeusAtivosComponent;
  let fixture: ComponentFixture<DialogMeusAtivosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogMeusAtivosComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMeusAtivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
