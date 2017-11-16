import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup,FormControl , FormGroupDirective, NgForm} from '@angular/forms';
import { FormsService } from '../../shared/forms.service';
import { AuthenticationService } from '../../shared/authentication.service';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx'; 
import { User } from '../../../models';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, ErrorStateMatcher {
   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
  public countries: any;
  public loading: boolean;
  public registrationForm: FormGroup;
  public emailFormControl: FormControl;
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
    /*   this.registrationForm = new FormGroup({ 
          emailFormControl:  new FormControl('', [ Validators.required,Validators.email]),
          usernameFormControl:  new FormControl(' ',[ Validators.required, Validators.minLength(6)]),
          countryFormControl:  new FormControl(' ',[ Validators.required ]),
          passwordFormControl:  new FormControl(' ',[ Validators.required ]),
      })
   this.emailFormControl = new FormControl('', [
            Validators.required,
            Validators.email,
    ]);*/
   this.registrationForm =  this._fb.group({
            emailFormControl:['', Validators.compose([Validators.required, Validators.email])],
            usernameFormControl:['', Validators.compose([Validators.required, Validators.minLength(6)])],
            countryFormControl:['', Validators.required],
            passwordFormControl: ['', Validators.required]
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