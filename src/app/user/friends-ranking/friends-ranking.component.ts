import { Component, OnInit } from '@angular/core';
import { FormsService, RankingService } from '../../shared/index';
import { User } from '../../../models/index';
import  { filter } from 'lodash';

@Component({
  selector: 'app-friends-ranking',
  templateUrl: './friends-ranking.component.html',
  styleUrls: ['./friends-ranking.component.css']
})
export class FriendsRankingComponent implements OnInit {
  ngOnInit() { }
}