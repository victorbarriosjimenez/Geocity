import { Component, OnInit } from '@angular/core';
import  { AuthenticationService } from '../../shared/authentication.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router }  from '@angular/router';
import  { User } from '../../../models'
import { FormsService } from '../../shared/forms.service';
import { UserService } from '../../shared/user.service';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  public user: User;
  public countries: any;  
  public userUpdateForm: FormGroup;
  constructor(private auth: AuthenticationService,
              private _userService:  UserService,
              private _formsService: FormsService, 
              private _fb: FormBuilder,
              private _router: Router) { 
              }
  ngOnInit() { 
    this.createForm();    
    this.getProfileBioData();
  }
  public createForm( ): void {
    this.userUpdateForm =  this._fb.group({
             username:['',Validators.required],
             country:['', Validators.required],
     });
   }
  getProfileBioData( ):  void {
    this._userService.getUserData()
      .subscribe(data => this.user = data,
                  (err) => console.log(err),
                  () => this.InitializeValuesIfUserExists()
      );
  }
  private getCountries() { 
    this._formsService.getCountries()
        .subscribe(countries => this.countries = countries);
  } 
  private InitializeValuesIfUserExists(): void {
    this.userUpdateForm.patchValue({
          username: this.user.username,
          country: this.user.country,
    });
  }
}
