import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../shared/authentication.service';
import { Observable } from 'rxjs/Rx'; 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  constructor(private _fb: FormBuilder, 
              private _authService: AuthenticationService,
              private _router: Router) { }
  public createForm( ){
    this.loginForm =  this._fb.group({
             email:['',Validators.compose([Validators.required, Validators.email])],
             password: ['',Validators.compose([Validators.required,  Validators.minLength(6)])],
     });
  }
  ngOnInit() {
    this.createForm();
  }
  public loginWithEmailAndPassword(): void {  
    this._authService.emailLogin(
        this.loginForm.value['email'],
        this.loginForm.value['password']
    ).then().catch((err) => console.log(err));
  }
  public loginWithGoogleAccount(): void {
    this._authService.googleAccountLogin();
  } 
}