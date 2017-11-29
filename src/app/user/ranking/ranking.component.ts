import { Component, OnInit } from '@angular/core';
import { RankingService, UserService } from '../../shared/index';
import { User } from '../../../models/index';
import { orderBy } from 'lodash';
@Component({
    selector: 'ranking',
    templateUrl: 'ranking.component.html',
    styleUrls: ['ranking.component.css']
})
export class RankingComponent implements OnInit {
    followerCount: number;
    isFollowing: boolean;
    followers;
    following;  
    public rankedUsers: User[];
    public term: string = '';
    constructor(private _rankingService: RankingService,
                 private _userService: UserService) { }
    ngOnInit() {
        this.getWorldRankingPodium();
     }
    public getWorldRankingPodium(): void  {
        this._rankingService.getListOfAllUsers()
            .subscribe(users => {  
                this.filterUsers(users);
            });
    }
    public filterUsers(users: User[]){
       this.rankedUsers = orderBy(users,['score'],['desc']);
    }
    toggleFollow(key: string) {
        const userId = key;
        const currentUserId = this._userService.currentUserId;
        if (this.isFollowing) this._userService.unfollow(currentUserId, userId)
        else this._userService.follow(currentUserId, userId)
    }   
}