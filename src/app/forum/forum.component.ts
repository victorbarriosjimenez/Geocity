import { Component, OnInit } from '@angular/core';
import { UserService } from './../shared/user.service';
import  { User } from '../../models'
@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  user: User;
  constructor(private _userService: UserService) { }
  ngOnInit() {
    this.getProfileBioData();
  }   
  private getProfileBioData( ):  void {
    this._userService.getUserData()
      .subscribe(data => this.user = data,
                  (err) => console.log(err),
                  () => console.log('Success')
      );
  }
}