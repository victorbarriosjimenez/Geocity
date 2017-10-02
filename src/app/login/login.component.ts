import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx'; 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  constructor(private _fb: FormBuilder) { }
  public createForm( ){
    this.loginForm =  this._fb.group({
             email:['',Validators.required],
             password: ['', Validators.required],
     });
   }
  ngOnInit() {
    this.createForm();
  }
  public login() {  
    
  } 
}