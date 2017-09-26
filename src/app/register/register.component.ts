import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FormsService } from '../shared/forms.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public paises: any;
  public registrationForm: FormGroup;
  constructor(private _formsService: FormsService, private _fb: FormBuilder) { }
  ngOnInit() {
    this.createForm();
    this.getCountries();
  } 
  public createForm( ){
   this.registrationForm =  this._fb.group({
            username: ['',Validators.required],
            email:['',Validators.required],
            country:['', Validators.required],
            confirmEmail:['', Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required]
    });
  }
  private getCountries(){ 
    this._formsService.getCountries()
        .subscribe(paises => this.paises = paises);
  } 
}