import { Component, OnInit, Input } from '@angular/core';
import { ForumService } from '../index';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.css']
})
export class VotingComponent implements OnInit {
  @Input('postId') postId: string;
  @Input('userId') userId: string;
  public totalVotes: number = 0;
  public userVote: number = 0;
  constructor(private _forumService : ForumService) { }
  ngOnInit() {  }
  public upVotePost(): void {
    this._forumService.updateUserVote(this.postId,this.userId,1);
  }
  public downVotePost(): void { 
    this._forumService.updateUserVote(this.postId,this.userId,-1);    
  }
}