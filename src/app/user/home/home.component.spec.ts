/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HomeComponent } from './home.component';
import { FormsService } from '../../shared';
import { RouterTestingModule } from '@angular/router/testing';
describe('HomeComponent (Inline-template)', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ HomeComponent ], 
            imports: [ RouterTestingModule]
        });
        fixture = TestBed.createComponent(HomeComponent);
    });  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
});