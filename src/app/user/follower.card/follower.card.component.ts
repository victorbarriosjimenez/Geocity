import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-follower-card',
  templateUrl: './follower.card.component.html',
  styleUrls: ['./follower.card.component.css']
})
export class FollowerCardComponent implements OnInit {
  @Input('follower-key') followerKey: string;
  constructor() { }
  ngOnInit() { }
}