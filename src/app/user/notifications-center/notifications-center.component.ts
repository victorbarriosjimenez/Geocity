import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/index';

@Component({
  selector: 'app-notifications-center',
  templateUrl: './notifications-center.component.html',
  styleUrls: ['./notifications-center.component.css']
})
export class NotificationsCenterComponent implements OnInit {
  public messages: any;
  constructor(private _userService: UserService) { }
  ngOnInit() {
      this.getListOfNotifications();
  }
  public getListOfNotifications( ){
    this._userService.getUserNotifications(this._userService.currentUserId)
        .subscribe(messages => this.messages = messages);
  }

}