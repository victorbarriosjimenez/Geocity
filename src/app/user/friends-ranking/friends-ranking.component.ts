import { Component, OnInit } from '@angular/core';
import { FormsService, RankingService, UserService } from '../../shared/index';
import { User } from '../../../models/index';
import  { filter } from 'lodash';
import { take , orderBy, get, size, keys, slice, assign } from 'lodash';
@Component({
  selector: 'app-friends-ranking',
  templateUrl: './friends-ranking.component.html',
  styleUrls: ['./friends-ranking.component.css']
})
export class FriendsRankingComponent implements OnInit {
  public rankedUsers: User[] = [];  
  public filters = [
    { icon: 'today', label: 'Hoy', isActive: false, datePeriod: 'today' },
    { icon: 'line_style', label: 'Semana' , isActive: false, datePeriod: 'weekly'  },
    { icon: 'date_range', label: 'Este Mes', isActive: false, datePeriod: 'monthly' }  
  ];
  ngOnInit( ) {
    this.getHistoricalFriendsRanking(); 
  }
  constructor(private _userService: UserService){ }
  private getHistoricalFriendsRanking(): void {
    if(this.rankedUsers)
      this.rankedUsers = [ ];
    this._userService.getFollowingList(this._userService.currentUserId)
                     .subscribe(followers => {
                      this.setFriendKey(followers);
    });
  }
  public setFriendKey(followers): void {
  let groupKey  = keys(followers).concat(this._userService.currentUserId);  
  groupKey.map(key => this._userService.getFriendData(key)
                   .subscribe(friend => { this.rankedUsers.push(assign(friend.payload.val(),{ $key: friend.key }))}, 
                             (err) => console.log(err),
                             () => { 
                                  this.rankedUsers = orderBy(this.rankedUsers,['score','asc']);
                    }));
  }  
  public getFriendsRankingPeriod(filter) {
    filter.isActive = true;
    this._userService.setFriendsRankingForToday(this.rankedUsers, filter.datePeriod);
  }

}