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
  public isLoginIn: boolean = false;
  constructor(private _fb: FormBuilder, 
              private _authService: AuthenticationService,
              private _router: Router) { }
  public createForm( ){
    this.loginForm =  this._fb.group({
             email:['', Validators.compose([Validators.required, Validators.email])],
             password: ['', Validators.required],
     });
  }
  ngOnInit() {
    this.createForm();
  }
  public loginWithEmailAndPassword(): void {  
    this.isLoginIn = true;
    this._authService.emailLogin(
        this.loginForm.value['email'],
        this.loginForm.value['password']
    ).then( ( )=>{
      this.isLoginIn = false 
    }
    ).catch( () => {
      this.isLoginIn = false 
    });
  }
  public loginWithGoogleAccount(): void {
    this._authService.googleAccountLogin();
  } 
}