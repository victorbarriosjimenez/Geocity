import { Component, OnInit } from '@angular/core';
import  { AuthenticationService } from '../shared/authentication.service';
import { Router }  from '@angular/router';
import  { User } from '../../models'
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: any;
  constructor(private auth: AuthenticationService,
              private _userService:  UserService,
              private _router: Router) { }
  ngOnInit() { 
    this.getProfileBioData();
    console.log(this.user)
  }
  getProfileBioData( ):  void {
    this._userService.getUserData()
      .subscribe(data => this.user = data,
                  (err) => console.log(err),
                  () => console.log('Success!')
      );
   }
}