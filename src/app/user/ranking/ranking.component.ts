import { Component, OnInit } from '@angular/core';
import { RankingService } from '../../shared/index';
import { User } from '../../../models/index';

@Component({
    selector: 'ranking',
    templateUrl: 'ranking.component.html',
    styleUrls: ['ranking.component.css']
})

export class RankingComponent implements OnInit {
    public rankedUsers: User[];
    constructor(private _rankingService: RankingService) { }
    ngOnInit() {
        this.getWorldRankingPodium();
     }
    public getWorldRankingPodium(): void  {
        this._rankingService.getListOfAllUsers()
            .subscribe(users => {  this.rankedUsers = users });
      }
}