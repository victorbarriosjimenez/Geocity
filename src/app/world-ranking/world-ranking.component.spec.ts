/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WorldRankingComponent } from './world-ranking.component';

describe('WorldRankingComponent', () => {
  let component: WorldRankingComponent;
  let fixture: ComponentFixture<WorldRankingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorldRankingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});