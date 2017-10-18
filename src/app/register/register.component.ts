import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { FormsService } from '../shared/forms.service';
import { AuthenticationService } from '../shared/authentication.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx'; 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public paises: any;
  public loading: boolean;
  public model: any = { };
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
            confirmEmail: ['',Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required]
    });
  }
  private getCountries() { 
    this._formsService.getCountries()
        .subscribe(paises => this.paises = paises);
  } 
  public registerAccountWithEmailAndPassword( ): void {
     this._authService.emailSignUp(
      this.registrationForm.value['email'],
      this.registrationForm.value['password']
    );
  }
}