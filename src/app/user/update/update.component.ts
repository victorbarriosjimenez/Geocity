import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router }  from '@angular/router';
import { MatSnackBar } from '@angular/material';
/* Services */
import { FormsService } from '../../shared/forms.service';
import { UserService } from '../../shared/user.service';
import  { AuthenticationService } from '../../shared/authentication.service';

/* Classes */
import  { User } from '../../../models'

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  public user: User;
  public countries: any;  
  public userUpdateForm: FormGroup;
  public isEmailConfirmationSent: boolean;
  constructor(private auth: AuthenticationService,
              private _userService:  UserService,
              private _formsService: FormsService, 
              private _fb: FormBuilder,
              private _router: Router,
              private _snackBar: MatSnackBar) { 
              }
  ngOnInit() { 
    this.createForm(); 
    this.getCountries();   
    this.getProfileBioData();
  }
  public createForm( ): void {
    this.userUpdateForm =  this._fb.group({
             username:['',Validators.required],
             profilePhotoUrl: ['',Validators.required],
             country:['', Validators.required]
     });
   }
  private getProfileBioData( ):  void {
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
          profilePhotoUrl: this.user.profilePhotoUrl,
          country: this.user.country
    });
  }
  private sendPasswordResetEmail(){
      const userEmail : string  = this.user.email;
      this._userService.sendsResetPasswordEmail(userEmail)
          .then( () => { 
                        this.isEmailConfirmationSent = true,
                        this.showsSnackBarWithDetailsOFEmailSent(userEmail)
                      })
          .catch( (err) => console.log(err));
  }
  private showsSnackBarWithDetailsOFEmailSent(email: string) {
    const message: string = `Hemos enviado un correo a la cuenta ${email} para cambiar tu password.`; 
    this._snackBar.open(message, "DE ACUERDO", {
      duration: 5000,
    });   
  }
}