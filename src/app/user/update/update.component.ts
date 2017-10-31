import { Component, OnInit } from '@angular/core';
import  { AuthenticationService } from '../../shared/authentication.service';
import { Router }  from '@angular/router';
import  { User } from '../../../models'
import { UserService } from '../../shared/user.service';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  public user: User;
  constructor(private auth: AuthenticationService,
              private _userService:  UserService,
              private _router: Router) { 
              }
  ngOnInit() { 
    this.getProfileBioData();
  }
  getProfileBioData( ):  void {
    this._userService.getUserData()
      .subscribe(data => this.user = data,
                  (err) => console.log(err),
                  () => console.log('Success')
      );
  }

}
