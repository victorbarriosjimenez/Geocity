import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { FormsService } from '../shared/forms.service';
import { AlertService } from '../shared/alert.service';

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
              private userService: UserService,
              private alertService: AlertService,
              ) { }
  ngOnInit() {
    this.createForm();
    this.getCountries();
  } 
  public createForm( ): void {
   this.registrationForm =  this._fb.group({
            username: ['',Validators.required],
            email:['',Validators.required],
            country:['', Validators.required],
            confirmEmail:['', Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required]
    });
  }
  private getCountries() { 
    this._formsService.getCountries()
        .subscribe(paises => this.paises = paises);
  } 
  register() {
    this.loading = true;
    this.userService.create(this.model)
        .subscribe(
            data => {
                this.alertService.success('Registration successful', true);
                this._router.navigate(['/login']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
}
}