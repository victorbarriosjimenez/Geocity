import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../index';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.css']
})
export class FollowButtonComponent implements OnInit {
  @Input('userId') userId: string;
  @Input('currentUserId') currentUserId: string;
  public isFollowing: boolean; 
  public icon: string = 'person_add' 
  constructor(private _userService: UserService) { }
  ngOnInit() { }
  toggleFollow(key: string) {
    const userId = key;
    const currentUserId = this.currentUserId;
    if (this.isFollowing) this._userService.unfollow(currentUserId, userId)
    else this._userService.follow(currentUserId, userId)
  }   
}