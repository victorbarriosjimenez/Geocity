import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';
import { Router }  from '@angular/router';
import { User , Match } from '../../models'
import { UserService, ForumService } from './../shared/';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public user: User;
  public matches: any;
  constructor(private auth: AuthenticationService,
              private _userService:  UserService,
              private _router: Router) { 
              }
  ngOnInit() { 
    this.getProfileBioData();
    this.getUserMatches();
  }
  private getProfileBioData( ):  void {
    this._userService.getUserData()
      .subscribe(data => this.user = data,
                  (err) => console.log(err),
                  () => console.log('Success')
      );
  }
  public getUserMatches(){
    this._userService.getUserMatches()
                     .subscribe(matches  => this.matches = matches);
  }
}