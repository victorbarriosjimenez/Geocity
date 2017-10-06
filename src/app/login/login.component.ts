import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';
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
             email:['',Validators.required],
             password: ['', Validators.required],
     });
   }
  ngOnInit() {
    this.createForm();
  }
  public login() {  
    this._authService.emailLogin(
        this.loginForm.value['email'],
        this.loginForm.value['password']
    ).then(
      () => this._router.navigate(['/'])
    ).catch(
      (err) => console.log(err)
    );
  } 
}