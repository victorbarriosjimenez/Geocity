import { Component, OnInit } from '@angular/core';
import  { AuthenticationService } from '../shared/authentication.service';
import { Router }  from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  constructor(private authService: AuthenticationService,
              private _router: Router) { }
  ngOnInit() { 
    console.log(this.authService.currentUserObservable);
   }
  public logout( ){
    console.log('logout');
    this.authService.logoutfromGeocity();
    this._router.navigate(['/']);
  }
  public updateProfile(){

  }
}