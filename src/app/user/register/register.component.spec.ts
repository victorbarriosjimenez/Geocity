import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RegisterComponent } from './register.component';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsService, AuthenticationService } from '../../shared';
describe('RegisterComponent', () => {
  var  component: RegisterComponent; 
  beforeEach(() => {
    component = new RegisterComponent(null,new FormBuilder,null,null);
  });
  it('should create a form with the register controls', () => {
    expect(component.registrationForm.contains('emailFormControl')).toBe(true);
    expect(component.registrationForm.contains('usernameFormControl')).toBe(true); 
    expect(component.registrationForm.contains('countryFormControl')).toBe(true); 
    expect(component.registrationForm.contains('passwordFormControl')).toBe(true);        
  });
});