import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/index';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-notifications-center',
  templateUrl: './notifications-center.component.html',
  styleUrls: ['./notifications-center.component.css']
})
export class NotificationsCenterComponent implements OnInit{
  public notifications: any;
  constructor(private _userService: UserService) { }
  ngOnInit() {
      this.getListOfNotifications();
  }
  public getListOfNotifications( ){
    this._userService.getUserNotifications(this._userService.currentUserId)
        .subscribe(notifications => this.notifications = notifications);
  }
  public deleteNotification(notificationKey: string) {
    this._userService.deleteNotification(notificationKey);
  }
}