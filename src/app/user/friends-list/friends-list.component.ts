import { Component, OnInit } from '@angular/core';
import { FormsService, RankingService, UserService } from '../../shared/index';
import { User } from '../../../models/index';
import  { filter, keys, size,assign } from 'lodash';
@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})
export class FriendsListComponent implements OnInit {
  public friends: User[] = [];
  public followerCount: number;
  ngOnInit() {
    this.getInitialListOfFriends();
  }
  constructor(private _userService:  UserService) { }
  public getInitialListOfFriends(): void {
    this._userService.getFollowingList(this._userService.currentUserId)
    .subscribe(followers => {
              this.setFriendKey(followers);
    });
  }
  public setFriendKey(followers): void {
    keys(followers).map(key => this._userService.getFriendData(key)
                   .subscribe(friend => this.friends.push(assign(friend.payload.val(),{ $key: friend.key })), 
                             (err) => console.log(err),
                             () => { 
                   }));
  }
}