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
  public emailSentConfirmationMessage: string = `Hemos enviado un correo a la cuenta para cambiar tu password.`;   
  public profileModifiedConfirmationMessage: string = `Tu perfil se ha modificado exitosamente!`;    
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
  /* -------------------------  Form Admnistration -------------------------*/
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
  private prepareUserModelUpdated( ) : User { 
    const formModel = this.userUpdateForm.value;
    const userModel: User = {
        username:  formModel.username as string,
        country: formModel.country as string,
        profilePhotoUrl: formModel.profilePhotoUrl as string
    };
      return userModel
  }
  public sendsUserUpdateForm(): void {
      const userModelUpdated: User =  this.prepareUserModelUpdated();
      console.log(userModelUpdated);
      this._userService.updateUserInformation(userModelUpdated)
          .then(() => {
                this.showsSnackBarWithDetails(this.profileModifiedConfirmationMessage)
          });
  }
  /* -------------------------  User Admnistration methods -------------------------*/
  public sendPasswordResetEmail() : void {
      const userEmail : string  = this.user.email;
      this._userService.sendsResetPasswordEmail(userEmail)
          .then(() => { 
                        this.isEmailConfirmationSent = true,
                        this.showsSnackBarWithDetails(this.emailSentConfirmationMessage)
          })
          .catch( (err) => console.log(err));
  }
  private showsSnackBarWithDetails(message: string) : void {
    this._snackBar.open(message, "DE ACUERDO", {
        duration: 3000,
    });
    this._router.navigate(['/profile']);  
  }
}