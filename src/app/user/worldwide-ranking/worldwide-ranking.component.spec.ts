/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WorldwideRankingComponent } from './worldwide-ranking.component';

describe('WorldwideRankingComponent', () => {
  let component: WorldwideRankingComponent;
  let fixture: ComponentFixture<WorldwideRankingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorldwideRankingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldwideRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});