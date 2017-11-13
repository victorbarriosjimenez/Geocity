/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FriendsRankingComponent } from './friends-ranking.component';

describe('FriendsRankingComponent', () => {
  let component: FriendsRankingComponent;
  let fixture: ComponentFixture<FriendsRankingComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsRankingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});