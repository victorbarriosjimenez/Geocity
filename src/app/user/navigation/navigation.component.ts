import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../shared/authentication.service';
import { Router } from '@angular/router';
import { NotificationsService } from '../../shared/notifications.service';
import { UserService } from '../../shared/index';
import { size } from 'lodash';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  public numberOfNewMessages: number = 0;
  public hasNotifications: boolean =  false;
  constructor(private auth: AuthenticationService, 
              private _router: Router,
              private _userService : UserService) { }
  ngOnInit() {
    this.getUserNotificationMessages();
  }
  public navigate(routeSelected: string){
    let route = `/${routeSelected}`;
    this._router.navigate([route]);
  }
  public logoutFromGeocity(): void {
    this.auth.logoutfromGeocity();
  } 
  public getUserNotificationMessages() {
    this._userService.getUserNotifications(this._userService.currentUserId)
        .subscribe(messages => {
              this.numberOfNewMessages = this.countNumberOfNotificationsReceived(messages);
    });
  }    
  private countNumberOfNotificationsReceived(messages: any[]): number{
    if(messages.length === 0){
        return 0;
    }
    else if (messages.length > 0) { 
      this.hasNotifications = true;
      return size(messages);
    }
  }
} 