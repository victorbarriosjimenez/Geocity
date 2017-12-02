import { Component, OnInit, Input,  OnDestroy } from '@angular/core';
import { UserService } from '../index';
@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.css']
})
export class FollowButtonComponent implements OnInit, OnDestroy {
  @Input('userId') userId: string;
  @Input('currentUserId') currentUserId: string;
  public isFollowing: any; 
  public icon: string;
  public instruction: string;
  public following: any;
  constructor(private _userService: UserService) { }
  ngOnInit() {
    this.following = this._userService.getFollowing(this.currentUserId, this.userId)
    .subscribe(following => {
        this.isFollowing = following
        this.icon = this.isFollowing ? 'people' : 'person_add';
        this.instruction = this.isFollowing ? 'Seguido' : 'Seguir';         
    });
  }
  public toggleFollow() {
    const userId = this.userId
    const currentUserId = this.currentUserId;
    if (this.isFollowing) this._userService.unfollow(currentUserId, userId)
    else this._userService.follow(currentUserId, userId)
  }   
  ngOnDestroy() {
    this.following.unsubscribe()
  }
}