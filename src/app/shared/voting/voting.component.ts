import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ForumService } from '../index';
import { sum, values } from 'lodash';
@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.css']
})
export class VotingComponent implements OnInit, OnChanges {
  @Input('postId') postId: string;
  @Input('userId') userId: string;
  public totalVotes: number = 0;
  public userVote: number = 0;
  public stuff : any;
  constructor(private _forumService : ForumService) { }
  ngOnInit() { 
   this._forumService.getPostVotes(this.postId) 
      .subscribe(votes => 
          this.assign(votes.payload.val())
        );
  }
  ngOnChanges() {    
    this._forumService.getPostVotes(this.postId) 
        .subscribe(votes => 
            this.assign( votes.payload.val())
          );
  }
  public assign(votes: any){
    if (this.userId) 
      this.userVote = votes[this.userId]
    this.totalVotes = sum(values(votes));
  }
  public upVotePost(): void {
    this.ngOnChanges();
    let vote = this.userVote == 1 ? 0 : 1;
    this._forumService.updateUserVote(this.postId,this.userId,1);
  }
}