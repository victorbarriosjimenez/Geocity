import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../shared/index';

@Component({
  selector: 'app-follower-card',
  templateUrl: './follower.card.component.html',
  styleUrls: ['./follower.card.component.css']
})
export class FollowerCardComponent implements OnInit {
  @Input('follower-key') followerKey: string;
  constructor(private _userService: UserService) { }
  ngOnInit() {
  }
}