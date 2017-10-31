import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FormsService } from '../shared/forms.service';
import { AuthenticationService } from '../shared/authentication.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx'; 
import { User } from '../../models';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public countries: any;
  public loading: boolean;
  public registrationForm: FormGroup;
  constructor(private _formsService: FormsService, 
              private _fb: FormBuilder,
              private _router: Router,
              private _authService: AuthenticationService
            ) { }
  ngOnInit() {
    this.createForm();
    this.getCountries();
  } 
  public createForm( ): void {
   this.registrationForm =  this._fb.group({
            email:['',Validators.required],
            username:['',Validators.required],
            country:['', Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required]
    });
  }
  private getCountries() { 
    this._formsService.getCountries()
        .subscribe(countries => this.countries = countries);
  } 
  public prepareUserForRegistration( ): User {
    const formModel = this.registrationForm.value;
    const userModel: User = {
        email: formModel.email as string,
        username:  formModel.username as string,
        country: formModel.country as string,
        password: formModel.password as string, 
    };
      return userModel
  }
  public registerAccountWithEmailAndPassword(){
    let user = this.prepareUserForRegistration();
    this._authService.emailSignUp(user);
  }
}