import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../shared/authentication.service';
import { Router } from '@angular/router'; 
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
  protected login() {
    const formValue = this.loginForm.value;
    this._authService.loginUser(formValue.email, formValue.password)
        .subscribe(
            ()=> this._router.navigate(['/forum']),
            (err)=> console.log(err),
            () => console.log("Login Completed!")
        );
  } 
}