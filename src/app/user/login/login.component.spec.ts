import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms/src/model';
import { MaterialElementsModule, AuthenticationService } from '../../shared/index';
import { FormBuilder } from '@angular/forms/src/form_builder';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { AngularFireAuth } from 'angularfire2/auth';
describe('LoginComponent', () => {
   /*
    let component:    LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ LoginComponent ],
        imports: [ FormsModule, ReactiveFormsModule , MaterialElementsModule],
        providers: [AuthenticationService , AngularFireAuth]
      });
      fixture = TestBed.createComponent(LoginComponent);
      let authenticationService =  fixture.debugElement.injector.get(AuthenticationService);      
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
   */
});