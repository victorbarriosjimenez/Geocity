/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GameplayComponent } from './gameplay.component';

describe('GameplayComponent', () => {
  let component: GameplayComponent;
  let fixture: ComponentFixture<GameplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});