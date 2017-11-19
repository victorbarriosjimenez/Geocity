import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RegisterComponent } from './register.component';
import { FormBuilder } from '@angular/forms';
describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;  
  beforeEach(() => {
    component = new RegisterComponent(null,new FormBuilder,null,null);
  });
  it('should create a form with the register controls', () => {
    expect(component.registrationForm.contains('emailFormControl')).toBeTruthy();
    expect(component.registrationForm.contains('usernameFormControl')).toBeTruthy(); 
    expect(component.registrationForm.contains('countryFormControl')).toBeTruthy(); 
    expect(component.registrationForm.contains('passwordFormControl')).toBeTruthy();        
  });
});